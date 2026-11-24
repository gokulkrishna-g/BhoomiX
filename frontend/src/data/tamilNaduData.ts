// BhoomiX - Complete Tamil Nadu 38-District Agricultural Dataset & Agro-Climatic Zones
// Sourced from Department of Agriculture & Farmers Welfare, Govt of Tamil Nadu & TNAU

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

export const AGRO_CLIMATIC_ZONES: Record<string, AgroClimaticZone> = {
  "Cauvery Delta Zone": {
    name: "Cauvery Delta Zone",
    tamil: "காவிரி டெல்டா மண்டலம்",
    color: "#10b981", // Emerald
    districts: [
      "Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai",
      "Cuddalore", "Tiruchirappalli", "Pudukkottai", "Ariyalur", "Perambalur"
    ],
    rainfall_annual_mm: 950,
    primary_crops: "Paddy, Blackgram, Greengram, Sugarcane, Banana",
    characteristics: "Fertile alluvial plains fed by the Grand Anicut (Kallanai), Cauvery, and Kollidam canal networks."
  },
  "North Eastern Zone": {
    name: "North Eastern Zone",
    tamil: "வடகிழக்கு மண்டலம்",
    color: "#3b82f6", // Blue
    districts: [
      "Kanchipuram", "Chengalpattu", "Tiruvallur", "Vellore",
      "Ranipet", "Tirupathur", "Tiruvannamalai", "Viluppuram", "Kallakurichi", "Chennai"
    ],
    rainfall_annual_mm: 1105,
    primary_crops: "Paddy, Groundnut, Sugarcane, Millets, Watermelon",
    characteristics: "Dominated by cascading tanks (Eris) and Palar/Pennaiyar river basins; high Northeast monsoon rainfall."
  },
  "Western Zone": {
    name: "Western Zone",
    tamil: "மேற்கு மண்டலம்",
    color: "#f59e0b", // Amber
    districts: ["Coimbatore", "Tiruppur", "Erode", "Karur"],
    rainfall_annual_mm: 718,
    primary_crops: "Cotton, Turmeric, Maize, Sugarcane, Coconut, Tomato",
    characteristics: "Semi-arid plateaus with advanced micro-irrigation and intensive commercial agriculture (Erode Turmeric, Coimbatore Cotton)."
  },
  "North Western Zone": {
    name: "North Western Zone",
    tamil: "வடமேற்கு மண்டலம்",
    color: "#8b5cf6", // Purple
    districts: ["Dharmapuri", "Krishnagiri", "Salem", "Namakkal"],
    rainfall_annual_mm: 875,
    primary_crops: "Ragi (Finger Millet), Mango, Tomato, Tapioca, Coffee",
    characteristics: "Highland drylands and hilly terrain; leading mango, tapioca/sago, and ragi belt of Tamil Nadu."
  },
  "Southern Zone": {
    name: "Southern Zone",
    tamil: "தெற்கு மண்டலம்",
    color: "#ef4444", // Red
    districts: [
      "Madurai", "Dindigul", "Sivaganga", "Ramanathapuram",
      "Virudhunagar", "Tirunelveli", "Tenkasi", "Thoothukudi", "Theni"
    ],
    rainfall_annual_mm: 857,
    primary_crops: "Cotton, Chillies, Millets, Pulses, Jasmine, Grapes",
    characteristics: "Semi-arid Karisal (black soil) tract and Vaigai/Thamirabarani river basins (Madurai Malli, Ramnad Mundu Chilli)."
  },
  "High Rainfall Zone": {
    name: "High Rainfall Zone",
    tamil: "அதிக மழைப்பொழிவு மண்டலம்",
    color: "#06b6d4", // Cyan
    districts: ["Kanyakumari"],
    rainfall_annual_mm: 1450,
    primary_crops: "Rubber, Coconut, Banana (Matti), Spices, Paddy",
    characteristics: "Receives both SW and NE monsoons (~1450 mm), GI-tagged Matti Banana, spices, and prime rubber plantations."
  },
  "Hilly and High Altitude Zone": {
    name: "Hilly and High Altitude Zone",
    tamil: "மலை மற்றும் உயர் மண்டலம்",
    color: "#15803d", // Deep Green
    districts: ["Nilgiris"],
    rainfall_annual_mm: 1600,
    primary_crops: "Tea, Coffee, Hill Vegetables (Carrot, Potato), Spices",
    characteristics: "High-altitude mountainous terrain (up to 2500m) with temperate horticulture and world-renowned Nilgiri Orthodox Tea."
  }
};

