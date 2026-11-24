"""
BhoomiX - Hardware Simulation Engine (Zero Physical Hardware Dependency)
Provides realistic, interactive physics and agronomic response models for:
1. Virtual Greenhouse (Fans, Lights, Misting, Windows, Plant growth)
2. Virtual IoT Sensor Dashboard (Moisture, Temp, Humidity, pH, Lux, Water level)
3. Virtual Drone & Aerial Robotics Simulation (NDVI, thermal, pest zones)
4. Virtual Farm Digital Twin (Plot-level twin simulation)
5. Smart Irrigation & Evapotranspiration
"""

import time
import math
import random

class SimulationEngine:
    def __init__(self):
        # Greenhouse persistent state
        self.greenhouse = {
            "fan_active": False,
            "lights_active": False,
            "watering_active": False,
            "windows_open": False,
            "ambient_temp": 32.5,
            "current_temp": 28.4,
            "current_humidity": 68.0,
            "current_soil_moisture": 52.0,
            "current_co2_ppm": 620,
            "light_lux": 18500,
            "plant_growth_stage": "Flowering / Fruit Setting",
            "plant_health_pct": 94.0,
            "plant_growth_progress": 68.5,
            "target_crop": "Capsicum & Cherry Tomato"
        }
        
        # IoT Dashboard sensors state
        self.iot_sensors = {
            "soil_moisture": 48.2,     # %
            "temperature": 29.5,       # °C
            "humidity": 64.0,          # %
            "soil_ph": 6.8,            # pH
            "light_intensity": 22400,  # Lux
            "water_tank_level": 82.0,  # %
            "nitrogen_ppm": 88,        # mg/kg
            "phosphorus_ppm": 42,      # mg/kg
            "potassium_ppm": 55,       # mg/kg
            "battery_level": 96.0,     # %
            "status": "ONLINE (Simulated Real-time Bus)"
        }
        
        # Digital Twin Plots
        self.digital_twin_plots = [
            {
                "id": "plot_1",
                "name": "North Field - Plot A",
                "tamil_name": "வடக்கு வயல் - பகுதி A",
                "crop": "Paddy (ADT 45 Rice)",
                "area_acres": 2.5,
                "sowing_date": "2026-09-15",
                "stage": "Panicle Initiation",
                "stage_progress_pct": 65,
                "soil_moisture": 62.0,
                "soil_health_score": 92,
                "irrigation_mode": "Automated AWD",
                "canopy_ndvigreencover": 0.82,
                "pest_risk": "Low",
                "est_harvest_date": "2026-12-28",
                "status": "Thriving"
            },
            {
                "id": "plot_2",
                "name": "East Meadow - Plot B",
                "tamil_name": "கிழக்கு புல்வெளி - பகுதி B",
                "crop": "Cotton (Bt Cotton)",
                "area_acres": 3.0,
                "sowing_date": "2026-08-20",
                "stage": "Boll Formation",
                "stage_progress_pct": 78,
                "soil_moisture": 44.5,
                "soil_health_score": 86,
                "irrigation_mode": "Drip Fertigation",
                "canopy_ndvigreencover": 0.74,
                "pest_risk": "Moderate (Bollworm scouting advised)",
                "est_harvest_date": "2027-01-15",
                "status": "Active Monitoring"
            },
            {
                "id": "plot_3",
                "name": "Cauvery Basin - Plot C",
                "tamil_name": "காவிரி படுகை - பகுதி C",
                "crop": "Banana (Grand Naine)",
                "area_acres": 1.8,
                "sowing_date": "2026-04-10",
                "stage": "Bunch Maturation",
                "stage_progress_pct": 84,
                "soil_moisture": 70.0,
                "soil_health_score": 95,
                "irrigation_mode": "Micro-Sprinkler",
                "canopy_ndvigreencover": 0.89,
                "pest_risk": "Low",
                "est_harvest_date": "2026-12-10",
                "status": "Prime Quality"
            },
            {
                "id": "plot_4",
                "name": "South Dryland - Plot D",
                "tamil_name": "தெற்கு மேட்டுநிலம் - பகுதி D",
                "crop": "Finger Millet (Ragi CO 15)",
                "area_acres": 2.0,
                "sowing_date": "2026-10-01",
                "stage": "Vegetative Tillering",
                "stage_progress_pct": 42,
                "soil_moisture": 38.0,
                "soil_health_score": 88,
                "irrigation_mode": "Rainfed + Deficit Drip",
                "canopy_ndvigreencover": 0.65,
                "pest_risk": "Low",
                "est_harvest_date": "2027-01-30",
                "status": "Normal"
            }
        ]

    # --- GREENHOUSE CONTROLS SIMULATION ---
    def update_greenhouse_controls(self, fan: bool = None, lights: bool = None, 
                                   watering: bool = None, windows: bool = None):
        if fan is not None:
            self.greenhouse["fan_active"] = fan
        if lights is not None:
            self.greenhouse["lights_active"] = lights
        if watering is not None:
            self.greenhouse["watering_active"] = watering
        if windows is not None:
            self.greenhouse["windows_open"] = windows
            
        # Re-compute responsive micro-climate physics
        # Baseline internal greenhouse physics
        temp = 28.0
        humidity = 65.0
        moisture = self.greenhouse["current_soil_moisture"]
        co2 = 600
        lux = 15000
        
        # Fan effect: cools down, slightly reduces humidity, circulates fresh air
        if self.greenhouse["fan_active"]:
            temp -= 3.5
            humidity -= 8.0
            co2 += 50
            
        # Windows open effect: temp and humidity drift toward ambient
        if self.greenhouse["windows_open"]:
            temp = (temp + self.greenhouse["ambient_temp"]) / 2.0
            humidity = (humidity + 55.0) / 2.0
            co2 = 420
            
        # Lights effect: increases temperature by 1.5°C, boosts lux
        if self.greenhouse["lights_active"]:
            temp += 1.8
            lux += 28000
            
        # Watering effect: boosts soil moisture and localized air humidity
        if self.greenhouse["watering_active"]:
            moisture = min(95.0, moisture + 12.0)
            humidity = min(92.0, humidity + 14.0)
        else:
            moisture = max(20.0, moisture - 0.5)
            
        # Calculate plant growth vitality response
        optimal_score = 100.0
        if temp < 20 or temp > 32:
            optimal_score -= abs(temp - 25) * 3
        if humidity < 50 or humidity > 85:
            optimal_score -= abs(humidity - 68) * 1.5
        if moisture < 40:
            optimal_score -= (40 - moisture) * 2
            
        self.greenhouse["current_temp"] = round(temp, 1)
        self.greenhouse["current_humidity"] = round(humidity, 1)
        self.greenhouse["current_soil_moisture"] = round(moisture, 1)
        self.greenhouse["current_co2_ppm"] = int(co2)
        self.greenhouse["light_lux"] = int(lux)
        self.greenhouse["plant_health_pct"] = round(max(30.0, min(99.0, optimal_score)), 1)
        
        return self.greenhouse

    # --- IOT SENSOR OVERRIDES & FEEDBACK ---
    def update_iot_sensors(self, overrides: dict = None):
        if overrides:
            for k, v in overrides.items():
                if k in self.iot_sensors:
                    self.iot_sensors[k] = float(v)
                    
        # Derive live system alerts from simulated readings
        alerts = []
        if self.iot_sensors["soil_moisture"] < 35.0:
            alerts.append({"severity": "warning", "msg": "Soil moisture critically low! Triggering automated micro-irrigation valve recommendation."})
        elif self.iot_sensors["soil_moisture"] > 80.0:
            alerts.append({"severity": "caution", "msg": "Soil saturation detected. Pausing irrigation to avoid root hypoxia."})
            
        if self.iot_sensors["temperature"] > 38.0:
            alerts.append({"severity": "danger", "msg": "Extreme heat stress (>38°C). Risk of pollen abortion."})
            
        if self.iot_sensors["soil_ph"] < 5.8:
            alerts.append({"severity": "warning", "msg": "Acidic soil condition (pH < 5.8). Dolomite lime application advised."})
        elif self.iot_sensors["soil_ph"] > 8.2:
            alerts.append({"severity": "warning", "msg": "Alkaline soil condition (pH > 8.2). Gypsum application advised."})
            
        return {
            "sensors": self.iot_sensors,
            "active_alerts": alerts,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    # --- DRONE MONITORING & ROBOTICS SIMULATION ---
    def get_drone_simulation_state(self, mission_active: bool = False):
        zones = [
            {
                "zone_id": "Zone-A1",
                "name": "North Canopy Zone",
                "ndvi_mean": 0.84,
                "canopy_density": "Dense & Uniform",
                "status": "Healthy",
                "weed_density_pct": 2.1,
                "pest_detected": None,
                "coordinates": [10.785, 79.135]
            },
            {
                "zone_id": "Zone-B2",
                "name": "Central Ridge Zone",
                "ndvi_mean": 0.58,
                "canopy_density": "Patchy / Chlorosis",
                "status": "Nutrient Deficiency Detected",
                "weed_density_pct": 14.8,
                "pest_detected": "Early signs of Leaf Roller scraping",
                "coordinates": [10.788, 79.139]
            },
            {
                "zone_id": "Zone-C3",
                "name": "Southern Lowland Zone",
                "ndvi_mean": 0.72,
                "canopy_density": "Moderate",
                "status": "Moisture Deficit in Sub-block 4",
                "weed_density_pct": 5.4,
                "pest_detected": None,
                "coordinates": [10.782, 79.141]
            },
            {
                "zone_id": "Zone-D4",
                "name": "Water Inflow Buffer",
                "ndvi_mean": 0.91,
                "canopy_density": "Lush",
                "status": "Optimal Vigour",
                "weed_density_pct": 8.0,
                "pest_detected": None,
                "coordinates": [10.780, 79.132]
            }
        ]
        
        return {
            "drone_id": "BhoomiX-UAV-Hexa1",
            "battery_pct": 84,
            "altitude_meters": 35.0,
            "speed_m_s": 4.5,
            "flight_mode": "Autonomous Multispectral Scouting",
            "camera_payload": "5-Band Multispectral + High-Res RGB (640x512)",
            "monitored_area_acres": 9.3,
            "zones": zones,
            "spray_readiness": "20L Smart Precision Spray Ready",
            "simulated_telemetry": {
                "gps_fix": "RTK Centimeter Accuracy (Satellites: 22)",
                "wind_speed_kmh": 6.8,
                "gimbal_pitch_deg": -90.0
            }
        }

    # --- DIGITAL TWIN SIMULATION ---
    def get_digital_twin_state(self):
        return {
            "farm_name": "BhoomiX Demo Integrated Farm, Thanjavur Delta",
            "total_area_acres": 9.3,
            "weather_sync": "Thanjavur Agro-Met Station Synced",
            "digital_twin_fidelity": "Full Physics & Agronomic Coupling",
            "plots": self.digital_twin_plots,
            "macro_metrics": {
                "overall_crop_health": 88.8,
                "water_saved_percent": 34.5,
                "fertilizer_efficiency_gain": 22.0,
                "carbon_offset_kg": 420
            }
        }

    # --- SMART IRRIGATION ADVISORY & WATER BUDGET ---
    def calculate_smart_irrigation(self, crop: str, stage: str, area_acres: float, 
                                   soil_moisture: float, et0_mm_day: float = 4.8):
        # Crop coefficient Kc
        kc_map = {
            "Initial": 0.45,
            "Vegetative": 0.85,
            "Mid-Season / Flowering": 1.15,
            "Late Season / Maturation": 0.70
        }
        kc = kc_map.get(stage, 0.90)
        
        # Crop Evapotranspiration ETc = ET0 * Kc
        etc_mm = et0_mm_day * kc
        
        # Moisture deficit threshold (field capacity ~ 75%)
        target_moisture = 70.0
        deficit_pct = max(0.0, target_moisture - soil_moisture)
        
        # Required water in mm and Liters
        # 1 mm over 1 acre = 4,046.86 Liters
        req_depth_mm = round((deficit_pct / 100.0) * 45.0, 1)
        total_liters = int(req_depth_mm * 4047 * area_acres)
        
        # Drip irrigation runtime at standard 8 LPH dripper spacing
        # Approx 1 acre requires ~4000 drippers => ~32,000 LPH flow
        runtime_minutes = int(round((total_liters / max(1000, 32000 * area_acres)) * 60)) if req_depth_mm > 0 else 0
        
        flood_liters = int(total_liters * 2.2) # Flood irrigation uses 2.2x more water
        water_saved_liters = flood_liters - total_liters
        
        return {
            "crop": crop,
            "growth_stage": stage,
            "area_acres": area_acres,
            "reference_et0_mm": et0_mm_day,
            "crop_coefficient_kc": kc,
            "crop_evapotranspiration_etc_mm": round(etc_mm, 2),
            "current_soil_moisture_pct": soil_moisture,
            "target_moisture_pct": target_moisture,
            "irrigation_depth_required_mm": req_depth_mm,
            "precise_water_volume_liters": total_liters,
            "traditional_flood_volume_liters": flood_liters,
            "water_conserved_liters": water_saved_liters,
            "recommended_drip_runtime_minutes": runtime_minutes,
            "scheduled_time": "Early morning (06:00 - 08:00 AM) to minimize evaporative loss"
        }

# Global singleton
sim_engine = SimulationEngine()
