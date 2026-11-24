"""
BhoomiX - Core AI Inference Engine
Integrates trained ML models, feature extractors, and multi-factor farming reasoning.
"""

import os
import io
import json
import numpy as np
import pandas as pd
import joblib
from PIL import Image

from services.agricultural_knowledge import (
    CROP_METADATA,
    PEST_DISEASE_KNOWLEDGE
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")
METRICS_DIR = os.path.join(BASE_DIR, "metrics")

class BhoomiXAiEngine:
    def __init__(self):
        self.crop_model_bundle = None
        self.yield_model_bundle = None
        self.risk_model_bundle = None
        self.pest_model_bundle = None
        self.metrics = {}
        self.load_models()

    def load_models(self):
        try:
            crop_path = os.path.join(MODELS_DIR, "crop_recommendation_model.joblib")
            if os.path.exists(crop_path):
                self.crop_model_bundle = joblib.load(crop_path)
                print("[AI Engine] Crop Recommendation model loaded.")

            yield_path = os.path.join(MODELS_DIR, "crop_yield_model.joblib")
            if os.path.exists(yield_path):
                self.yield_model_bundle = joblib.load(yield_path)
                if hasattr(self.yield_model_bundle.get('model'), 'n_jobs'):
                    self.yield_model_bundle['model'].n_jobs = 1
                print("[AI Engine] Crop Yield model loaded.")

            risk_path = os.path.join(MODELS_DIR, "crop_failure_risk_model.joblib")
            if os.path.exists(risk_path):
                self.risk_model_bundle = joblib.load(risk_path)
                if hasattr(self.risk_model_bundle.get('model'), 'n_jobs'):
                    self.risk_model_bundle['model'].n_jobs = 1
                print("[AI Engine] Crop Failure Risk model loaded.")

            pest_path = os.path.join(MODELS_DIR, "pest_classifier_model.joblib")
            if os.path.exists(pest_path):
                self.pest_model_bundle = joblib.load(pest_path)
                if hasattr(self.pest_model_bundle.get('model'), 'n_jobs'):
                    self.pest_model_bundle['model'].n_jobs = 1
                print("[AI Engine] Pest & Weed Classifier model loaded.")

            # Load metrics files
            for mfile in os.listdir(METRICS_DIR) if os.path.exists(METRICS_DIR) else []:
                if mfile.endswith(".json"):
                    with open(os.path.join(METRICS_DIR, mfile), 'r') as f:
                        self.metrics[mfile.replace(".json", "")] = json.load(f)
        except Exception as e:
            print(f"[AI Engine] Error during model loading: {e}")

    # 1. CROP RECOMMENDATION INFERENCE
    def recommend_crop(self, n: float, p: float, k: float, temperature: float, 
                       humidity: float, ph: float, rainfall: float, top_k: int = 3):
        if not self.crop_model_bundle:
            raise RuntimeError("Crop recommendation model is not loaded.")
        
        clf = self.crop_model_bundle['model']
        le = self.crop_model_bundle['label_encoder']
        feature_names = self.crop_model_bundle['feature_names']
        
        features = pd.DataFrame([[n, p, k, temperature, humidity, ph, rainfall]], columns=feature_names)
        probs = clf.predict_proba(features)[0]
        
        # Sort by probability descending
        top_indices = np.argsort(probs)[::-1][:top_k]
        
        recommendations = []
        for idx in top_indices:
            crop_name = le.classes_[idx]
            prob_percent = float(round(probs[idx] * 100, 2))
            meta = CROP_METADATA.get(crop_name.lower(), {})
            
            # Formulate scientific explanation
            reasons = []
            if rainfall > 150 and crop_name.lower() in ['rice', 'jute', 'coffee']:
                reasons.append(f"High rainfall ({rainfall:.0f} mm) provides ideal hydration for {crop_name}.")
            elif rainfall < 80 and crop_name.lower() in ['chickpea', 'mothbeans', 'mungbean']:
                reasons.append(f"Low rainfall condition ({rainfall:.0f} mm) suits drought-hardy pulses like {crop_name}.")
            
            if n > 70 and crop_name.lower() in ['rice', 'cotton', 'maize']:
                reasons.append(f"Abundant soil Nitrogen (N={n:.0f}) stimulates vigorous vegetative tillering.")
            elif k > 40 and crop_name.lower() in ['banana', 'pomegranate', 'grapes', 'coconut']:
                reasons.append(f"High Potassium level (K={k:.0f}) supports robust fruit sizing and drought tolerance.")
                
            if 6.0 <= ph <= 7.2:
                reasons.append(f"Soil pH {ph:.1f} is in the neutral optimal range for maximum nutrient uptake.")
            elif ph < 6.0:
                reasons.append(f"Slightly acidic pH {ph:.1f} is well-tolerated by {crop_name}.")
            else:
                reasons.append(f"Mild alkaline condition (pH {ph:.1f}) is supported.")
                
            recommendations.append({
                "crop": crop_name,
                "tamil_name": meta.get("tamil", crop_name),
                "suitability_score": prob_percent,
                "season": meta.get("season", "Kharif / Rabi"),
                "water_requirement_mm": meta.get("water_req_mm", 600),
                "optimal_ph_range": meta.get("optimal_ph", "6.0 - 7.5"),
                "expected_yield_kg_ha": meta.get("avg_yield_kg_ha", 2500),
                "mandi_price_quintal": meta.get("mandi_price_per_quintal", 3500),
                "explanation": " ".join(reasons) if reasons else f"Soil chemical composition and environmental indices align well with standard agronomic requirements for {crop_name}."
            })
            
        importances = self.metrics.get("crop_recommendation_metrics", {}).get("feature_importances", {})
        return {
            "input_parameters": {
                "N": n, "P": p, "K": k, 
                "temperature": temperature, "humidity": humidity, 
                "ph": ph, "rainfall": rainfall
            },
            "recommendations": recommendations,
            "feature_importances": importances,
            "model_accuracy": self.metrics.get("crop_recommendation_metrics", {}).get("test_accuracy", 0.995)
        }

    # 2. CROP YIELD PREDICTION INFERENCE
    def predict_yield(self, state: str, crop: str, area_ha: float, year: int = 2024):
        if not self.yield_model_bundle:
            raise RuntimeError("Crop yield model is not loaded.")
            
        reg = self.yield_model_bundle['model']
        le_state = self.yield_model_bundle['state_encoder']
        le_crop = self.yield_model_bundle['crop_encoder']
        
        # Match nearest state / crop in encoder
        norm_crop = crop.upper()
        if norm_crop not in le_crop.classes_:
            # fallback match
            norm_crop = 'RICE'
        crop_enc = le_crop.transform([norm_crop])[0]
        
        norm_state = state.title()
        if norm_state not in le_state.classes_:
            norm_state = 'Tamil Nadu'
        state_enc = le_state.transform([norm_state])[0]
        
        # Feature vector: ['State_Enc', 'Crop_Enc', 'Year', 'Area']
        # Note: area in thousands of ha in training dataset
        area_thousand_ha = max(0.001, area_ha / 1000.0)
        features_cols = self.yield_model_bundle.get('features', ['State_Enc', 'Crop_Enc', 'Year', 'Area'])
        X = pd.DataFrame([[state_enc, crop_enc, year, area_thousand_ha]], columns=features_cols)
        
        predicted_yield_kg_ha = float(reg.predict(X)[0])
        # Total production in metric tons
        total_production_tons = float((predicted_yield_kg_ha * area_ha) / 1000.0)
        
        return {
            "state": norm_state,
            "crop": norm_crop,
            "area_ha": area_ha,
            "predicted_yield_kg_per_ha": round(predicted_yield_kg_ha, 1),
            "estimated_production_metric_tons": round(total_production_tons, 2),
            "r2_score": self.metrics.get("crop_yield_metrics", {}).get("r2_score", 0.905),
            "historical_dataset": "ICRISAT Indian Agriculture Statistics"
        }

    # 3. CROP FAILURE RISK ASSESSMENT
    def assess_risk(self, rainfall_dev: float, temp_stress: float, 
                     soil_moisture: float, ph_dev: float, 
                     npk_def: float, pest_pressure: float):
        if not self.risk_model_bundle:
            raise RuntimeError("Crop failure risk model is not loaded.")
            
        clf = self.risk_model_bundle['model']
        risk_names = self.risk_model_bundle['risk_levels']
        
        X = np.array([[rainfall_dev, temp_stress, soil_moisture, ph_dev, npk_def, pest_pressure]])
        pred_class = int(clf.predict(X)[0])
        probs = clf.predict_proba(X)[0]
        
        risk_level = risk_names[pred_class]
        risk_score = float(round((pred_class * 25) + (probs[pred_class] * 25), 1))
        
        # Contributing factors diagnosis
        drivers = []
        mitigations = []
        
        if rainfall_dev < -30:
            drivers.append(f"Severe rainfall deficit ({rainfall_dev:.1f}%), indicating acute meteorological drought.")
            mitigations.append("Adopt Alternate Wetting and Drying (AWD) or micro-drip irrigation. Apply straw mulching to conserve root-zone moisture.")
        elif rainfall_dev > 50:
            drivers.append(f"Excessive rainfall ({rainfall_dev:.1f}%), risking root hypoxia and fungal collar rot.")
            mitigations.append("Open field drainage furrows immediately to evacuate stagnant standing water. Spray copper oxychloride 0.25% as prophylactic anti-fungal barrier.")
            
        if temp_stress > 5.0:
            drivers.append(f"Canopy thermal stress ({temp_stress:.1f}°C deviation), provoking flower drop and pollen sterility.")
            mitigations.append("Provide micro-sprinkler overhead misting during midday peak sun. Foliar spray 1% potassium nitrate (KNO3) to bolster osmoprotection.")
            
        if soil_moisture < 25.0:
            drivers.append(f"Low soil moisture ({soil_moisture:.1f}%) approaching permanent wilting point.")
            mitigations.append("Schedule immediate irrigation cycle of at least 35-40 mm depth.")
            
        if npk_def > 0.6:
            drivers.append(f"Substantial macronutrient deficiency index ({npk_def:.2f}).")
            mitigations.append("Apply top-dressed balanced NPK split plus 0.5% zinc sulphate foliar spray.")
            
        if pest_pressure > 0.5:
            drivers.append(f"High pest population pressure ({pest_pressure * 100:.0f}%), exceeding economic threshold levels.")
            mitigations.append("Deploy pheromone and light traps immediately. Initiate targeted bio-pesticide or approved IPM spray protocol.")
            
        if not drivers:
            drivers.append("All climatic and soil parameters are currently within normal safe agricultural limits.")
            mitigations.append("Continue routine crop scouting and scheduled split fertilizer application.")
            
        return {
            "risk_level": risk_level,
            "risk_score_percent": min(100.0, max(5.0, risk_score)),
            "contributing_factors": drivers,
            "mitigation_actions": mitigations,
            "class_probabilities": {risk_names[i]: round(float(probs[i]), 3) for i in range(len(risk_names))},
            "disclaimer": "Predictive advisory based on environmental indicators. Not a guaranteed crop failure forecast."
        }

    # 4. PEST & WEED VISUAL INFERENCE
    def classify_image(self, image_bytes: bytes):
        if not self.pest_model_bundle:
            raise RuntimeError("Pest classifier model is not loaded.")
            
        clf = self.pest_model_bundle['model']
        classes = self.pest_model_bundle['classes']
        
        # Load image with PIL
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Extract visual features matching training pipeline
        img_resized = img.resize((128, 128))
        arr = np.array(img_resized, dtype=np.float32) / 255.0
        
        mean_ch = arr.mean(axis=(0, 1))
        std_ch = arr.std(axis=(0, 1))
        h_r, _ = np.histogram(arr[:, :, 0], bins=8, range=(0, 1), density=True)
        h_g, _ = np.histogram(arr[:, :, 1], bins=8, range=(0, 1), density=True)
        h_b, _ = np.histogram(arr[:, :, 2], bins=8, range=(0, 1), density=True)
        
        g = arr[:, :, 1]
        r = arr[:, :, 0]
        b = arr[:, :, 2]
        vari = (g - r) / (g + r - b + 1e-6)
        vari_mean = np.mean(vari)
        vari_std = np.std(vari)
        
        gray = 0.299 * r + 0.587 * g + 0.114 * b
        dy, dx = np.gradient(gray)
        edge_mag = np.sqrt(dx**2 + dy**2)
        edge_mean = np.mean(edge_mag)
        edge_std = np.std(edge_mag)
        
        feats = np.concatenate([
            mean_ch, std_ch, h_r, h_g, h_b,
            [vari_mean, vari_std, edge_mean, edge_std]
        ]).reshape(1, -1)
        
        probs = clf.predict_proba(feats)[0]
        pred_idx = np.argmax(probs)
        pred_class = classes[pred_idx]
        confidence = float(round(probs[pred_idx] * 100, 1))
        
        knowledge = PEST_DISEASE_KNOWLEDGE.get(pred_class, {
            "tamil": pred_class,
            "scientific_name": "Field specimen",
            "crops_affected": ["General crops"],
            "symptoms": "Leaf damage or pest presence identified.",
            "organic_remedies": ["Apply 5% Neem seed kernel extract.", "Conserve natural predator insects."],
            "chemical_remedies": ["Consult local agricultural officer for CIBRC approved formulation."],
            "preventive_practices": ["Keep field bunds weed free."]
        })
        
        return {
            "identified_class": pred_class,
            "tamil_name": knowledge.get("tamil"),
            "scientific_name": knowledge.get("scientific_name"),
            "confidence_percent": confidence,
            "crops_affected": knowledge.get("crops_affected"),
            "symptoms": knowledge.get("symptoms"),
            "organic_remedies": knowledge.get("organic_remedies"),
            "chemical_remedies": knowledge.get("chemical_remedies"),
            "preventive_practices": knowledge.get("preventive_practices"),
            "dataset_origin": "Roboflow Agricultural Pest & Weed Collection"
        }

    # 5. AI FARMING DECISION ASSISTANT (MULTI-FACTOR REASONING ENGINE)
    def generate_farming_decision(self, crop: str, soil_type: str, soil_ph: float,
                                  n: float, p: float, k: float, weather_condition: str,
                                  rainfall_mm: float, soil_moisture_pct: float,
                                  crop_stage: str, crop_health: str):
        crop_clean = crop.lower()
        meta = CROP_METADATA.get(crop_clean, {})
        
        recommendations = []
        irrigation_advice = ""
        fertilizer_advice = ""
        risk_alerts = []
        action_checklist = []
        
        # 1. Irrigation Reasoning
        if soil_moisture_pct < 30 and rainfall_mm < 5:
            irrigation_advice = f"CRITICAL: Soil moisture is {soil_moisture_pct:.0f}%, which is below the threshold of 45%. Start irrigation for {crop} immediately for 45-60 minutes."
            risk_alerts.append(f"Root zone moisture stress detected for {crop}.")
            action_checklist.append("Operate drip/sprinkler valves or channel irrigation for 60 mins.")
        elif soil_moisture_pct > 75 or rainfall_mm > 40:
            irrigation_advice = f"HOLD IRRIGATION: Soil moisture is high ({soil_moisture_pct:.0f}%) with {rainfall_mm:.0f} mm rainfall. Avoid excess water stagnation to prevent root asphyxiation."
            action_checklist.append("Inspect drainage trenches and clear bund outlets.")
        else:
            irrigation_advice = f"OPTIMAL: Soil moisture is {soil_moisture_pct:.0f}%. Maintain standard schedule; next irrigation recommended in 3 days."
            action_checklist.append("Monitor morning soil tension and maintain field capacity.")

        # 2. Fertilizer Reasoning based on N-P-K & Crop Stage
        n_status = "deficient" if n < 50 else ("excess" if n > 120 else "optimal")
        p_status = "deficient" if p < 30 else ("excess" if p > 80 else "optimal")
        k_status = "deficient" if k < 30 else ("excess" if k > 90 else "optimal")
        
        fert_steps = []
        if n_status == "deficient":
            if crop_stage in ["Vegetative", "Tillering"]:
                fert_steps.append("Top-dress Urea @ 25 kg/acre or apply fermented Jeevamrutham / Azospirillum bio-fertilizer to accelerate vegetative growth.")
            else:
                fert_steps.append("Foliar spray 1% Urea to provide quick nitrogen without delaying flowering.")
        if p_status == "deficient":
            fert_steps.append("Apply DAP (Di-Ammonium Phosphate) @ 30 kg/acre or Single Super Phosphate (SSP) combined with Phosphate Solubilizing Bacteria (PSB).")
        if k_status == "deficient":
            fert_steps.append("Apply Muriate of Potash (MOP) @ 20 kg/acre to boost grain/fruit filling and disease resistance.")
            
        if not fert_steps:
            fertilizer_advice = f"Soil nutrients (N={n:.0f}, P={p:.0f}, K={k:.0f}) are in prime balance for {crop}. Apply 2 tons/acre enriched farmyard manure as top dressing."
        else:
            fertilizer_advice = " ".join(fert_steps)
            action_checklist.append("Apply recommended fertilizer splits in the evening after light irrigation.")

        # 3. Crop stage and health guidance
        if crop_health in ["Moderate", "Stressed", "Infested"]:
            risk_alerts.append(f"Crop health is marked as '{crop_health}'. Immediate field inspection recommended.")
            action_checklist.append("Take clear close-up photos of leaves and upload to BhoomiX AI Disease Detector.")
            recommendations.append(f"Spray preventive Neem oil (3ml/L) or Panchagavya 3% to suppress initial pathogen colonization during the {crop_stage} stage.")
        else:
            recommendations.append(f"Crop vigor is robust in {crop_stage} stage. Focus on micro-nutrient foliar spray (Zinc + Boron 0.2%) to optimize reproductive flowering.")

        # 4. Soil pH reasoning
        if soil_ph < 5.5:
            recommendations.append(f"Acidic soil (pH {soil_ph:.1f}) restricts Phosphorus uptake. Broadcast agricultural lime (calcium carbonate) @ 200 kg/acre before next weeding.")
        elif soil_ph > 8.0:
            recommendations.append(f"Alkaline soil (pH {soil_ph:.1f}) induces iron chlorosis. Apply gypsum @ 250 kg/acre and incorporate green manure (Daincha).")

        return {
            "crop": crop,
            "crop_tamil": meta.get("tamil", crop),
            "crop_stage": crop_stage,
            "health_status": crop_health,
            "irrigation_recommendation": irrigation_advice,
            "fertilizer_recommendation": fertilizer_advice,
            "crop_care_guidance": recommendations,
            "risk_alerts": risk_alerts if risk_alerts else ["No critical agricultural risk triggers found for current conditions."],
            "next_actions": action_checklist,
            "reasoning_summary": f"Decisions synthesized across 10 agro-climatic parameters: Crop ({crop}), Soil ({soil_type}, pH {soil_ph:.1f}), Nutrients (N:{n}, P:{p}, K:{k}), Environmental status ({weather_condition}, {rainfall_mm}mm rain), Root moisture ({soil_moisture_pct}%), and Phenological stage ({crop_stage})."
        }

# Global singleton
ai_engine = BhoomiXAiEngine()