export const TAMIL_NADU_DISTRICTS: Record<string, DistrictAgriData> = {
  "Ariyalur": {
    id: "ariyalur",
    name: "Ariyalur",
    tamil_name: "அரியலூர்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 11.1401,
    lon: 79.0786,
    cultivable_area_ha: 115000,
    major_crops: ["Paddy", "Sugarcane", "Cashew", "Cotton", "Maize"],
    soil_types: ["Red loam", "Black cotton soil", "Clayey loam"],
    irrigation_sources: ["Borewells", "Tanks", "Canal tributaries"],
    annual_rainfall_mm: 954,
    characteristics: "Major cashew and cement-limestone belt with rainfed maize and cotton in upland tracts."
  },
  "Chengalpattu": {
    id: "chengalpattu",
    name: "Chengalpattu",
    tamil_name: "செங்கல்பட்டு",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.6819,
    lon: 79.9836,
    cultivable_area_ha: 98000,
    major_crops: ["Paddy", "Groundnut", "Watermelon", "Pulses", "Vegetables"],
    soil_types: ["Coastal alluvium", "Red sandy loam"],
    irrigation_sources: ["Palaiyar River basin", "Eris (Tanks)", "Wells"],
    annual_rainfall_mm: 1130,
    characteristics: "Intensive peri-urban horticulture and tank-irrigated paddy cultivation."
  },
  "Chennai": {
    id: "chennai",
    name: "Chennai",
    tamil_name: "சென்னை",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 13.0827,
    lon: 80.2707,
    cultivable_area_ha: 450,
    major_crops: ["Urban Horticulture", "Rooftop Vegetables", "Hydroponics"],
    soil_types: ["Coastal sand", "Alluvium"],
    irrigation_sources: ["Municipal recycled water", "Groundwater"],
    annual_rainfall_mm: 1300,
    characteristics: "Metropolitan district with focus on vertical farming, micro-greens, and terminal agro-markets (Koyambedu)."
  },
  "Coimbatore": {
    id: "coimbatore",
    name: "Coimbatore",
    tamil_name: "கோயம்புத்தூர்",
    zone: "Western Zone",
    zone_tamil: "மேற்கு மண்டலம்",
    lat: 11.0168,
    lon: 76.9558,
    cultivable_area_ha: 178000,
    major_crops: ["Cotton", "Maize", "Coconut", "Tomato", "Sorghum", "Banana"],
    soil_types: ["Black cotton soil (Regur)", "Red loam"],
    irrigation_sources: ["Parambikulam Aliyar Project", "Bhavani canals", "Borewells"],
    annual_rainfall_mm: 657,
    characteristics: "Textile agro-hub, headquarters of Tamil Nadu Agricultural University (TNAU), precision drip-fertigated cash crops."
  },
  "Cuddalore": {
    id: "cuddalore",
    name: "Cuddalore",
    tamil_name: "கடலூர்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 11.7480,
    lon: 79.7714,
    cultivable_area_ha: 218000,
    major_crops: ["Paddy", "Sugarcane", "Cashew", "Tapioca", "Groundnut"],
    soil_types: ["Coastal alluvium", "Red lateritic loam", "Clay loam"],
    irrigation_sources: ["Veeranam Tank", "Gadilam River", "Pennaiyar", "Borewells"],
    annual_rainfall_mm: 1210,
    characteristics: "Panruti cashew and jackfruit capital with intensive sugarcane supplying multi-district sugar mills."
  },
  "Dharmapuri": {
    id: "dharmapuri",
    name: "Dharmapuri",
    tamil_name: "தர்மபுரி",
    zone: "North Western Zone",
    zone_tamil: "வடமேற்கு மண்டலம்",
    lat: 12.1211,
    lon: 78.1582,
    cultivable_area_ha: 165000,
    major_crops: ["Finger Millet (Ragi)", "Mango", "Tomato", "Tapioca", "Sugarcane"],
    soil_types: ["Red sandy loam", "Lateritic gravelly soil"],
    irrigation_sources: ["Vaniyar Dam", "Nagavathi Dam", "Rainfed tanks", "Borewells"],
    annual_rainfall_mm: 895,
    characteristics: "Foremost producer of ragi and horticultural mango in Tamil Nadu with major vegetable trade links to Bengaluru."
  },
  "Dindigul": {
    id: "dindigul",
    name: "Dindigul",
    tamil_name: "திண்டுக்கல்",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 10.3673,
    lon: 77.9803,
    cultivable_area_ha: 192000,
    major_crops: ["Vegetables", "Flowers (Jasmine)", "Cotton", "Maize", "Kodaikanal Garlic"],
    soil_types: ["Red loam", "Hill soil (Kodaikanal)", "Black soil"],
    irrigation_sources: ["Palar-Porandalar Dam", "Kamarajar Dam", "Wells"],
    annual_rainfall_mm: 812,
    characteristics: "Famous for GI-tagged Kodaikanal Hill Garlic, Oddanchatram commercial vegetable mandi, and floriculture."
  },
  "Erode": {
    id: "erode",
    name: "Erode",
    tamil_name: "ஈரோடு",
    zone: "Western Zone",
    zone_tamil: "மேற்கு மண்டலம்",
    lat: 11.3410,
    lon: 77.7172,
    cultivable_area_ha: 182000,
    major_crops: ["Turmeric", "Sugarcane", "Paddy", "Banana", "Tapioca"],
    soil_types: ["Red gravelly loam", "Alluvial river basin"],
    irrigation_sources: ["Bhavanisagar Dam", "Kalingarayan Canal", "Lower Bhavani Project"],
    annual_rainfall_mm: 700,
    characteristics: "'Yellow City' of India, world-renowned for GI-tagged Erode Turmeric and ancient Kalingarayan irrigation network."
  },
  "Kallakurichi": {
    id: "kallakurichi",
    name: "Kallakurichi",
    tamil_name: "கள்ளக்குறிச்சி",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 11.7384,
    lon: 78.9639,
    cultivable_area_ha: 172000,
    major_crops: ["Paddy", "Sugarcane", "Maize", "Blackgram", "Groundnut"],
    soil_types: ["Red loam", "Black soil", "Alluvial"],
    irrigation_sources: ["Gomukhi Dam", "Manimuktha Dam", "Borewells"],
    annual_rainfall_mm: 1040,
    characteristics: "'Sugar City' of northern Tamil Nadu, with Kalrayan hills agro-forestry and intensive grain-pulses cropping."
  },
  "Kanchipuram": {
    id: "kanchipuram",
    name: "Kanchipuram",
    tamil_name: "காஞ்சிபுரம்",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.8342,
    lon: 79.7036,
    cultivable_area_ha: 110000,
    major_crops: ["Paddy", "Groundnut", "Sugarcane", "Watermelon"],
    soil_types: ["Red loam", "Clayey alluvium"],
    irrigation_sources: ["Palaiyar River basin", "System Eris (Tanks)", "Borewells"],
    annual_rainfall_mm: 1180,
    characteristics: "Historically famous 'District of Thousand Tanks' with high-yielding paddy varieties like ADT 43 and CR 1009."
  },
  "Kanyakumari": {
    id: "kanyakumari",
    name: "Kanyakumari",
    tamil_name: "கன்னியாகுமரி",
    zone: "High Rainfall Zone",
    zone_tamil: "அதிக மழைப்பொழிவு மண்டலம்",
    lat: 8.0883,
    lon: 77.5385,
    cultivable_area_ha: 78000,
    major_crops: ["Rubber", "Coconut", "Banana (Matti)", "Paddy", "Cloves"],
    soil_types: ["Deep red lateritic soil", "Coastal alluvium"],
    irrigation_sources: ["Pechiparai Dam", "Perunchani Dam", "Bimonsoon rains"],
    annual_rainfall_mm: 1450,
    characteristics: "Receives both SW and NE monsoons (~1450 mm), GI-tagged Matti Banana, spices, and prime rubber plantations."
  },
  "Karur": {
    id: "karur",
    name: "Karur",
    tamil_name: "கரூர்",
    zone: "Western Zone",
    zone_tamil: "மேற்கு மண்டலம்",
    lat: 10.9601,
    lon: 78.0766,
    cultivable_area_ha: 125000,
    major_crops: ["Sugarcane", "Paddy", "Banana", "Moringa", "Sorghum"],
    soil_types: ["Red loam", "Alluvial delta fringe"],
    irrigation_sources: ["Cauvery River channels", "Amaravathi basin", "Borewells"],
    annual_rainfall_mm: 640,
    characteristics: "Confluence of Cauvery and Amaravathi rivers; major moringa (drumstick) export corridor."
  },
  "Krishnagiri": {
    id: "krishnagiri",
    name: "Krishnagiri",
    tamil_name: "கிருஷ்ணகிரி",
    zone: "North Western Zone",
    zone_tamil: "வடமேற்கு மண்டலம்",
    lat: 12.5186,
    lon: 78.2137,
    cultivable_area_ha: 185000,
    major_crops: ["Mango", "Ragi", "Rose Flowers (Hosur)", "Tomato", "Paddy"],
    soil_types: ["Red sandy loam", "Laterite soil"],
    irrigation_sources: ["Krishnagiri Reservoir Project (KRP)", "Thenpennai River"],
    annual_rainfall_mm: 840,
    characteristics: "The Mango capital of India and Hosur hi-tech greenhouse floriculture hub exporting Dutch roses globally."
  },
  "Madurai": {
    id: "madurai",
    name: "Madurai",
    tamil_name: "மதுரை",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 9.9252,
    lon: 78.1198,
    cultivable_area_ha: 145000,
    major_crops: ["Paddy", "Jasmine (Madurai Malli)", "Millets", "Cotton", "Pulses"],
    soil_types: ["Deep red loam", "Black cotton soil"],
    irrigation_sources: ["Periyar-Vaigai Canal System", "Tanks", "Borewells"],
    annual_rainfall_mm: 840,
    characteristics: "Home to the world-famous GI-tagged 'Madurai Malli' jasmine and extensive double-crop Vaigai paddy basin."
  },
  "Mayiladuthurai": {
    id: "mayiladuthurai",
    name: "Mayiladuthurai",
    tamil_name: "மயிலாடுதுறை",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 11.1075,
    lon: 79.6524,
    cultivable_area_ha: 94000,
    major_crops: ["Paddy (Kuruvai / Samba)", "Blackgram", "Cotton", "Greengram"],
    soil_types: ["Heavy alluvial clay", "Delta river silt"],
    irrigation_sources: ["Cauvery distributaries", "Kollidam (Coleroon) River"],
    annual_rainfall_mm: 1180,
    characteristics: "Heartland of the Cauvery delta rice bowl with intensive rice-fallow pulse cropping system."
  },
  "Nagapattinam": {
    id: "nagapattinam",
    name: "Nagapattinam",
    tamil_name: "நாகப்பட்டினம்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 10.7672,
    lon: 79.8449,
    cultivable_area_ha: 86000,
    major_crops: ["Paddy", "Groundnut", "Pulses", "Coconut"],
    soil_types: ["Coastal delta alluvium", "Saline coastal sands"],
    irrigation_sources: ["Vennar basin", "Cauvery tail-end channels"],
    annual_rainfall_mm: 1340,
    characteristics: "Coastal tail-end Cauvery delta with specialized flood-tolerant and coastal saline-tolerant rice varieties."
  },
  "Namakkal": {
    id: "namakkal",
    name: "Namakkal",
    tamil_name: "நாமக்கல்",
    zone: "North Western Zone",
    zone_tamil: "வடமேற்கு மண்டலம்",
    lat: 11.2189,
    lon: 78.1674,
    cultivable_area_ha: 138000,
    major_crops: ["Tapioca", "Maize", "Groundnut", "Paddy", "Turmeric"],
    soil_types: ["Red loam", "Gravelly clay"],
    irrigation_sources: ["Cauvery channels (Jedarpalayam)", "Deep borewells"],
    annual_rainfall_mm: 780,
    characteristics: "'Poultry & Egg Capital' of India, leading sago/tapioca starch processing and Kolli Hills organic pepper."
  },
  "Nilgiris": {
    id: "nilgiris",
    name: "Nilgiris",
    tamil_name: "நீலகிரி",
    zone: "Hilly and High Altitude Zone",
    zone_tamil: "மலை மற்றும் உயர் மண்டலம்",
    lat: 11.4102,
    lon: 76.6950,
    cultivable_area_ha: 58000,
    major_crops: ["Tea", "Coffee", "Potato", "Carrot", "Cabbage", "Spices"],
    soil_types: ["Lateritic mountain soil", "Humus-rich forest loam"],
    irrigation_sources: ["High mountain precipitation", "Springs", "Micro-sprinklers"],
    annual_rainfall_mm: 1600,
    characteristics: "GI-tagged Nilgiri Orthodox Tea, temperate European vegetables, and terraced agro-ecosystems at 2000m altitude."
  },
  "Perambalur": {
    id: "perambalur",
    name: "Perambalur",
    tamil_name: "பெரம்பலூர்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 11.2342,
    lon: 78.8820,
    cultivable_area_ha: 102000,
    major_crops: ["Small Onion (Shallots)", "Cotton", "Maize", "Sugarcane"],
    soil_types: ["Black cotton soil", "Red sandy loam"],
    irrigation_sources: ["Rainfed check dams", "Deep open wells", "Borewells"],
    annual_rainfall_mm: 910,
    characteristics: "'Onion Bowl of Tamil Nadu', cultivating over 70% of the state's traditional sambar small onions."
  },
  "Pudukkottai": {
    id: "pudukkottai",
    name: "Pudukkottai",
    tamil_name: "புதுக்கோட்டை",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 10.3797,
    lon: 78.8208,
    cultivable_area_ha: 154000,
    major_crops: ["Paddy", "Groundnut", "Cashew", "Millets", "Coconut"],
    soil_types: ["Red laterite loam", "Sandy clay"],
    irrigation_sources: ["Vellar basin", "Cascade tanks (Ooranis)", "Borewells"],
    annual_rainfall_mm: 920,
    characteristics: "Ancient heritage of tank cascades with thriving dryland groundnut and coastal coconut plantations."
  },
  "Ramanathapuram": {
    id: "ramanathapuram",
    name: "Ramanathapuram",
    tamil_name: "ராமநாதபுரம்",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 9.3639,
    lon: 78.8395,
    cultivable_area_ha: 168000,
    major_crops: ["Paddy (Direct-seeded)", "Mundu Chilli", "Cotton", "Pulses", "Coconut"],
    soil_types: ["Coastal alluvium", "Saline clay", "Black cotton soil"],
    irrigation_sources: ["Vaigai tail-end", "Gundar basin", "System tanks"],
    annual_rainfall_mm: 825,
    characteristics: "Home to the world-famous GI-tagged 'Ramnad Mundu Chilli' and resilient direct-seeded dryland rice farming."
  },
  "Ranipet": {
    id: "ranipet",
    name: "Ranipet",
    tamil_name: "ராணிப்பேட்டை",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.9224,
    lon: 79.3328,
    cultivable_area_ha: 92000,
    major_crops: ["Paddy", "Sugarcane", "Groundnut", "Banana", "Vegetables"],
    soil_types: ["Red loam", "Alluvial river clay"],
    irrigation_sources: ["Palar anicut canals", "Tanks", "Borewells"],
    annual_rainfall_mm: 1060,
    characteristics: "Thriving Palar river basin agro-tract cultivating certified organic rice and sugarcane."
  },
  "Salem": {
    id: "salem",
    name: "Salem",
    tamil_name: "சேலம்",
    zone: "North Western Zone",
    zone_tamil: "வடமேற்கு மண்டலம்",
    lat: 11.6643,
    lon: 78.1460,
    cultivable_area_ha: 196000,
    major_crops: ["Mango (Malgoa/Salem)", "Tapioca", "Coffee (Yercaud)", "Paddy", "Cotton"],
    soil_types: ["Red loam", "Lateritic gravel", "Black soil"],
    irrigation_sources: ["Mettur Dam canals", "Stanley Reservoir", "Borewells"],
    annual_rainfall_mm: 980,
    characteristics: "Famous for Salem Mangoes, Shevaroy hills coffee plantations, and extensive tapioca/sago processing mills."
  },
  "Sivaganga": {
    id: "sivaganga",
    name: "Sivaganga",
    tamil_name: "சிவகங்கை",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 9.8433,
    lon: 78.4809,
    cultivable_area_ha: 132000,
    major_crops: ["Paddy", "Groundnut", "Sugarcane", "Millets", "Pulses"],
    soil_types: ["Red sandy loam", "Laterite clay"],
    irrigation_sources: ["Vaigai canals", "Large irrigation tanks (Kanmois)"],
    annual_rainfall_mm: 890,
    characteristics: "Vast system of ancient irrigation tanks (Kanmois) supporting resilient local red paddy varieties."
  },
  "Tenkasi": {
    id: "tenkasi",
    name: "Tenkasi",
    tamil_name: "தென்காசி",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 8.9593,
    lon: 77.3150,
    cultivable_area_ha: 118000,
    major_crops: ["Paddy", "Banana", "Coconut", "Pepper", "Sugarcane", "Spices"],
    soil_types: ["Rich alluvial foothills loam", "Red loam"],
    irrigation_sources: ["Chittar River", "Manimuthar channels", "Mountain streams"],
    annual_rainfall_mm: 1020,
    characteristics: "Western Ghats foothill micro-climate blessed with the Courtallam southwest monsoon drizzle (Saaral)."
  },
  "Thanjavur": {
    id: "thanjavur",
    name: "Thanjavur",
    tamil_name: "தஞ்சாவூர்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 10.7870,
    lon: 79.1378,
    cultivable_area_ha: 268000,
    major_crops: ["Paddy (Kuruvai, Samba, Thaladi)", "Blackgram", "Coconut", "Banana", "Sugarcane"],
    soil_types: ["Deep fertile delta alluvium", "Clay loam"],
    irrigation_sources: ["Grand Anicut (Kallanai)", "Cauvery & Vennar Canal Network", "Filter points"],
    annual_rainfall_mm: 1010,
    characteristics: "'Rice Bowl of Tamil Nadu', heart of the ancient Chola irrigation marvel Kallanai; highest paddy production in the state."
  },
  "Theni": {
    id: "theni",
    name: "Theni",
    tamil_name: "தேனி",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 10.0104,
    lon: 77.4768,
    cultivable_area_ha: 112000,
    major_crops: ["Cardamom", "Coffee", "Grapes (Cumbum Valley)", "Banana", "Paddy", "Silk (Sericulture)"],
    soil_types: ["Rich black loam", "Laterite hill valley soil"],
    irrigation_sources: ["Mullaperiyar Dam canals", "Vaigai Dam", "Suruliyar River"],
    annual_rainfall_mm: 830,
    characteristics: "Cumbum Valley yields year-round harvests of GI-tagged Panneer Thratchai grapes and cardamom hills."
  },
  "Thoothukudi": {
    id: "thoothukudi",
    name: "Thoothukudi",
    tamil_name: "தூத்துக்குடி",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 8.7642,
    lon: 78.1348,
    cultivable_area_ha: 175000,
    major_crops: ["Cotton", "Chillies", "Blackgram", "Banana", "Paddy", "Salt Pan Agriculture"],
    soil_types: ["Deep black cotton soil (Karisal)", "Coastal sand"],
    irrigation_sources: ["Thamirabarani River delta", "Borewells"],
    annual_rainfall_mm: 660,
    characteristics: "Celebrated for Karisal black soil pulses, direct Thamirabarani river delta banana plantations, and palmyrah agro-products."
  },
  "Tiruchirappalli": {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    tamil_name: "திருச்சிராப்பள்ளி",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 10.7905,
    lon: 78.7047,
    cultivable_area_ha: 195000,
    major_crops: ["Paddy", "Banana", "Sugarcane", "Onion", "Cotton"],
    soil_types: ["Alluvial river basin", "Red loam"],
    irrigation_sources: ["Cauvery & Kollidam rivers", "Uyyakondan Canal", "Pannaiyar"],
    annual_rainfall_mm: 820,
    characteristics: "National Research Centre for Banana (NRCB), central logistical gateway for delta and western agro-produce."
  },
  "Tirunelveli": {
    id: "tirunelveli",
    name: "Tirunelveli",
    tamil_name: "திருநெல்வேலி",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 8.7139,
    lon: 77.7567,
    cultivable_area_ha: 156000,
    major_crops: ["Paddy", "Banana", "Pulses", "Coconut", "Cotton"],
    soil_types: ["Thamirabarani alluvial loam", "Deep black cotton soil"],
    irrigation_sources: ["Thamirabarani River canal network", "Manimuthar Dam", "Papanasam Dam"],
    annual_rainfall_mm: 880,
    characteristics: "Perennial Thamirabarani river basin yielding premier organic aromatic and traditional rice varieties."
  },
  "Tirupathur": {
    id: "tirupathur",
    name: "Tirupathur",
    tamil_name: "திருப்பத்தூர்",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.4965,
    lon: 78.5736,
    cultivable_area_ha: 88000,
    major_crops: ["Paddy", "Groundnut", "Sugarcane", "Tomato", "Mango"],
    soil_types: ["Red gravelly loam", "Sandy loam"],
    irrigation_sources: ["Javadhu Hills spring cascades", "Tanks", "Borewells"],
    annual_rainfall_mm: 960,
    characteristics: "Javadhu Hills tribal organic fruit orchards, millets, and Palar river basin groundnut belt."
  },
  "Tiruppur": {
    id: "tiruppur",
    name: "Tiruppur",
    tamil_name: "திருப்பூர்",
    zone: "Western Zone",
    zone_tamil: "மேற்கு மண்டலம்",
    lat: 11.1085,
    lon: 77.3411,
    cultivable_area_ha: 162000,
    major_crops: ["Maize", "Cotton", "Coconut", "Groundnut", "Sunflower"],
    soil_types: ["Black cotton soil", "Red sandy loam"],
    irrigation_sources: ["Amaravathi Dam", "PAP Project", "Borewells"],
    annual_rainfall_mm: 615,
    characteristics: "High solar insolation, major maize and oilseeds production with integrated poultry and dairy feed networks."
  },
  "Tiruvallur": {
    id: "tiruvallur",
    name: "Tiruvallur",
    tamil_name: "திருவள்ளூர்",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 13.1432,
    lon: 79.9083,
    cultivable_area_ha: 135000,
    major_crops: ["Paddy", "Sugarcane", "Groundnut", "Watermelon", "Mango"],
    soil_types: ["Coastal alluvium", "Red sandy loam"],
    irrigation_sources: ["Poondi Reservoir", "Kosasthalaiyar River", "Araniyar basin"],
    annual_rainfall_mm: 1150,
    characteristics: "Prime grain and vegetable supplier to the Chennai metropolis with intensive groundwater drip automation."
  },
  "Tiruvannamalai": {
    id: "tiruvannamalai",
    name: "Tiruvannamalai",
    tamil_name: "திருவண்ணாமலை",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.2253,
    lon: 79.0747,
    cultivable_area_ha: 235000,
    major_crops: ["Groundnut", "Paddy", "Sugarcane", "Millets (Samai, Varagu)"],
    soil_types: ["Red sandy loam", "Lateritic gravelly soil"],
    irrigation_sources: ["Sathanur Dam", "Thenpennaiyar River", "Cascade tanks"],
    annual_rainfall_mm: 1070,
    characteristics: "Premier Groundnut hub of Tamil Nadu; extensive millets cultivation and Sathanur Dam command area."
  },
  "Tiruvarur": {
    id: "tiruvarur",
    name: "Tiruvarur",
    tamil_name: "திருவாரூர்",
    zone: "Cauvery Delta Zone",
    zone_tamil: "காவிரி டெல்டா மண்டலம்",
    lat: 10.7725,
    lon: 79.6365,
    cultivable_area_ha: 164000,
    major_crops: ["Paddy (Kuruvai / Samba / Thaladi)", "Blackgram", "Greengram", "Cotton"],
    soil_types: ["Deep fertile delta clay", "River alluvium"],
    irrigation_sources: ["Vennar, Vettar, Pamaniyar distributary canals"],
    annual_rainfall_mm: 1260,
    characteristics: "Dense river canal delta, traditional epicenter of intensive paddy cultivation with zero-till relay pulses."
  },
  "Vellore": {
    id: "vellore",
    name: "Vellore",
    tamil_name: "வேலூர்",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 12.9165,
    lon: 79.1325,
    cultivable_area_ha: 75000,
    major_crops: ["Spiny Brinjal (GI-Vellore)", "Paddy", "Groundnut", "Sugarcane", "Banana"],
    soil_types: ["Red loam", "Sandy clay"],
    irrigation_sources: ["Palar River basin", "Otteri Lake", "Borewells"],
    annual_rainfall_mm: 1020,
    characteristics: "GI-tagged Vellore Spiny Brinjal (முள்ளுக் கத்தரிக்காய்) and intensive smallholder poly-house horticulture."
  },
  "Viluppuram": {
    id: "viluppuram",
    name: "Viluppuram",
    tamil_name: "விழுப்புரம்",
    zone: "North Eastern Zone",
    zone_tamil: "வடகிழக்கு மண்டலம்",
    lat: 11.9401,
    lon: 79.4861,
    cultivable_area_ha: 245000,
    major_crops: ["Sugarcane", "Paddy", "Groundnut", "Tapioca", "Casuarina"],
    soil_types: ["Red sandy loam", "Black cotton soil", "Alluvium"],
    irrigation_sources: ["Thenpennaiyar River", "Gingee River", "System tanks"],
    annual_rainfall_mm: 1050,
    characteristics: "Top sugarcane producing district in Tamil Nadu, hosting leading cooperative and private sugar mills."
  },
  "Virudhunagar": {
    id: "virudhunagar",
    name: "Virudhunagar",
    tamil_name: "விருதுநகர்",
    zone: "Southern Zone",
    zone_tamil: "தெற்கு மண்டலம்",
    lat: 9.5872,
    lon: 77.9514,
    cultivable_area_ha: 162000,
    major_crops: ["Cotton", "Millets (Maize, Cumbu)", "Chillies", "Blackgram", "Oilseeds"],
    soil_types: ["Deep black cotton soil (Karisal)", "Red loam"],
    irrigation_sources: ["Arjunanadhi basin", "Gundar channels", "Rainfed tanks"],
    annual_rainfall_mm: 790,
    characteristics: "Famous for dryland Karisal agriculture, ginning mills, and high-pungency red chilli export farming."
  }
};

