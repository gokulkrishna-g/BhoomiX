// BhoomiX - Tamil Nadu Regulated Agricultural Market Prices (Mandis & Uzhavar Sandhai)
// Sourced from Department of Agricultural Marketing & Agri Business, Govt of Tamil Nadu & AGMARKNET

export interface MandiPriceItem {
  id: string;
  market_name: string;
  market_name_ta: string;
  district: string;
  district_ta: string;
  commodity: string;
  commodity_ta: string;
  variety: string;
  min_price_quintal: number;
  max_price_quintal: number;
  modal_price_quintal: number;
  price_per_kg: number;
  daily_trend: string; // "+2.5%", "0.0%", "-1.2%"
  arrival_quantity_tons: number;
  date_recorded: string;
}

export const TAMIL_NADU_MANDI_PRICES: MandiPriceItem[] = [
  {
    id: "mkt-paddy-thanjavur",
    market_name: "Thanjavur Regulated Market",
    market_name_ta: "தஞ்சாவூர் ஒழுங்குமுறை விற்பனைக்கூடம்",
    district: "Thanjavur",
    district_ta: "தஞ்சாவூர்",
    commodity: "Paddy (Common / ADT 43 / CR 1009)",
    commodity_ta: "நெல் (சாதாரண / ADT 43 / CR 1009)",
    variety: "Medium Slender / Samba",
    min_price_quintal: 2280,
    max_price_quintal: 2450,
    modal_price_quintal: 2360,
    price_per_kg: 23.60,
    daily_trend: "+1.8%",
    arrival_quantity_tons: 245.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-paddy-tiruvarur",
    market_name: "Tiruvarur Regulated Market",
    market_name_ta: "திருவாரூர் ஒழுங்குமுறை விற்பனைக்கூடம்",
    district: "Tiruvarur",
    district_ta: "திருவாரூர்",
    commodity: "Paddy (Kuruvai / CO 51)",
    commodity_ta: "நெல் (குறுவை / CO 51)",
    variety: "Fine Grain",
    min_price_quintal: 2310,
    max_price_quintal: 2500,
    modal_price_quintal: 2420,
    price_per_kg: 24.20,
    daily_trend: "+0.5%",
    arrival_quantity_tons: 180.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-turmeric-erode",
    market_name: "Erode Turmeric Market Complex (Semmampalayam)",
    market_name_ta: "ஈரோடு மஞ்சள் சந்தை வளாகம் (செம்மாம்பாளையம்)",
    district: "Erode",
    district_ta: "ஈரோடு",
    commodity: "Turmeric (Erode Finger / GI Tag)",
    commodity_ta: "மஞ்சள் (ஈரோடு விரலி மஞ்சள் / GI குறியீடு)",
    variety: "Finger High Curcumin",
    min_price_quintal: 14200,
    max_price_quintal: 17800,
    modal_price_quintal: 16400,
    price_per_kg: 164.00,
    daily_trend: "+3.2%",
    arrival_quantity_tons: 95.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-cotton-coimbatore",
    market_name: "Coimbatore Regulated Cotton Market (Kinathukadavu)",
    market_name_ta: "கோயம்புத்தூர் பருத்தி ஒழுங்குமுறை விற்பனைக்கூடம்",
    district: "Coimbatore",
    district_ta: "கோயம்புத்தூர்",
    commodity: "Cotton (MCU-5 / Medium Staple)",
    commodity_ta: "பருத்தி (MCU-5 / நடுத்தர இழை)",
    variety: "MCU-5 Seed Cotton",
    min_price_quintal: 7200,
    max_price_quintal: 8150,
    modal_price_quintal: 7850,
    price_per_kg: 78.50,
    daily_trend: "+1.2%",
    arrival_quantity_tons: 62.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-banana-trichy",
    market_name: "Tiruchirappalli Grand Banana Terminal (Thiruvanaikoil)",
    market_name_ta: "திருச்சிராப்பள்ளி வாழை மொத்த விற்பனை மையம்",
    district: "Tiruchirappalli",
    district_ta: "திருச்சிராப்பள்ளி",
    commodity: "Banana (Poovan / Grand Naine)",
    commodity_ta: "வாழை (பூவன் / கிராண்ட் நைன்)",
    variety: "Table & Processing Grade",
    min_price_quintal: 2800,
    max_price_quintal: 3600,
    modal_price_quintal: 3250,
    price_per_kg: 32.50,
    daily_trend: "-0.8%",
    arrival_quantity_tons: 140.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-shallots-perambalur",
    market_name: "Perambalur Small Onion Market",
    market_name_ta: "பெரம்பலூர் சின்ன வெங்காய சந்தை",
    district: "Perambalur",
    district_ta: "பெரம்பலூர்",
    commodity: "Small Onion / Shallots (Sambar Onion)",
    commodity_ta: "சின்ன வெங்காயம் (சாம்பார் வெங்காயம்)",
    variety: "CO 4 / Local Red",
    min_price_quintal: 4800,
    max_price_quintal: 6200,
    modal_price_quintal: 5600,
    price_per_kg: 56.00,
    daily_trend: "+4.5%",
    arrival_quantity_tons: 88.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-chilli-ramnad",
    market_name: "Ramanathapuram Mundu Chilli Market (Kamuthi)",
    market_name_ta: "ராமநாதபுரம் முண்டு மிளகாய் சந்தை (கமுதி)",
    district: "Ramanathapuram",
    district_ta: "ராமநாதபுரம்",
    commodity: "Dry Chilli (Ramnad Mundu / GI Tag)",
    commodity_ta: "வத்தல் மிளகாய் (ராம்நாட் முண்டு / GI குறியீடு)",
    variety: "Round Export Grade",
    min_price_quintal: 21500,
    max_price_quintal: 25000,
    modal_price_quintal: 23800,
    price_per_kg: 238.00,
    daily_trend: "+2.0%",
    arrival_quantity_tons: 45.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-groundnut-tiruvannamalai",
    market_name: "Tiruvannamalai Regulated Oilseeds Market",
    market_name_ta: "திருவண்ணாமலை ஒழுங்குமுறை எண்ணெய் வித்து சந்தை",
    district: "Tiruvannamalai",
    district_ta: "திருவண்ணாமலை",
    commodity: "Groundnut (Pod / TMV 7)",
    commodity_ta: "மணிலா / நிலக்கடலை (TMV 7)",
    variety: "Pod Podded Oilseed",
    min_price_quintal: 6400,
    max_price_quintal: 7350,
    modal_price_quintal: 6900,
    price_per_kg: 69.00,
    daily_trend: "-1.0%",
    arrival_quantity_tons: 110.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-tomato-dindigul",
    market_name: "Oddanchatram Vegetable Wholesale Market",
    market_name_ta: "ஒட்டன்சத்திரம் காய்கறி மொத்த சந்தை",
    district: "Dindigul",
    district_ta: "திண்டுக்கல்",
    commodity: "Tomato (Hybrid Local)",
    commodity_ta: "தக்காளி (வீரிய ஒட்டு ரகம்)",
    variety: "Firm Red Grade A",
    min_price_quintal: 1800,
    max_price_quintal: 2600,
    modal_price_quintal: 2200,
    price_per_kg: 22.00,
    daily_trend: "-2.4%",
    arrival_quantity_tons: 320.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-ragi-dharmapuri",
    market_name: "Dharmapuri Regulated Millets Market",
    market_name_ta: "தர்மபுரி சிறுதானிய ஒழுங்குமுறை விற்பனைக்கூடம்",
    district: "Dharmapuri",
    district_ta: "தர்மபுரி",
    commodity: "Finger Millet / Ragi (GPU 28)",
    commodity_ta: "கேழ்வரகு / ராகி (GPU 28)",
    variety: "Dryland Brown Grain",
    min_price_quintal: 3400,
    max_price_quintal: 4100,
    modal_price_quintal: 3850,
    price_per_kg: 38.50,
    daily_trend: "+0.8%",
    arrival_quantity_tons: 55.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-coconut-pollachi",
    market_name: "Pollachi Coconut Market Complex",
    market_name_ta: "பொள்ளாச்சி தேங்காய் மொத்த சந்தை",
    district: "Coimbatore",
    district_ta: "கோயம்புத்தூர்",
    commodity: "Mature Coconut / Copra",
    commodity_ta: "முற்றிய தேங்காய் / கொப்பரை",
    variety: "West Coast Tall Grade",
    min_price_quintal: 11200,
    max_price_quintal: 13400,
    modal_price_quintal: 12500,
    price_per_kg: 125.00,
    daily_trend: "+1.5%",
    arrival_quantity_tons: 210.0,
    date_recorded: "2026-11-24"
  },
  {
    id: "mkt-tea-nilgiris",
    market_name: "Coonoor Tea Trade Auction Centre",
    market_name_ta: "குன்னூர் தேயிலை வர்த்தக ஏல மையம்",
    district: "Nilgiris",
    district_ta: "நீலகிரி",
    commodity: "Tea (Nilgiri Orthodox / CTC Leaf)",
    commodity_ta: "தேயிலை (நீலகிரி ஆர்த்தடாக்ஸ் தூள்)",
    variety: "Orthodox Orange Pekoe",
    min_price_quintal: 18500,
    max_price_quintal: 28000,
    modal_price_quintal: 23500,
    price_per_kg: 235.00,
    daily_trend: "+2.1%",
    arrival_quantity_tons: 75.0,
    date_recorded: "2026-11-24"
  }
];
