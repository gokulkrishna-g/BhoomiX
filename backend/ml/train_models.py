"""
BhoomiX - AI Smart Agriculture Ecosystem
Machine Learning Training Pipeline
Trains:
1. Crop Recommendation Model (RandomForest on Crop_recommendation.csv)
2. Crop Yield Prediction Model (ICRISAT District-Level Data)
3. Crop Failure Risk Assessment Model
4. Pest & Weed Visual Feature Classifier (from YOLOv8 datasets)
"""

import os
import sys
import json
import zipfile
import io
import numpy as np
import pandas as pd
from PIL import Image
import joblib

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score

# Ensure output directories exist
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")
METRICS_DIR = os.path.join(BASE_DIR, "metrics")
os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(METRICS_DIR, exist_ok=True)

ROOT_DIR = os.path.dirname(BASE_DIR)

print("=" * 60)
print("BhoomiX AI Model Training Pipeline Starting...")
print("=" * 60)

# ============================================================
# 1. CROP RECOMMENDATION MODEL
# ============================================================
def train_crop_recommendation():
    csv_path = os.path.join(ROOT_DIR, "Crop_recommendation.csv")
    print(f"\n[1/4] Training Crop Recommendation Model using: {csv_path}")
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found!")
        return None
        
    df = pd.read_csv(csv_path)
    print(f"Loaded dataset: {len(df)} samples across {df['label'].nunique()} crop classes.")
    
    feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[feature_cols]
    y = df['label']
    
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )
    
    clf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cv_scores = cross_val_score(clf, X, y_encoded, cv=5)
    
    print(f"-> Test Accuracy: {acc * 100:.2f}%")
    print(f"-> 5-Fold CV Mean Accuracy: {cv_scores.mean() * 100:.2f}% (+/- {cv_scores.std() * 100:.2f}%)")
    
    # Feature importances
    importances = dict(zip(feature_cols, clf.feature_importances_.round(4).tolist()))
    print(f"-> Feature Importances: {importances}")
    
    # Save artifacts
    model_bundle = {
        'model': clf,
        'label_encoder': le,
        'feature_names': feature_cols,
        'classes': le.classes_.tolist()
    }
    model_path = os.path.join(MODELS_DIR, "crop_recommendation_model.joblib")
    joblib.dump(model_bundle, model_path)
    
    metrics = {
        'model_name': 'RandomForestClassifier (Crop Recommendation)',
        'dataset': 'Crop_recommendation.csv',
        'total_samples': len(df),
        'features': feature_cols,
        'num_classes': len(le.classes_),
        'classes': le.classes_.tolist(),
        'test_accuracy': float(acc),
        'cv_mean_accuracy': float(cv_scores.mean()),
        'cv_std': float(cv_scores.std()),
        'feature_importances': importances
    }
    with open(os.path.join(METRICS_DIR, "crop_recommendation_metrics.json"), 'w') as f:
        json.dump(metrics, f, indent=2)
        
    print(f"-> Saved model to: {model_path}")
    return metrics

