// BhoomiX Platform Types

export type Language = 'en' | 'ta';

export interface CropRecommendation {
  crop: string;
  tamil_name: string;
  suitability_score: number;
  season: string;
  water_requirement_mm: number;
  optimal_ph_range: string;
  expected_yield_kg_ha: number;
  mandi_price_quintal: number;
  explanation: string;
}

export interface CropRecommendationResponse {
  input_parameters: {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
  };
  recommendations: CropRecommendation[];
  feature_importances: Record<string, number>;
  model_accuracy: number;
}

export interface CropYieldResponse {
  state: string;
  crop: string;
  area_ha: number;
  predicted_yield_kg_per_ha: number;
  estimated_production_metric_tons: number;
  r2_score: number;
  historical_dataset: string;
}

export interface CropFailureRiskResponse {
  risk_level: string;
  risk_score_percent: number;
  contributing_factors: string[];
  mitigation_actions: string[];
  class_probabilities: Record<string, number>;
  disclaimer: string;
}

export interface PestDetectionResponse {
  identified_class: string;
  tamil_name: string;
  scientific_name: string;
  confidence_percent: number;
  crops_affected: string[];
  symptoms: string;
  organic_remedies: string[];
  chemical_remedies: string[];
  preventive_practices: string[];
  dataset_origin: string;
}

export interface FarmingDecisionResponse {
  crop: string;
  crop_tamil: string;
  crop_stage: string;
  health_status: string;
  irrigation_recommendation: string;
  fertilizer_recommendation: string;
  crop_care_guidance: string[];
  risk_alerts: string[];
  next_actions: string[];
  reasoning_summary: string;
}

export interface DistrictAgriData {
  id: string;
  name: string;
  tamil_name: string;
  zone: string;
  zone_tamil: string;
  lat: number;
  lon: number;
  cultivable_area_ha: number;
  major_crops: string[];
  soil_types: string[];
  irrigation_sources: string[];
  annual_rainfall_mm: number;
  characteristics: string;
  color?: string;
}

export interface AgroClimaticZone {
  name: string;
  tamil: string;
  color: string;
  districts: string[];
  rainfall_annual_mm: number;
  primary_crops: string;
  characteristics: string;
}

export interface DailyForecast {
  date: string;
  max_temp_c: number;
  min_temp_c: number;
  rain_mm: number;
  condition: string;
}

export interface AgroAdvisories {
  irrigation: string;
  sowing: string;
  fertilizer: string;
  pest_management: string;
  harvesting: string;
}

export interface LiveWeatherResponse {
  district: string;
  tamil_name: string;
  zone: string;
  current: {
    temp_c: number;
    feels_like_c: number;
    humidity_pct: number;
    wind_speed_kmh: number;
    wind_direction_deg: number;
    wind_compass: string;
    condition: string;
    rainfall_mm: number;
    pressure_hpa: number;
    uv_index: number;
  };
  forecast_7day: DailyForecast[];
  agro_advisories: AgroAdvisories;
  source: string;
  timestamp: string;
}

export interface ProfitAnalysisResponse {
  crop: string;
  area_acres: number;
  total_production_cost: number;
  gross_expected_revenue: number;
  net_profit_or_loss: number;
  is_profitable: boolean;
  profit_margin_percent: number;
  return_on_investment_roi_pct: number;
  production_cost_per_kg: number;
  expected_yield_quintals: number;
  expense_breakdown: Array<{ category: string; amount: number; pct: number }>;
  sensitivity_scenarios: {
    if_market_price_rises_10pct: number;
    if_market_price_drops_10pct: number;
  };
  financial_advisory: string;
}
