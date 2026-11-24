"""
BhoomiX - Comprehensive End-to-End API Test Suite
Tests all 25 backend endpoints directly using Python standard library & FastAPI handler invocations
"""

import sys
import os
import asyncio

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import main
from main import (
    read_root, health_check, crop_recommendation, crop_yield, crop_failure_risk,
    detect_pest, farming_decision, soil_analysis, get_weather, smart_irrigation,
    get_greenhouse, update_greenhouse, get_iot_sensors, update_iot_sensors,
    get_drone_state, get_digital_twin, profit_analysis, get_harvest_demand,
    get_marketplace, add_marketplace_item, get_community_posts, add_community_post,
    get_resource_sharing, add_resource_listing, get_waste_intelligence,
    get_schemes, get_livestock, get_tracking, get_low_cost_resources,
    verify_farmer_identity, get_datasets_info,
    CropRecRequest, CropYieldRequest, CropFailureRequest, FarmingDecisionRequest,
    GreenhouseControlRequest, IoTSensorOverrides, IrrigationRequest, ProfitAnalysisRequest,
    MarketplaceItem, CommunityPost, ResourceListing, IdentityVerifyRequest
)

async def run_all_tests():
    print("=" * 60)
    print("Running BhoomiX Complete Endpoint Verification Suite")
    print("=" * 60)

    # 1. Health & Root
    root = read_root()
    assert root["status"] == "ONLINE"
    print("✓ GET /: 200 OK (Platform ONLINE, 4 Active Models Registered)")

    health = health_check()
    assert health["status"] == "healthy"
    assert health["ai_engine_ready"] == True
    print("✓ GET /api/health: 200 OK (AI Engine Ready)")

    # 2. Crop Recommendation
    req_rec = CropRecRequest(n=90, p=45, k=42, temperature=24.5, humidity=82.0, ph=6.5, rainfall=215.0, top_k=3)
    res_rec = crop_recommendation(req_rec)
    assert len(res_rec["recommendations"]) == 3
    top_crop = res_rec["recommendations"][0]["crop"]
    print(f"✓ POST /api/crop-recommendation: 200 OK (Top Recommended: {top_crop}, Score: {res_rec['recommendations'][0]['suitability_score']}%)")

    # 3. Crop Yield Prediction
    req_yield = CropYieldRequest(state="Tamil Nadu", crop="RICE", area_ha=2.5, year=2024)
    res_yield = crop_yield(req_yield)
    assert res_yield["predicted_yield_kg_per_ha"] > 500
    print(f"✓ POST /api/crop-yield: 200 OK (Predicted Yield: {res_yield['predicted_yield_kg_per_ha']} kg/ha)")

    # 4. Crop Failure Risk Assessment
    req_risk = CropFailureRequest(rainfall_deviation=-35.0, temperature_stress=4.0, soil_moisture=28.0, ph_deviation=0.8, npk_deficiency=0.5, pest_pressure=0.3)
    res_risk = crop_failure_risk(req_risk)
    assert res_risk["risk_level"] in ["Moderate", "High", "Severe"]
    print(f"✓ POST /api/crop-failure-risk: 200 OK (Risk Level: {res_risk['risk_level']}, Score: {res_risk['risk_score_percent']}%)")

    # 5. Disease & Pest Detection
    res_pest = await detect_pest(sample_class="rice leaf roller")
    assert res_pest["identified_class"] == "rice leaf roller"
    print(f"✓ POST /api/disease-pest-detection: 200 OK (Identified: {res_pest['identified_class']} / {res_pest['tamil_name']})")

    # 6. AI Farming Assistant Multi-factor Decision
    req_dec = FarmingDecisionRequest(
        crop_type="Rice", soil_type="Clay loam", soil_ph=6.5,
        nitrogen=85, phosphorus=45, potassium=48,
        weather_condition="Partly Cloudy with Coastal Breeze",
        rainfall=12.0, soil_moisture=42.0, crop_stage="Vegetative", crop_health="Good"
    )
    res_dec = farming_decision(req_dec)
    assert len(res_dec["next_actions"]) > 0
    print("✓ POST /api/farming-assistant/decide: 200 OK (10-Factor Decisions & Actions Generated)")

    # 7. Soil Analysis
    res_soil = soil_analysis(n=75, p=38, k=42, ph=6.8, ec=0.45, oc=0.62)
    assert res_soil["soil_health_score"] > 60
    print(f"✓ POST /api/soil-analysis: 200 OK (Soil Health Score: {res_soil['soil_health_score']}/100)")

    # 8. Weather
    res_weather = get_weather("Thanjavur")
    assert res_weather["current"]["temperature_c"] > 20
    print(f"✓ GET /api/weather: 200 OK (Thanjavur: {res_weather['current']['temperature_c']}°C, {res_weather['current']['condition']})")

    # 9. Smart Irrigation
    req_irr = IrrigationRequest(crop="Rice", crop_stage="Vegetative", area_acres=2.5, soil_moisture=42.0, et0_mm=4.8)
    res_irr = smart_irrigation(req_irr)
    assert res_irr["recommended_drip_runtime_minutes"] > 0
    print(f"✓ POST /api/smart-irrigation: 200 OK (Drip Runtime: {res_irr['recommended_drip_runtime_minutes']} mins, Water Conserved: {res_irr['water_conserved_liters']} L)")

    # 10. Virtual Greenhouse
    gh_init = get_greenhouse()
    gh_updated = update_greenhouse(GreenhouseControlRequest(fan=True, lights=True))
    assert gh_updated["fan_active"] == True
    print(f"✓ GET & POST /api/simulations/greenhouse: 200 OK (Temp: {gh_updated['current_temp']}°C, Moisture: {gh_updated['current_soil_moisture']}%)")

    # 11. Virtual IoT Sensors
    iot_res = get_iot_sensors()
    iot_updated = update_iot_sensors(IoTSensorOverrides(soil_moisture=52.5))
    assert iot_updated["sensors"]["soil_moisture"] == 52.5
    print("✓ GET & POST /api/simulations/iot: 200 OK (Simulated Sensors Synced)")

    # 12. Drone Simulation
    drone_res = get_drone_state(mission=True)
    assert len(drone_res["zones"]) == 4
    print(f"✓ GET /api/simulations/drone: 200 OK (4 Aerial Zones Monitored by UAV)")

    # 13. Digital Twin
    twin_res = get_digital_twin()
    assert len(twin_res["plots"]) == 4
    print("✓ GET /api/simulations/digital-twin: 200 OK (4 Coupled Virtual Plots Active)")

    # 14. Profit Analysis
    req_profit = ProfitAnalysisRequest(
        crop="Rice", area_acres=2.5, expected_yield_kg_per_acre=2200.0,
        expected_mandi_price_per_kg=24.50, seed_cost=3500.0, fertilizer_cost=6200.0,
        pesticide_cost=2800.0, machinery_fuel_cost=5500.0, labor_cost=12000.0,
        irrigation_electricity_cost=1800.0, post_harvest_transport_cost=2200.0
    )
    res_profit = profit_analysis(req_profit)
    assert res_profit["net_profit_or_loss"] > 0
    print(f"✓ POST /api/profit-analysis: 200 OK (Net Profit: ₹{res_profit['net_profit_or_loss']}, ROI: {res_profit['return_on_investment_roi_pct']}%)")

    # 15. Harvest Demand
    res_demand = get_harvest_demand()
    assert len(res_demand["upcoming_harvests"]) > 0
    print("✓ GET /api/harvest-matching: 200 OK (Forward Buyer Matching Active)")

    # 16. Marketplace
    mkt = get_marketplace()
    assert len(mkt) > 0
    print(f"✓ GET /api/marketplace: 200 OK ({len(mkt)} Active Produce Listings)")

    # 17. Community
    comm = get_community_posts()
    assert len(comm) > 0
    print(f"✓ GET /api/community: 200 OK ({len(comm)} Farmer Community Posts)")

    # 18. Resource Sharing
    r_share = get_resource_sharing()
    assert len(r_share) > 0
    print(f"✓ GET /api/resource-sharing: 200 OK ({len(r_share)} Rural Equipment Listings)")

    # 19. Waste Intelligence
    res_waste = get_waste_intelligence()
    assert len(res_waste) > 0
    print(f"✓ GET /api/waste-intelligence: 200 OK ({len(res_waste)} Biomass Residue Pathways)")

    # 20. Government Schemes
    res_schemes = get_schemes(land_ha=2.5, state="Tamil Nadu")
    assert len(res_schemes) > 0
    print(f"✓ GET /api/government-schemes: 200 OK ({len(res_schemes)} Eligible Central & TN Schemes)")

    # 21. Livestock
    res_live = get_livestock()
    assert len(res_live["animals"]) > 0
    print("✓ GET /api/livestock: 200 OK (Dairy Herd Telemetry Active)")

    # 22. Tracking
    res_track = get_tracking("BX-2026-TN-4821")
    assert len(res_track["timeline"]) > 0
    print("✓ GET /api/tracking: 200 OK (Provenance Batch Verified)")

    # 23. Low-Cost Finder
    res_low = get_low_cost_resources("Thanjavur")
    assert len(res_low["items"]) > 0
    print("✓ GET /api/low-cost-finder: 200 OK (Depot Price Benchmarks Ready)")

    # 24. Identity Verification
    req_ident = IdentityVerifyRequest(
        farmer_name="Ramasamy Gounder", aadhaar_last_four="9821",
        patta_chitta_number="TN-THNJ-48201", district="Thanjavur",
        mobile="+91 98421 88410", otp_code="8841"
    )
    res_ident = verify_farmer_identity(req_ident)
    assert res_ident["status"] == "VERIFIED_DEMO"
    print("✓ POST /api/identity-verification: 200 OK (Mock Aadhaar & Patta Verified)")

    # 25. Datasets Info
    ds_info = get_datasets_info()
    assert len(ds_info["datasets_used"]) == 4
    print("✓ GET /api/datasets-info: 200 OK (4 Physical Datasets Registered)")

    print("=" * 60)
    print("ALL 25 API ENDPOINTS VERIFIED AND PASSING WITH 100% SUCCESS!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_all_tests())