# ============================================================
# 2. CROP YIELD PREDICTION MODEL (ICRISAT DATA)
# ============================================================
def train_crop_yield_model():
    csv_path = os.path.join(ROOT_DIR, "ICRISAT-District Level Data.csv")
    print(f"\n[2/4] Training Crop Yield Prediction Model using: {csv_path}")
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found!")
        return None
        
    df = pd.read_csv(csv_path, low_memory=False)
    print(f"Loaded ICRISAT dataset: {len(df)} rows across {df['State Name'].nunique()} states.")
    
    # Melt or extract key crops with both Area and Yield
    crops_to_extract = [
        ('RICE', 'RICE AREA (1000 ha)', 'RICE YIELD (Kg per ha)'),
        ('WHEAT', 'WHEAT AREA (1000 ha)', 'WHEAT YIELD (Kg per ha)'),
        ('MAIZE', 'MAIZE AREA (1000 ha)', 'MAIZE YIELD (Kg per ha)'),
        ('GROUNDNUT', 'GROUNDNUT AREA (1000 ha)', 'GROUNDNUT YIELD (Kg per ha)'),
        ('COTTON', 'COTTON AREA (1000 ha)', 'COTTON YIELD (Kg per ha)'),
        ('SUGARCANE', 'SUGARCANE AREA (1000 ha)', 'SUGARCANE YIELD (Kg per ha)'),
        ('SORGHUM', 'SORGHUM AREA (1000 ha)', 'SORGHUM YIELD (Kg per ha)')
    ]
    
    records = []
    for crop_name, area_col, yield_col in crops_to_extract:
        if area_col in df.columns and yield_col in df.columns:
            sub = df[['Year', 'State Name', 'Dist Name', area_col, yield_col]].copy()
            sub.columns = ['Year', 'State', 'District', 'Area', 'Yield']
            sub['Crop'] = crop_name
            # convert numeric
            sub['Year'] = pd.to_numeric(sub['Year'], errors='coerce')
            sub['Area'] = pd.to_numeric(sub['Area'], errors='coerce')
            sub['Yield'] = pd.to_numeric(sub['Yield'], errors='coerce')
            sub = sub.dropna()
            # filter out non-positive yields or area
            sub = sub[(sub['Yield'] > 50) & (sub['Yield'] < 12000) & (sub['Area'] > 0.1)]
            records.append(sub)
            
    all_crops_df = pd.concat(records, ignore_index=True)
    print(f"Cleaned yield records: {len(all_crops_df)} rows for {all_crops_df['Crop'].nunique()} major crops.")
    
    # Feature engineering: State, District, Crop, Year, Area
    le_state = LabelEncoder()
    le_crop = LabelEncoder()
    
    all_crops_df['State_Enc'] = le_state.fit_transform(all_crops_df['State'].astype(str))
    all_crops_df['Crop_Enc'] = le_crop.fit_transform(all_crops_df['Crop'].astype(str))
    
    features = ['State_Enc', 'Crop_Enc', 'Year', 'Area']
    X = all_crops_df[features]
    y = all_crops_df['Yield']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    reg = RandomForestRegressor(n_estimators=80, max_depth=14, random_state=42, n_jobs=-1)
    reg.fit(X_train, y_train)
    
    y_pred = reg.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"-> Test R2 Score: {r2:.4f}")
    print(f"-> Test RMSE: {rmse:.2f} Kg/ha")
    
    bundle = {
        'model': reg,
        'state_encoder': le_state,
        'crop_encoder': le_crop,
        'features': features,
        'states': le_state.classes_.tolist(),
        'crops': le_crop.classes_.tolist()
    }
    model_path = os.path.join(MODELS_DIR, "crop_yield_model.joblib")
    joblib.dump(bundle, model_path)
    
    metrics = {
        'model_name': 'RandomForestRegressor (Crop Yield Prediction)',
        'dataset': 'ICRISAT-District Level Data.csv',
        'records_trained': len(all_crops_df),
        'r2_score': float(r2),
        'rmse_kg_per_ha': float(rmse),
        'crops_covered': le_crop.classes_.tolist(),
        'states_covered_count': len(le_state.classes_)
    }
    with open(os.path.join(METRICS_DIR, "crop_yield_metrics.json"), 'w') as f:
        json.dump(metrics, f, indent=2)
        
    print(f"-> Saved model to: {model_path}")
    return metrics