// All 38 District Names Alphabetically
export const TN_DISTRICT_NAMES: string[] = Object.keys(TAMIL_NADU_DISTRICTS).sort();

export function getDistrictColor(districtName: string): string {
  const dist = TAMIL_NADU_DISTRICTS[districtName];
  if (!dist) return "#10b981";
  const zone = AGRO_CLIMATIC_ZONES[dist.zone];
  return zone ? zone.color : "#10b981";
}

// Complete Sub-District Agricultural Areas, Taluks & Revenue Blocks across all 38 Tamil Nadu Districts
export interface DistrictAreaItem {
  name: string;
  tamil_name: string;
  specialty?: string;
  specialty_ta?: string;
  lat?: number;
  lon?: number;
}

export const TN_DISTRICT_AREAS: Record<string, DistrictAreaItem[]> = {
  "Ariyalur": [
    { name: "Ariyalur", tamil_name: "அரியலூர்", specialty: "Limestone Belt & Groundnut", lat: 11.1401, lon: 79.0786 },
    { name: "Udayarpalayam", tamil_name: "உடையார்பாளையம்", specialty: "Cashew Plantation Hub", lat: 11.1852, lon: 79.2941 },
    { name: "Sendurai", tamil_name: "செந்துறை", specialty: "Dryland Cotton & Maize", lat: 11.2667, lon: 79.1667 },
    { name: "Andimadam", tamil_name: "ஆண்டிமடம்", specialty: "Cashew & Sugarcane Fields", lat: 11.3370, lon: 79.3730 }
  ],
  "Chengalpattu": [
    { name: "Chengalpattu", tamil_name: "செங்கல்பட்டு", specialty: "Paddy & Dairy Farming", lat: 12.6819, lon: 79.9836 },
    { name: "Maduranthakam", tamil_name: "மதுராந்தகம்", specialty: "Mega Tank Irrigated Paddy", lat: 12.5083, lon: 79.8833 },
    { name: "Cheyyur", tamil_name: "செய்யூர்", specialty: "Coastal Horticulture & Groundnut", lat: 12.3500, lon: 80.0000 },
    { name: "Tiruporur", tamil_name: "திருப்போரூர்", specialty: "Vegetable Greenhouses", lat: 12.7236, lon: 80.1903 },
    { name: "Tambaram", tamil_name: "தாம்பரம்", specialty: "Urban Agro-Market Hub", lat: 12.9249, lon: 80.1000 },
    { name: "Pallavaram", tamil_name: "பல்லாவரம்", specialty: "Floriculture & Microgreens", lat: 12.9675, lon: 80.1491 },
    { name: "Vandalur", tamil_name: "வண்டலூர்", specialty: "Fruit Orchards & Nurseries", lat: 12.8914, lon: 80.0815 }
  ],
  "Chennai": [
    { name: "Mylapore", tamil_name: "மயிலாப்பூர்", specialty: "Terrace Gardens & Hydroponics", lat: 13.0368, lon: 80.2676 },
    { name: "Tondiarpet", tamil_name: "தண்டையார்பேட்டை", specialty: "Urban Farming & Green Roofs", lat: 13.1250, lon: 80.2917 },
    { name: "Guindy", tamil_name: "கிண்டி", specialty: "Agro-Tech Hub & Research Labs", lat: 13.0067, lon: 80.2025 },
    { name: "Aminjikarai", tamil_name: "அமைந்தகரை", specialty: "Koyambedu Wholesale Terminal", lat: 13.0719, lon: 80.2206 },
    { name: "Velachery", tamil_name: "வேளச்சேரி", specialty: "Urban Compost & Bio-waste Tech", lat: 12.9815, lon: 80.2180 },
    { name: "Sholinganallur", tamil_name: "சோழிங்கநல்லூர்", specialty: "Organic Urban Micro-Farms", lat: 12.9010, lon: 80.2279 }
  ],
  "Coimbatore": [
    { name: "Pollachi", tamil_name: "பொள்ளாச்சி", specialty: "Coconut Capital & Jaggery Market", lat: 10.6609, lon: 77.0089 },
    { name: "Mettupalayam", tamil_name: "மேட்டுப்பாளையம்", specialty: "Banana & Arecanut Mandi", lat: 11.3000, lon: 76.9500 },
    { name: "Sulur", tamil_name: "சூலூர்", specialty: "Cotton & Maize Cultivation", lat: 11.0267, lon: 77.1264 },
    { name: "Annur", tamil_name: "அன்னூர்", specialty: "Vegetables & Drip Irrigated Maize", lat: 11.2333, lon: 77.1833 },
    { name: "Kinathukadavu", tamil_name: "கிணத்துக்கடவு", specialty: "Tomato & Polyhouse Floriculture", lat: 10.8200, lon: 77.0200 },
    { name: "Valparai", tamil_name: "வால்பாறை", specialty: "Hill Tea & Cardamom Plantations", lat: 10.3242, lon: 76.9558 },
    { name: "Madukkarai", tamil_name: "மதுக்கரை", specialty: "Limestone Tract & Millets", lat: 10.9028, lon: 76.9639 },
    { name: "Perur", tamil_name: "பேரூர்", specialty: "Noyyal River Basin Vegetables", lat: 10.9700, lon: 76.9100 }
  ],
  "Cuddalore": [
    { name: "Panruti", tamil_name: "பண்ருட்டி", specialty: "World Famous Cashew & Jackfruit", lat: 11.7700, lon: 79.5500 },
    { name: "Chidambaram", tamil_name: "சிதம்பரம்", specialty: "Cauvery Tail-end Alluvial Paddy", lat: 11.3992, lon: 79.6936 },
    { name: "Vriddhachalam", tamil_name: "விருத்தாசலம்", specialty: "Ceramic Soil, Groundnut & Cashew", lat: 11.5300, lon: 79.3300 },
    { name: "Tittakudi", tamil_name: "திட்டக்குடி", specialty: "Sugarcane & Maize Belt", lat: 11.4167, lon: 78.9833 },
    { name: "Kurinjipadi", tamil_name: "குறிஞ்சிப்பாடி", specialty: "Handloom Weavers & Blackgram", lat: 11.5667, lon: 79.6000 },
    { name: "Bhuvanagiri", tamil_name: "புவனகிரி", specialty: "Vellar River Basin Paddy", lat: 11.4667, lon: 79.6500 },
    { name: "Srimushnam", tamil_name: "ஸ்ரீமுஷ்ணம்", specialty: "Sugarcane & Banana Orchards", lat: 11.3833, lon: 79.4167 },
    { name: "Veppur", tamil_name: "வேப்பூர்", specialty: "Dryland Cotton & Millets", lat: 11.5500, lon: 79.0833 }
  ],
  "Dharmapuri": [
    { name: "Dharmapuri", tamil_name: "தருமபுரி", specialty: "Leading Ragi (Finger Millet) Belt", lat: 12.1211, lon: 78.1582 },
    { name: "Harur", tamil_name: "அரூர்", specialty: "Dryland Pulses, Mangoes & Tapioca", lat: 12.0600, lon: 78.5000 },
    { name: "Palacode", tamil_name: "பாலக்கோடு", specialty: "Tomato Cultivation & Cooperative Sugar Mill", lat: 12.3000, lon: 78.0833 },
    { name: "Pennagaram", tamil_name: "பென்னாகரம்", specialty: "Hogenakkal Basin Fisheries & Millets", lat: 12.1333, lon: 77.9000 },
    { name: "Pappireddipatti", tamil_name: "பாப்பிரெட்டிப்பட்டி", specialty: "Shevaroy Foothills Mango & Coffee", lat: 11.9167, lon: 78.3667 },
    { name: "Karimangalam", tamil_name: "காரிமங்கலம்", specialty: "Vegetables & Sericulture (Mulberry)", lat: 12.3040, lon: 78.2040 },
    { name: "Nallampalli", tamil_name: "நல்லம்பள்ளி", specialty: "Red Soil Pulses & Maize", lat: 12.0500, lon: 78.1167 }
  ],
  "Dindigul": [
    { name: "Oddanchatram", tamil_name: "ஒட்டன்சத்திரம்", specialty: "Asia's Largest Vegetable Export Mandi", lat: 10.4800, lon: 77.7500 },
    { name: "Palani", tamil_name: "பழனி", specialty: "Panchamirtham Hill Banana & Sugarcane", lat: 10.4500, lon: 77.5167 },
    { name: "Kodaikanal", tamil_name: "கொடைக்கானல்", specialty: "Hill Garlic (GI), Plum & Pear Orchards", lat: 10.2381, lon: 77.4892 },
    { name: "Nilakkottai", tamil_name: "நிலக்கோட்டை", specialty: "Fragrant Jasmine (Malli) & Floriculture", lat: 10.1667, lon: 77.8667 },
    { name: "Natham", tamil_name: "நத்தம்", specialty: "Karanthamalai Mango & Tamarind", lat: 10.2333, lon: 78.2333 },
    { name: "Vedasandur", tamil_name: "வேடசந்தூர்", specialty: "Tobacco Research & Cotton Ginning", lat: 10.5333, lon: 77.9500 },
    { name: "Attur", tamil_name: "ஆத்தூர்", specialty: "Kamarajar Dam Basin Paddy & Coconut", lat: 10.2833, lon: 77.8500 },
    { name: "Gujiliamparai", tamil_name: "குஜிலியம்பாறை", specialty: "Dryland Sorghum & Blackgram", lat: 10.6667, lon: 78.1167 }
  ],
  "Erode": [
    { name: "Gobichettipalayam", tamil_name: "கோபிசெட்டிபாளையம்", specialty: "Paddy & Silk Cocoon (Sericulture)", lat: 11.4500, lon: 77.4333 },
    { name: "Bhavani", tamil_name: "பவானி", specialty: "Kaveri-Bhavani Confluence Sugarcane", lat: 11.4500, lon: 77.6833 },
    { name: "Sathyamangalam", tamil_name: "சத்தியமங்கலம்", specialty: "Jasmine Flower Mandi & Banana", lat: 11.5000, lon: 77.2333 },
    { name: "Perundurai", tamil_name: "பெருந்துறை", specialty: "Erode Turmeric (GI) Market & Tapioca", lat: 11.2700, lon: 77.5800 },
    { name: "Anthiyur", tamil_name: "அந்தியூர்", specialty: "Groundnut & Cattle Fair Heritage", lat: 11.5833, lon: 77.6000 },
    { name: "Modakkurichi", tamil_name: "மொடக்குறிச்சி", specialty: "Kalingarayan Canal Basin Paddy", lat: 11.2800, lon: 77.7500 },
    { name: "Kodumudi", tamil_name: "கொடுமுடி", specialty: "Kaveri Alluvium Sugarcane & Banana", lat: 11.0833, lon: 77.8833 },
    { name: "Thalavadi", tamil_name: "தாளவாடி", specialty: "Plateau Hill Vegetables & Potato", lat: 11.7833, lon: 76.9833 }
  ],
  "Kallakurichi": [
    { name: "Kallakurichi", tamil_name: "கள்ளக்குறிச்சி", specialty: "Rice Granary & Leading Sugar Mills", lat: 11.7375, lon: 78.9631 },
    { name: "Sankarapuram", tamil_name: "சங்கராபுரம்", specialty: "Manimuktha Basin Sugarcane & Paddy", lat: 11.8833, lon: 78.9167 },
    { name: "Tirukoilur", tamil_name: "திருக்கோவிலூர்", specialty: "Pennaiyar River Paddy & Groundnut", lat: 11.9500, lon: 79.2000 },
    { name: "Ulundurpet", tamil_name: "உளுந்தூர்பேட்டை", specialty: "Blackgram (Ulundu) & Oilseed Hub", lat: 11.6833, lon: 79.2833 },
    { name: "Chinnasalem", tamil_name: "சின்னசேலம்", specialty: "Commercial Modern Rice Mills", lat: 11.6500, lon: 78.8833 },
    { name: "Kalvarayan Hills", tamil_name: "கல்வராயன் மலை", specialty: "Tribal Millets, Honey & Pepper", lat: 11.8333, lon: 78.7500 }
  ],
  "Kanchipuram": [
    { name: "Kanchipuram", tamil_name: "காஞ்சிபுரம்", specialty: "Palar River Basin Paddy & Mulberry", lat: 12.8342, lon: 79.7036 },
    { name: "Sriperumbudur", tamil_name: "ஸ்ரீபெரும்புதூர்", specialty: "Dairy Farming & Agro-Logistics", lat: 12.9667, lon: 79.9500 },
    { name: "Uthiramerur", tamil_name: "உத்திரமேரூர்", specialty: "Historical Tank Irrigation & Paddy", lat: 12.6167, lon: 79.7500 },
    { name: "Walajabad", tamil_name: "வாலாஜாபாத்", specialty: "Paddy Seed Multiplication Centre", lat: 12.8000, lon: 79.8167 },
    { name: "Kundrathur", tamil_name: "குன்றத்தூர்", specialty: "Peri-urban Vegetable Cultivation", lat: 12.9972, lon: 80.0972 }
  ],
  "Kanyakumari": [
    { name: "Agastheeswaram", tamil_name: "அகத்தீஸ்வரம்", specialty: "Dual Monsoon Paddy & Salt Pans", lat: 8.0883, lon: 77.5385 },
    { name: "Thovalai", tamil_name: "தோவாளை", specialty: "State Floriculture Capital (Pitchi Flower)", lat: 8.2333, lon: 77.5167 },
    { name: "Kalkulam", tamil_name: "கல்குளம்", specialty: "Rubber Plantations & Tapioca", lat: 8.2500, lon: 77.3000 },
    { name: "Vilavancode", tamil_name: "விளவங்கோடு", specialty: "Coconut & Clove Spices", lat: 8.3333, lon: 77.1833 },
    { name: "Killiyoor", tamil_name: "கிள்ளியூர்", specialty: "GI-tagged Matti Banana Groves", lat: 8.2833, lon: 77.2167 },
    { name: "Thiruvattar", tamil_name: "திருவட்டார்", specialty: "Kothai River Spices & Rubber", lat: 8.3333, lon: 77.2667 }
  ],
  "Karur": [
    { name: "Karur", tamil_name: "கரூர்", specialty: "Amaravathi Basin Paddy & Pulses", lat: 10.9601, lon: 78.0766 },
    { name: "Kulithalai", tamil_name: "குளித்தலை", specialty: "Cauvery Alluvium Banana & Betelvine", lat: 10.9333, lon: 78.4167 },
    { name: "Aravakurichi", tamil_name: "அரவக்குறிச்சி", specialty: "Moringa (Drumstick) Export Hub", lat: 10.7667, lon: 77.9167 },
    { name: "Pugalur", tamil_name: "புகழூர்", specialty: "EID Parry Sugarcane Command Area", lat: 11.0833, lon: 78.0167 },
    { name: "Krishnarayapuram", tamil_name: "கிருஷ்ணராயபுரம்", specialty: "Mayanur Barrage Paddy & Banana", lat: 10.9500, lon: 78.2833 },
    { name: "Kadavur", tamil_name: "கடவூர்", specialty: "Loris Sanctuary & Dryland Sorghum", lat: 10.6000, lon: 78.2000 }
  ],
  "Krishnagiri": [
    { name: "Hosur", tamil_name: "ஓசூர்", specialty: "Taj Mahal Roses, Capsicum & Floriculture", lat: 12.7409, lon: 77.8253 },
    { name: "Krishnagiri", tamil_name: "கிருஷ்ணகிரி", specialty: "Mango Capital of Tamil Nadu (Alphonso)", lat: 12.5186, lon: 78.2137 },
    { name: "Denkanikottai", tamil_name: "தேன்கனிக்கோட்டை", specialty: "Cold-climate Vegetables & Cut Flowers", lat: 12.5333, lon: 77.7833 },
    { name: "Pochampalli", tamil_name: "போச்சம்பள்ளி", specialty: "Weekly Agro-Market & Ragi Fields", lat: 12.3333, lon: 78.3667 },
    { name: "Uthangarai", tamil_name: "ஊத்தங்கரை", specialty: "South Pennar River Groundnut & Mango", lat: 12.2667, lon: 78.5333 },
    { name: "Bargur", tamil_name: "பர்கூர்", specialty: "Bargur Cattle Breed & Mango Pulp", lat: 12.5500, lon: 78.3667 },
    { name: "Shoolagiri", tamil_name: "சூளகிரி", specialty: "Tomato & Polyhouse Vegetables", lat: 12.6667, lon: 78.0167 },
    { name: "Anchetti", tamil_name: "அஞ்செட்டி", specialty: "Forest Fringe Finger Millet & Pepper", lat: 12.3167, lon: 77.6833 }
  ],
  "Madurai": [
    { name: "Madurai North", tamil_name: "மதுரை வடக்கு", specialty: "GI Madurai Malli (Jasmine) Fields", lat: 9.9252, lon: 78.1198 },
    { name: "Melur", tamil_name: "மேலூர்", specialty: "Periyar Main Canal High-Yield Paddy", lat: 10.0500, lon: 78.3333 },
    { name: "Vadipatti", tamil_name: "வாடிப்பட்டி", specialty: "Banana & Fragrant Flowers", lat: 10.0667, lon: 77.9667 },
    { name: "Usilampatti", tamil_name: "உசிலம்பட்டி", specialty: "58-Village Canal Dryland Pulses", lat: 9.9667, lon: 77.7833 },
    { name: "Tirumangalam", tamil_name: "திருமங்கலம்", specialty: "Black Soil Cotton & Blackgram", lat: 9.8167, lon: 77.9833 },
    { name: "Peraiyur", tamil_name: "பேரையூர்", specialty: "Karisal Tract Redgram & Millets", lat: 9.7167, lon: 77.8000 },
    { name: "Thiruparankundram", tamil_name: "திருப்பரங்குன்றம்", specialty: "Sugarcane & Green Vegetables", lat: 9.8833, lon: 78.0667 }
  ],
  "Mayiladuthurai": [
    { name: "Mayiladuthurai", tamil_name: "மயிலாடுதுறை", specialty: "Kaveri Delta Triple Crop Paddy", lat: 11.1075, lon: 79.6523 },
    { name: "Sirkazhi", tamil_name: "சீர்காழி", specialty: "Traditional Sea-Coast Salt-Tolerant Rice", lat: 11.2333, lon: 79.7333 },
    { name: "Tharangambadi", tamil_name: "தரங்கம்பாடி", specialty: "Coastal Coconut, Casuarina & Fish Feed", lat: 11.0333, lon: 79.8500 },
    { name: "Kuthalam", tamil_name: "குத்தாலம்", specialty: "Alluvial Sugarcane & Blackgram Relay", lat: 11.0833, lon: 79.5500 }
  ],
  "Nagapattinam": [
    { name: "Nagapattinam", tamil_name: "நாகப்பட்டினம்", specialty: "Coastal Delta Rice & Marine Farming", lat: 10.7672, lon: 79.8424 },
    { name: "Kilvelur", tamil_name: "கீழ்வேளூர்", specialty: "Harvester Mechanized Paddy Granary", lat: 10.7000, lon: 79.7333 },
    { name: "Vedaranyam", tamil_name: "வேதாரண்யம்", specialty: "Agro-Salt Marine Pans & Mango", lat: 10.3833, lon: 79.8500 },
    { name: "Thirukkuvalai", tamil_name: "திருக்குவளை", specialty: "Deep Alluvium Pulse-Paddy Rotation", lat: 10.6167, lon: 79.7167 }
  ],
  "Namakkal": [
    { name: "Namakkal", tamil_name: "நாமக்கல்", specialty: "India's Egg City & Poultry Feed Maize", lat: 11.2189, lon: 78.1674 },
    { name: "Rasipuram", tamil_name: "ராசிபுரம்", specialty: "Pure Ghee & Tapioca Sago Processing", lat: 11.4667, lon: 78.1667 },
    { name: "Tiruchengode", tamil_name: "திருச்செங்கோடு", specialty: "Rig Hub, Rig-irrigated Groundnut", lat: 11.3800, lon: 77.8800 },
    { name: "Paramathi Velur", tamil_name: "பரமத்தி வேலூர்", specialty: "Cauvery Betelvine (வெற்றிலை) Mandi", lat: 11.0500, lon: 78.0167 },
    { name: "Kolli Hills", tamil_name: "கொல்லிமலை", specialty: "Organic Pepper, Pineapple & Minor Millets", lat: 11.2500, lon: 78.3333 },
    { name: "Sendamangalam", tamil_name: "சேந்தமங்கலம்", specialty: "Banana & Tapioca Sago Tubers", lat: 11.2833, lon: 78.2333 }
  ],
  "Nilgiris": [
    { name: "Udhagamandalam", tamil_name: "உதகமண்டலம்", specialty: "Ooty Carrot, Potato & English Vegetables", lat: 11.4102, lon: 76.6950 },
    { name: "Coonoor", tamil_name: "குன்னூர்", specialty: "World Class Orthodox Nilgiri Tea", lat: 11.3530, lon: 76.7959 },
    { name: "Kotagiri", tamil_name: "கோத்தகிரி", specialty: "High Elevation Tea Estates & Orange", lat: 11.4200, lon: 76.8700 },
    { name: "Gudalur", tamil_name: "கூடலூர்", specialty: "Cardamom, Robusta Coffee & Pepper", lat: 11.5000, lon: 76.5000 },
    { name: "Pandalur", tamil_name: "பந்தலூர்", specialty: "Tea, Ginger & Arecanut Belt", lat: 11.4833, lon: 76.3500 },
    { name: "Kundah", tamil_name: "குந்தா", specialty: "Terraced Hill Vegetables & Cabbage", lat: 11.2833, lon: 76.6833 }
  ],
  "Perambalur": [
    { name: "Perambalur", tamil_name: "பெரம்பலூர்", specialty: "Tamil Nadu's Largest Small Onion (சின்ன வெங்காயம்) Hub", lat: 11.2333, lon: 78.8833 },
    { name: "Kunnam", tamil_name: "குன்னம்", specialty: "High Protein Rainfed Maize", lat: 11.2333, lon: 79.0167 },
    { name: "Veppanthattai", tamil_name: "வேப்பந்தட்டை", specialty: "Cotton & Bt-Hybrid Testing Tract", lat: 11.3333, lon: 78.8333 },
    { name: "Alathur", tamil_name: "ஆலத்தூர்", specialty: "Sugar Mills Command & Groundnut", lat: 11.1500, lon: 78.8500 }
  ],
  "Pudukkottai": [
    { name: "Alangudi", tamil_name: "ஆலங்குடி", specialty: "Groundnut, Watermelon & Coconut", lat: 10.3500, lon: 78.9833 },
    { name: "Aranthangi", tamil_name: "அறந்தாங்கி", specialty: "Tank-Fed Alluvial Paddy Granary", lat: 10.1667, lon: 78.9833 },
    { name: "Gandarvakkottai", tamil_name: "கந்தர்வக்கோட்டை", specialty: "Cashew & Rainfed Redgram", lat: 10.5500, lon: 79.0333 },
    { name: "Thirumayam", tamil_name: "திருமயம்", specialty: "Ancient Tank Cascade Agriculture", lat: 10.2500, lon: 78.7500 },
    { name: "Iluppur", tamil_name: "இலுப்பூர்", specialty: "Dryland Maize & Dairy Herds", lat: 10.5167, lon: 78.6333 },
    { name: "Ponnamaravathi", tamil_name: "பொன்னமராவதி", specialty: "Vegetables & Horticultural Trees", lat: 10.2333, lon: 78.5333 }
  ],
  "Ramanathapuram": [
    { name: "Ramanathapuram", tamil_name: "இராமநாதபுரம்", specialty: "GI Ramnad Mundu Chilli (குண்டு மிளகாய்)", lat: 9.3639, lon: 78.8395 },
    { name: "Paramakudi", tamil_name: "பரமக்குடி", specialty: "Vaigai Basin Paddy & Cotton", lat: 9.5500, lon: 78.5833 },
    { name: "Mudukulathur", tamil_name: "முதுகுளத்தூர்", specialty: "Direct-seeded Dryland Paddy (பொடிவிதைப்பு)", lat: 9.3333, lon: 78.5167 },
    { name: "Kamuthi", tamil_name: "கமுதி", specialty: "Solar Agro-Farming & Blackgram", lat: 9.4000, lon: 78.3667 },
    { name: "Kadaladi", tamil_name: "கடலாடி", specialty: "Drought-Hardy Cotton & Oilseeds", lat: 9.2333, lon: 78.5000 },
    { name: "Tiruvadanai", tamil_name: "திருவாடானை", specialty: "Kottakarai River Delta Paddy", lat: 9.7833, lon: 78.9167 },
    { name: "Rameswaram", tamil_name: "ராமேஸ்வரம்", specialty: "Island Seaweed & Coastal Palms", lat: 9.2876, lon: 79.3129 }
  ],
  "Ranipet": [
    { name: "Ranipet", tamil_name: "ராணிப்பேட்டை", specialty: "Palar Valley Paddy & Sugarcane", lat: 12.9229, lon: 79.3329 },
    { name: "Arakkonam", tamil_name: "அரக்கோணம்", specialty: "Inter-State Agro Rail Transit & Paddy", lat: 13.0800, lon: 79.6700 },
    { name: "Arcot", tamil_name: "ஆற்காடு", specialty: "Groundnut Oil Pressing & Paddy", lat: 12.9000, lon: 79.3300 },
    { name: "Walajah", tamil_name: "வாலாஜா", specialty: "Betel Leaves & Fresh Vegetables", lat: 12.9833, lon: 79.3667 },
    { name: "Sholinghur", tamil_name: "சோளிங்கர்", specialty: "Dryland Groundnut & Watermelon", lat: 13.1167, lon: 79.4333 },
    { name: "Nemili", tamil_name: "நெமிலி", specialty: "Kaveripakkam Tank Basin Paddy", lat: 13.0167, lon: 79.6167 }
  ],
  "Salem": [
    { name: "Attur", tamil_name: "ஆத்தூர்", specialty: "GI-tagged Salem Sago (ஜவ்வரிசி) & Tapioca", lat: 11.5900, lon: 78.6000 },
    { name: "Mettur", tamil_name: "மேட்டூர்", specialty: "Stanley Reservoir Dam Delta Release", lat: 11.7900, lon: 77.8000 },
    { name: "Omalur", tamil_name: "ஓமலூர்", specialty: "Commercial Tomato & Mango Orchards", lat: 11.7400, lon: 78.0400 },
    { name: "Edappadi", tamil_name: "எடப்பாடி", specialty: "Kaveri Basin Sugarcane & Banana", lat: 11.5800, lon: 77.8500 },
    { name: "Sankari", tamil_name: "சங்ககிரி", specialty: "Dairy Logistics & Groundnut", lat: 11.4800, lon: 77.8700 },
    { name: "Yercaud", tamil_name: "ஏற்காடு", specialty: "Hill Coffee, Silver Oak & Spices", lat: 11.7753, lon: 78.2093 },
    { name: "Valapady", tamil_name: "வாழப்பாடி", specialty: "Betel Leaves, Coconut & Tapioca", lat: 11.6500, lon: 78.4000 }
  ],
  "Sivaganga": [
    { name: "Karaikudi", tamil_name: "காரைக்குடி", specialty: "Chettinad Organic Millets & Coconut", lat: 10.0700, lon: 78.7800 },
    { name: "Sivaganga", tamil_name: "சிவகங்கை", specialty: "Vaigai Lower Basin Paddy & Sugarcane", lat: 9.8433, lon: 78.4809 },
    { name: "Devakottai", tamil_name: "தேவகோட்டை", specialty: "Direct Paddy Cultivation & Oilseeds", lat: 9.9500, lon: 78.8200 },
    { name: "Manamadurai", tamil_name: "மானாமதுரை", specialty: "Clay Pottery, Chilli & Jasmine", lat: 9.7000, lon: 78.4500 },
    { name: "Tiruppuvanam", tamil_name: "திருப்புவனம்", specialty: "Vaigai River Bed Vegetables & Banana", lat: 9.8667, lon: 78.2833 },
    { name: "Kalaiyarkoil", tamil_name: "காளையார்கோவில்", specialty: "Rainfed Pulses & Cotton", lat: 9.8500, lon: 78.6333 }
  ],
  "Tenkasi": [
    { name: "Tenkasi", tamil_name: "தென்காசி", specialty: "Western Ghats Breeze, Paddy & Mango", lat: 8.9594, lon: 77.3150 },
    { name: "Sankarankovil", tamil_name: "சங்கரன்கோவில்", specialty: "Black Soil Cotton, Maize & Chillies", lat: 9.1700, lon: 77.5300 },
    { name: "Kadayanallur", tamil_name: "கடையநல்லூர்", specialty: "Lemon (எலுமிச்சை) & Guava Orchards", lat: 9.0800, lon: 77.3500 },
    { name: "Sengottai", tamil_name: "செங்கோட்டை", specialty: "Spices, Pepper, Clove & Rubber", lat: 8.9800, lon: 77.2500 },
    { name: "Alangulam", tamil_name: "ஆலங்குளம்", specialty: "Country Onion & Bidi Leaf Trade", lat: 8.8700, lon: 77.5000 },
    { name: "Sivagiri", tamil_name: "சிவகிரி", specialty: "Sugarcane & Foothill Paddy", lat: 9.3300, lon: 77.4300 }
  ],
  "Thanjavur": [
    { name: "Kumbakonam", tamil_name: "கும்பகோணம்", specialty: "GI Kumbakonam Betel Leaves (வெற்றிலை) & Paddy", lat: 10.9602, lon: 79.3845 },
    { name: "Thanjavur", tamil_name: "தஞ்சாவூர்", specialty: "Rice Bowl of Tamil Nadu (நெற்களஞ்சியம்)", lat: 10.7870, lon: 79.1378 },
    { name: "Pattukkottai", tamil_name: "பட்டுக்கோட்டை", specialty: "Coconut Capital of Delta (தென்னை வளம்)", lat: 10.4300, lon: 79.3200 },
    { name: "Papanasam", tamil_name: "பாபநாசம்", specialty: "Kudamurutti River Basin Banana & Paddy", lat: 10.9200, lon: 79.2800 },
    { name: "Thiruvaiyaru", tamil_name: "திருவையாறு", specialty: "Five River Confluence Sugarcane & Paddy", lat: 10.8800, lon: 79.1000 },
    { name: "Orathanadu", tamil_name: "ஒரத்தநாடு", specialty: "Paddy Seed Farms & Delta Dairy", lat: 10.6300, lon: 79.2500 },
    { name: "Budalur", tamil_name: "பூதலூர்", specialty: "Grand Anicut (Kallanai) Irrigated Paddy", lat: 10.8000, lon: 78.9800 },
    { name: "Peravurani", tamil_name: "பேராவூரணி", specialty: "Coastal Delta Coconut & Groundnut", lat: 10.3000, lon: 79.1700 },
    { name: "Thiruvidaimarudur", tamil_name: "திருவிடைமருதூர்", specialty: "Organic Traditional Paddy Varieties", lat: 11.0000, lon: 79.4700 }
  ],
  "Theni": [
    { name: "Bodinayakanur", tamil_name: "போடிநாயக்கனூர்", specialty: "Cardamom City of India (ஏலக்காய் நகரம்)", lat: 10.0100, lon: 77.3500 },
    { name: "Cumbum", tamil_name: "கம்பம்", specialty: "GI Cumbum Panneer Thratchai (Grapes) Valley", lat: 9.7300, lon: 77.2800 },
    { name: "Periyakulam", tamil_name: "பெரியகுளம்", specialty: "Horticultural College, Sweet Mangoes", lat: 10.1200, lon: 77.5500 },
    { name: "Uthamapalayam", tamil_name: "உத்தமபாளையம்", specialty: "Mullaperiyar Watered Banana & Paddy", lat: 9.8100, lon: 77.3300 },
    { name: "Andipatti", tamil_name: "ஆண்டிபட்டி", specialty: "Vaigai Dam Catchment Millets & Cotton", lat: 10.0000, lon: 77.6200 }
  ],
  "Thoothukudi": [
    { name: "Kovilpatti", tamil_name: "கோவில்பட்டி", specialty: "GI Kovilpatti Kadalai Mittai, Maize & Cotton", lat: 9.1700, lon: 77.8700 },
    { name: "Tiruchendur", tamil_name: "திருச்செந்தூர்", specialty: "Theri Red Sand Palm Jaggery (பனங்கருப்பட்டி)", lat: 8.4900, lon: 78.1200 },
    { name: "Srivaikuntam", tamil_name: "ஸ்ரீவைகுண்டம்", specialty: "Thamirabarani Basin Banana (Nendran)", lat: 8.6200, lon: 77.9300 },
    { name: "Ettayapuram", tamil_name: "எட்டயபுரம்", specialty: "Dryland Black Soil Cotton & Pulses", lat: 9.1500, lon: 77.9900 },
    { name: "Vilathikulam", tamil_name: "விளாத்திகுளம்", specialty: "Drought Hardy Chilli & Minor Millets", lat: 9.1300, lon: 78.1700 },
    { name: "Sathankulam", tamil_name: "சாத்தான்குளம்", specialty: "Palmyra Palm Industry & Groundnut", lat: 8.4400, lon: 77.9100 },
    { name: "Ottapidaram", tamil_name: "ஒட்டப்பிடாரம்", specialty: "Rainfed Pulses, Cotton & Dairy", lat: 8.9000, lon: 78.0200 }
  ],
  "Tiruchirappalli": [
    { name: "Srirangam", tamil_name: "ஸ்ரீரங்கம்", specialty: "Kaveri Island Banana & Betel Groves", lat: 10.8600, lon: 78.6900 },
    { name: "Lalgudi", tamil_name: "லால்குடி", specialty: "Fertile Delta Granary & High-Yield Rice", lat: 10.8700, lon: 78.8200 },
    { name: "Musiri", tamil_name: "முசிறி", specialty: "Banana & Tapioca Wholesale Mandi", lat: 10.9700, lon: 78.4500 },
    { name: "Thuraiyur", tamil_name: "துறையூர்", specialty: "Pachaimalai Foothills Maize & Cotton", lat: 11.1000, lon: 78.6000 },
    { name: "Manapparai", tamil_name: "மணப்பாறை", specialty: "Murukku Heritage & Cattle Market Hub", lat: 10.6000, lon: 78.4300 },
    { name: "Thottiyam", tamil_name: "தொட்டியம்", specialty: "GI-tagged Banana Processing Unit", lat: 11.0000, lon: 78.3300 },
    { name: "Manachanallur", tamil_name: "மண்ணச்சநல்லூர்", specialty: "Famous Ponni Rice Milling Hub", lat: 10.9100, lon: 78.7000 }
  ],
  "Tirunelveli": [
    { name: "Ambasamudram", tamil_name: "அம்பாசமுத்திரம்", specialty: "Thamirabarani Riverbed Paddy & Banana", lat: 8.7000, lon: 77.4500 },
    { name: "Cheranmahadevi", tamil_name: "சேரன்மகாதேவி", specialty: "Canal Irrigated Double Crop Rice", lat: 8.6800, lon: 77.5700 },
    { name: "Palayamkottai", tamil_name: "பாளையங்கோட்டை", specialty: "Dairy Farming & Regional Flower Market", lat: 8.7200, lon: 77.7300 },
    { name: "Radhapuram", tamil_name: "ராதாபுரம்", specialty: "Windmill Belt Palmyra & Cashew", lat: 8.3000, lon: 77.6800 },
    { name: "Nanguneri", tamil_name: "நாங்குநேரி", specialty: "Karisal Cotton & Rainfed Pulses", lat: 8.4800, lon: 77.6500 },
    { name: "Thisayanvilai", tamil_name: "திசையன்விளை", specialty: "Theri Sand Horticulture & Drumstick", lat: 8.3300, lon: 77.8700 }
  ],
  "Tirupathur": [
    { name: "Tirupathur", tamil_name: "திருப்பத்தூர்", specialty: "Sandalwood Tract, Groundnut & Millets", lat: 12.4925, lon: 78.5678 },
    { name: "Vaniyambadi", tamil_name: "வாணியம்பாடி", specialty: "Palar River Sugarcane & Vegetable Plots", lat: 12.6833, lon: 78.6167 },
    { name: "Ambur", tamil_name: "ஆம்பூர்", specialty: "Palar Alluvium Banana & Vegetables", lat: 12.7833, lon: 78.7167 },
    { name: "Natrampalli", tamil_name: "நாட்ராம்பள்ளி", specialty: "Dryland Groundnut & Rainfed Pulses", lat: 12.5667, lon: 78.5333 },
    { name: "Yelagiri Hills", tamil_name: "ஏலகிரி மலை", specialty: "Hill Fruits, Jackfruit & Rose Gardens", lat: 12.5800, lon: 78.6400 }
  ],
  "Tiruppur": [
    { name: "Udumalaipettai", tamil_name: "உடுமலைப்பேட்டை", specialty: "PAP Canal Coconut, Maize & Wind Agro", lat: 10.5800, lon: 77.2500 },
    { name: "Dharapuram", tamil_name: "தாராபுரம்", specialty: "Amaravathi Basin Drumstick & Millets", lat: 10.7300, lon: 77.5300 },
    { name: "Kangeyam", tamil_name: "காங்கேயம்", specialty: "Kangayam Bull Heritage & Copra Oil Mills", lat: 11.0000, lon: 77.5600 },
    { name: "Avinashi", tamil_name: "அவிநாசி", specialty: "Cotton & Vegetables under Drip", lat: 11.1900, lon: 77.2700 },
    { name: "Palladam", tamil_name: "பல்லடம்", specialty: "Broiler Poultry Capital & Maize Feed", lat: 11.0000, lon: 77.2800 },
    { name: "Madathukulam", tamil_name: "மடத்துக்குளம்", specialty: "Sugarcane Command & Banana", lat: 10.5300, lon: 77.3800 },
    { name: "Uthukuli", tamil_name: "ஊத்துக்குளி", specialty: "Famous Uthukuli Butter & Dairy Farms", lat: 11.1500, lon: 77.4500 }
  ],
  "Tiruvallur": [
    { name: "Tiruvallur", tamil_name: "திருவள்ளூர்", specialty: "Poondi Reservoir Basin High-Yield Rice", lat: 13.1439, lon: 79.9083 },
    { name: "Tiruttani", tamil_name: "திருத்தணி", specialty: "Groundnut, Mango & Sugarcane Mills", lat: 13.1800, lon: 79.6300 },
    { name: "Gummidipoondi", tamil_name: "கும்மிடிப்பூண்டி", specialty: "Casuarina Plantation & Vegetables", lat: 13.4000, lon: 80.1300 },
    { name: "Ponneri", tamil_name: "பொன்னேரி", specialty: "Araniyar Basin Paddy & Aquaculture", lat: 13.3300, lon: 80.2000 },
    { name: "Uthukkottai", tamil_name: "ஊத்துக்கோட்டை", specialty: "Kandaleru-Poondi Canal Horticulture", lat: 13.3000, lon: 79.9000 },
    { name: "Poonamallee", tamil_name: "பூந்தமல்லி", specialty: "Betel Leaves & Greenhouses", lat: 13.0500, lon: 80.1100 }
  ],
  "Tiruvannamalai": [
    { name: "Arni", tamil_name: "ஆரணி", specialty: "GI-tagged Arni Silk & Famous Arni Ponni Rice", lat: 12.6700, lon: 79.2800 },
    { name: "Cheyyar", tamil_name: "செய்யாறு", specialty: "Cheyyar River Sugarcane & Paddy", lat: 12.6600, lon: 79.5400 },
    { name: "Polur", tamil_name: "போளூர்", specialty: "Foot of Javadhu Hills Paddy & Groundnut", lat: 12.5000, lon: 79.1300 },
    { name: "Chengam", tamil_name: "செங்கம்", specialty: "Dryland Groundnut, Maize & Millets", lat: 12.3000, lon: 78.8000 },
    { name: "Tiruvannamalai", tamil_name: "திருவண்ணாமலை", specialty: "Annamalaiyar Temple Tank Irrigated Paddy", lat: 12.2253, lon: 79.0747 },
    { name: "Vandavasi", tamil_name: "வந்தவாசி", specialty: "Korai Mat Grass & Rice Cultivation", lat: 12.5000, lon: 79.6100 },
    { name: "Jamunamarathur", tamil_name: "ஜவ்வாது மலை", specialty: "Organic Tribal Samai, Honey & Fruit Orchards", lat: 12.6300, lon: 78.9000 }
  ],
  "Tiruvarur": [
    { name: "Mannargudi", tamil_name: "மன்னார்குடி", specialty: "Pamaniyar-Vennar Granary & Sugarcane", lat: 10.6600, lon: 79.4500 },
    { name: "Tiruvarur", tamil_name: "திருவாரூர்", specialty: "Historic Kamalalayam Delta Paddy Heart", lat: 10.7700, lon: 79.6300 },
    { name: "Thiruthuraipoondi", tamil_name: "திருத்துறைப்பூண்டி", specialty: "Traditional Indigenous Rice Varieties (Mappillai Samba)", lat: 10.5300, lon: 79.6500 },
    { name: "Nannilam", tamil_name: "நன்னிலம்", specialty: "Triple Cropped High Fertility Alluvium", lat: 10.8800, lon: 79.6200 },
    { name: "Needamangalam", tamil_name: "நீடாமங்கலம்", specialty: "Vennar Canal Regulator Agriculture", lat: 10.7700, lon: 79.4200 },
    { name: "Kudavasal", tamil_name: "குடவாசல்", specialty: "Paddy-Pulse Relay Cropping", lat: 10.8500, lon: 79.4800 },
    { name: "Valangaiman", tamil_name: "வலங்கைமான்", specialty: "Vegetable Crops & Cauvery Rice", lat: 10.8800, lon: 79.3700 }
  ],
  "Vellore": [
    { name: "Anaicut", tamil_name: "ஆணைக்கட்டு", specialty: "GI Vellore Spiny Brinjal (முள்ளுக் கத்தரி)", lat: 12.8700, lon: 78.9800 },
    { name: "Gudiyatham", tamil_name: "குடியாத்தம்", specialty: "Matchstick Poplar & Sugarcane Jaggery", lat: 12.9400, lon: 78.8700 },
    { name: "Katpadi", tamil_name: "காட்பாடி", specialty: "Palar Bed Vegetables & Dairy", lat: 12.9800, lon: 79.1300 },
    { name: "Vellore", tamil_name: "வேலூர்", specialty: "Otteri Lake Horticultural Greenbelt", lat: 12.9165, lon: 79.1325 },
    { name: "Pernambut", tamil_name: "பேர்ணாம்பட்டு", specialty: "Leather Agro-Forestry & Groundnut", lat: 12.9300, lon: 78.7100 },
    { name: "K.V. Kuppam", tamil_name: "கே.வி.குப்பம்", specialty: "Sugarcane, Paddy & Flowers", lat: 12.9800, lon: 79.0300 }
  ],
  "Viluppuram": [
    { name: "Tindivanam", tamil_name: "திண்டிவனம்", specialty: "National Groundnut (கடலை) Research & Trade Hub", lat: 12.2500, lon: 79.6500 },
    { name: "Viluppuram", tamil_name: "விழுப்புரம்", specialty: "Leading Sugarcane & Sago Processing", lat: 11.9401, lon: 79.4861 },
    { name: "Gingee", tamil_name: "செஞ்சி", specialty: "Historic Fort Foothills Paddy & Casuarina", lat: 12.2500, lon: 79.4200 },
    { name: "Vanur", tamil_name: "வானூர்", specialty: "Red Loam Cashew & Watermelon", lat: 12.0300, lon: 79.7200 },
    { name: "Vikravandi", tamil_name: "விக்கிரவாண்டி", specialty: "Thenpennai Basin Sugarcane Mills", lat: 12.0200, lon: 79.5500 },
    { name: "Marakkanam", tamil_name: "மரக்காணம்", specialty: "Coastal Aqua-Farming & Salt Pan Cultivation", lat: 12.2000, lon: 79.9500 },
    { name: "Thiruvennainallur", tamil_name: "திருவெண்ணெய்நல்லூர்", specialty: "Pennaiyar Riverbed Sugarcane", lat: 11.8700, lon: 79.4000 }
  ],
  "Virudhunagar": [
    { name: "Srivilliputhur", tamil_name: "ஸ்ரீவில்லிபுத்தூர்", specialty: "Temple Emblem Town, Dairy Palkova & Paddy", lat: 9.5100, lon: 77.6300 },
    { name: "Rajapalayam", tamil_name: "ராஜபாளையம்", specialty: "Rajapalayam Dog Breed, Cotton Mills & Mango", lat: 9.4500, lon: 77.5500 },
    { name: "Sivakasi", tamil_name: "சிவகாசி", specialty: "Commercial Print Agro-Packaging & Millets", lat: 9.4500, lon: 77.8000 },
    { name: "Aruppukkottai", tamil_name: "அருப்புக்கோட்டை", specialty: "Weaving Hub, Black Cotton Soil Pulses", lat: 9.5100, lon: 78.1000 },
    { name: "Sattur", tamil_name: "சாத்தூர்", specialty: "Vaippar Riverbed Watermelon, Chillies & Maize", lat: 9.3600, lon: 77.9200 },
    { name: "Virudhunagar", tamil_name: "விருதுநகர்", specialty: "Wholesale Oilseed & Red Chilli Terminal", lat: 9.5872, lon: 77.9514 },
    { name: "Watrap", tamil_name: "வத்திராயிருப்பு", specialty: "Western Ghats Foothills Coconut & Paddy", lat: 9.6300, lon: 77.6300 },
    { name: "Kariapatti", tamil_name: "காரியாபட்டி", specialty: "Dryland Maize, Cumbu & Sorghum", lat: 9.6700, lon: 78.1000 }
  ]
};

// Retrieve authentic Taluks / Areas for any district
export function getDistrictAreas(districtName: string): DistrictAreaItem[] {
  return TN_DISTRICT_AREAS[districtName] || [];
}

// Global search for any town, taluk, or village across Tamil Nadu
export function searchTamilNaduAreas(query: string): { district: string; district_ta: string; area: DistrictAreaItem }[] {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const results: { district: string; district_ta: string; area: DistrictAreaItem }[] = [];

  for (const [distName, areas] of Object.entries(TN_DISTRICT_AREAS)) {
    const distData = TAMIL_NADU_DISTRICTS[distName];
    for (const a of areas) {
      if (
        a.name.toLowerCase().includes(q) ||
        a.tamil_name.includes(q) ||
        (a.specialty && a.specialty.toLowerCase().includes(q))
      ) {
        results.push({
          district: distName,
          district_ta: distData ? distData.tamil_name : distName,
          area: a
        });
      }
    }
  }
  return results;
}