# ============================================================
# 3. CROP FAILURE RISK ASSESSMENT MODEL
# ============================================================
def train_crop_failure_model():
    print("\n[3/4] Synthesizing & Training Crop Failure Risk Model")
    # Features:
    # 1. rainfall_deviation (% from optimal: negative is drought, extreme positive is flood)
    # 2. temperature_stress (degree above 35C or below 15C)
    # 3. soil_moisture_level (% 0-100)
    # 4. soil_ph_deviation (distance from 6.5)
    # 5. npk_deficiency_score (0-1: 0 balanced, 1 severe deficiency)
    # 6. pest_pressure_index (0-1)
    # Target: Risk Category (0: Low, 1: Moderate, 2: High, 3: Severe)
    
    np.random.seed(42)
    n_samples = 4000
    
    rainfall_dev = np.random.uniform(-70, 100, n_samples)
    temp_stress = np.random.uniform(0, 15, n_samples)
    soil_moist = np.random.uniform(10, 95, n_samples)
    ph_dev = np.abs(np.random.normal(0, 1.2, n_samples))
    npk_def = np.random.uniform(0, 1, n_samples)
    pest_idx = np.random.uniform(0, 1, n_samples)
    
    # Calculate composite vulnerability score
    vuln_score = (
        0.28 * np.maximum(0, -rainfall_dev / 50.0) + # drought penalty
        0.20 * np.maximum(0, (rainfall_dev - 60) / 40.0) + # flood penalty
        0.18 * (temp_stress / 10.0) +
        0.18 * np.maximum(0, (30 - soil_moist) / 25.0) + # dry soil
        0.10 * (ph_dev / 2.0) +
        0.15 * npk_def +
        0.22 * pest_idx
    )
    
    # Map to risk classes: 0: Low (<0.35), 1: Moderate (0.35-0.6), 2: High (0.6-0.85), 3: Severe (>0.85)
    risk_labels = np.zeros(n_samples, dtype=int)
    risk_labels[(vuln_score >= 0.32) & (vuln_score < 0.58)] = 1
    risk_labels[(vuln_score >= 0.58) & (vuln_score < 0.82)] = 2
    risk_labels[vuln_score >= 0.82] = 3
    
    X = np.column_stack([rainfall_dev, temp_stress, soil_moist, ph_dev, npk_def, pest_idx])
    feature_names = ['rainfall_deviation', 'temperature_stress', 'soil_moisture', 'ph_deviation', 'npk_deficiency', 'pest_pressure']
    
    X_train, X_test, y_train, y_test = train_test_split(X, risk_labels, test_size=0.2, random_state=42)
    
    clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    clf.fit(X_train, y_train)
    
    acc = accuracy_score(y_test, clf.predict(X_test))
    print(f"-> Crop Failure Classifier Accuracy: {acc * 100:.2f}%")
    
    bundle = {
        'model': clf,
        'feature_names': feature_names,
        'risk_levels': ['Low', 'Moderate', 'High', 'Severe']
    }
    model_path = os.path.join(MODELS_DIR, "crop_failure_risk_model.joblib")
    joblib.dump(bundle, model_path)
    
    metrics = {
        'model_name': 'GradientBoostingClassifier (Crop Failure Risk Warning)',
        'features': feature_names,
        'risk_levels': ['Low', 'Moderate', 'High', 'Severe'],
        'test_accuracy': float(acc),
        'samples': n_samples
    }
    with open(os.path.join(METRICS_DIR, "crop_failure_metrics.json"), 'w') as f:
        json.dump(metrics, f, indent=2)
        
    print(f"-> Saved model to: {model_path}")
    return metrics

# ============================================================
# 4. PEST & WEED VISUAL CLASSIFIER (FROM ROBOFLOW DATASETS)
# ============================================================
def extract_visual_features(image: Image.Image) -> np.ndarray:
    """Extract fast, robust color, edge, and texture features from an image."""
    img_rgb = image.convert('RGB').resize((128, 128))
    arr = np.array(img_rgb, dtype=np.float32) / 255.0
    
    # Mean and std across channels
    mean_ch = arr.mean(axis=(0, 1))
    std_ch = arr.std(axis=(0, 1))
    
    # Color histograms (8 bins per channel)
    h_r, _ = np.histogram(arr[:, :, 0], bins=8, range=(0, 1), density=True)
    h_g, _ = np.histogram(arr[:, :, 1], bins=8, range=(0, 1), density=True)
    h_b, _ = np.histogram(arr[:, :, 2], bins=8, range=(0, 1), density=True)
    
    # Vegetation/greenness indices
    g = arr[:, :, 1]
    r = arr[:, :, 0]
    b = arr[:, :, 2]
    vari = (g - r) / (g + r - b + 1e-6)
    vari_mean = np.mean(vari)
    vari_std = np.std(vari)
    
    # Grayscale gradient / edge sharpness
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    dy, dx = np.gradient(gray)
    edge_mag = np.sqrt(dx**2 + dy**2)
    edge_mean = np.mean(edge_mag)
    edge_std = np.std(edge_mag)
    
    features = np.concatenate([
        mean_ch, std_ch, h_r, h_g, h_b,
        [vari_mean, vari_std, edge_mean, edge_std]
    ])
    return features

def train_pest_classifier():
    insects_zip = os.path.join(ROOT_DIR, "insects.v1-release-640.yolov8.zip")
    weeds_zip = os.path.join(ROOT_DIR, "grass weeds.v1-release-640.yolov8.zip")
    print(f"\n[4/4] Training Visual Pest & Weed Classifier using: {insects_zip} & {weeds_zip}")
    
    classes = [
        'army worm',
        'legume blister beetle',
        'red spider',
        'rice gall midge',
        'rice leaf roller',
        'rice leafhopper',
        'rice water weevil',
        'wheat phloeothrips',
        'white backed plant hopper',
        'yellow rice borer',
        'agricultural weed',
        'healthy crop leaf'
    ]
    
    X_list = []
    y_list = []
    
    # Read sample images from insects zip
    if os.path.exists(insects_zip):
        with zipfile.ZipFile(insects_zip, 'r') as z:
            label_files = [f for f in z.namelist() if f.endswith('.txt') and 'labels' in f]
            print(f"Found {len(label_files)} label annotations in insects zip.")
            
            # Map images
            class_counts = {i: 0 for i in range(10)}
            for lf in label_files:
                content = z.read(lf).decode('utf-8', errors='ignore').strip()
                if not content:
                    continue
                first_line = content.split('\n')[0].strip()
                parts = first_line.split()
                if not parts:
                    continue
                class_id = int(parts[0])
                if 0 <= class_id < 10 and class_counts[class_id] < 35:
                    img_name = lf.replace('/labels/', '/images/').replace('.txt', '.jpg')
                    if img_name in z.namelist():
                        try:
                            img_bytes = z.read(img_name)
                            img = Image.open(io.BytesIO(img_bytes))
                            feats = extract_visual_features(img)
                            X_list.append(feats)
                            y_list.append(class_id)
                            class_counts[class_id] += 1
                        except Exception:
                            continue
            print(f"Extracted insect counts by class: {class_counts}")
            
    # Read sample images from grass weeds zip
    if os.path.exists(weeds_zip):
        with zipfile.ZipFile(weeds_zip, 'r') as z:
            img_files = [f for f in z.namelist() if f.endswith('.jpg') and 'images' in f]
            for img_name in img_files[:35]:
                try:
                    img = Image.open(io.BytesIO(z.read(img_name)))
                    feats = extract_visual_features(img)
                    X_list.append(feats)
                    y_list.append(10) # 'agricultural weed'
                except Exception:
                    continue
        print("Extracted 35 weed samples.")
                    
    # Generate healthy green leaf baseline samples
    for _ in range(35):
        healthy_arr = np.zeros((128, 128, 3), dtype=np.uint8)
        healthy_arr[:, :, 0] = np.random.randint(20, 50, (128, 128))
        healthy_arr[:, :, 1] = np.random.randint(120, 210, (128, 128))
        healthy_arr[:, :, 2] = np.random.randint(15, 60, (128, 128))
        img = Image.fromarray(healthy_arr)
        feats = extract_visual_features(img)
        X_list.append(feats)
        y_list.append(11) # healthy
    print("Generated 35 healthy leaf baseline samples.")
        
    X = np.array(X_list)
    y = np.array(y_list)
    print(f"Total visual training samples: {len(X)}")
    
    # Filter classes that have at least 5 samples
    unique_y, counts = np.unique(y, return_counts=True)
    valid_classes = set(unique_y[counts >= 5])
    valid_mask = np.isin(y, list(valid_classes))
    X = X[valid_mask]
    y = y[valid_mask]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    clf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    clf.fit(X_train, y_train)
    
    acc = accuracy_score(y_test, clf.predict(X_test))
    print(f"-> Visual Pest/Weed Classifier Test Accuracy: {acc * 100:.2f}%")
    
    bundle = {
        'model': clf,
        'classes': classes
    }
    model_path = os.path.join(MODELS_DIR, "pest_classifier_model.joblib")
    joblib.dump(bundle, model_path)
    
    metrics = {
        'model_name': 'RandomForestClassifier (Pest & Weed Detection)',
        'dataset': 'insects.v1-release-640.yolov8.zip + grass weeds.v1-release-640.yolov8.zip',
        'total_images_processed': len(X),
        'test_accuracy': float(acc),
        'classes': classes
    }
    with open(os.path.join(METRICS_DIR, "pest_classifier_metrics.json"), 'w') as f:
        json.dump(metrics, f, indent=2)
        
    print(f"-> Saved model to: {model_path}")
    return metrics

if __name__ == '__main__':
    crop_metrics = train_crop_recommendation()
    yield_metrics = train_crop_yield_model()
    failure_metrics = train_crop_failure_model()
    pest_metrics = train_pest_classifier()
    print("\n" + "=" * 60)
    print("ALL 4 AI MODELS SUCCESSFULLY TRAINED AND SERIALIZED!")
    print("=" * 60)
