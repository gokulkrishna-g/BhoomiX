"""
BhoomiX - Agricultural Knowledge Base & Reference Data
Contains verified domain knowledge for Indian and Tamil Nadu agriculture,
Government schemes, Pest/Disease remedies, and Crop profiles.
"""

# Crop details: Tamil name, growth duration, water needs, optimal pH, season
CROP_METADATA = {
    "rice": {
        "tamil": "நெல் (Nel)",
        "duration_days": 120,
        "season": "Kuruvai / Samba / Thaladi",
        "water_req_mm": 1200,
        "optimal_ph": "5.5 - 7.0",
        "soil_types": ["Clay loam", "Alluvial", "Clay"],
        "mandi_price_per_quintal": 2350,
        "avg_yield_kg_ha": 4500
    },
    "maize": {
        "tamil": "மக்காச்சோளம் (Makka Cholam)",
        "duration_days": 100,
        "season": "Kharif / Rabi",
        "water_req_mm": 600,
        "optimal_ph": "6.0 - 7.5",
        "soil_types": ["Sandy loam", "Well-drained loam"],
        "mandi_price_per_quintal": 2225,
        "avg_yield_kg_ha": 3800
    },
    "chickpea": {
        "tamil": "கொண்டைக்கடலை (Kondaikadalai)",
        "duration_days": 95,
        "season": "Rabi",
        "water_req_mm": 350,
        "optimal_ph": "6.0 - 8.0",
        "soil_types": ["Sandy loam", "Clay loam"],
        "mandi_price_per_quintal": 5440,
        "avg_yield_kg_ha": 1200
    },
    "kidneybeans": {
        "tamil": "ராஜ்மா (Rajma)",
        "duration_days": 110,
        "season": "Rabi",
        "water_req_mm": 450,
        "optimal_ph": "5.5 - 6.5",
        "soil_types": ["Loamy", "Silt loam"],
        "mandi_price_per_quintal": 7200,
        "avg_yield_kg_ha": 1400
    },
    "pigeonpeas": {
        "tamil": "துவரம்பருப்பு (Thuvaram Paruppu)",
        "duration_days": 160,
        "season": "Kharif",
        "water_req_mm": 500,
        "optimal_ph": "6.5 - 7.5",
        "soil_types": ["Deep black soil", "Red loam"],
        "mandi_price_per_quintal": 7550,
        "avg_yield_kg_ha": 1100
    },
    "mothbeans": {
        "tamil": "நரிப்பயறு (Nari Payaru)",
        "duration_days": 75,
        "season": "Kharif",
        "water_req_mm": 250,
        "optimal_ph": "6.5 - 8.0",
        "soil_types": ["Sandy soil", "Arid soil"],
        "mandi_price_per_quintal": 6100,
        "avg_yield_kg_ha": 750
    },
    "mungbean": {
        "tamil": "பாசிப்பயறு (Pasi Payaru)",
        "duration_days": 70,
        "season": "Kharif / Summer",
        "water_req_mm": 300,
        "optimal_ph": "6.2 - 7.2",
        "soil_types": ["Loamy", "Alluvial"],
        "mandi_price_per_quintal": 8550,
        "avg_yield_kg_ha": 950
    },
    "blackgram": {
        "tamil": "உளுந்து (Ulundhu)",
        "duration_days": 75,
        "season": "Rabi / Rice Fallow",
        "water_req_mm": 350,
        "optimal_ph": "6.5 - 7.5",
        "soil_types": ["Black loam", "Clay loam"],
        "mandi_price_per_quintal": 7400,
        "avg_yield_kg_ha": 900
    },
    "lentil": {
        "tamil": "மைசூர் பருப்பு (Masoor Dal)",
        "duration_days": 110,
        "season": "Rabi",
        "water_req_mm": 350,
        "optimal_ph": "6.0 - 7.5",
        "soil_types": ["Alluvial loam", "Clay loam"],
        "mandi_price_per_quintal": 6425,
        "avg_yield_kg_ha": 1050
    },
    "pomegranate": {
        "tamil": "மாதுளை (Madhulai)",
        "duration_days": 180,
        "season": "Perennial / Mrig bahar",
        "water_req_mm": 700,
        "optimal_ph": "6.5 - 7.5",
        "soil_types": ["Light sandy loam", "Well-drained red soil"],
        "mandi_price_per_quintal": 9500,
        "avg_yield_kg_ha": 8500
    },
    "banana": {
        "tamil": "வாழை (Vazhai)",
        "duration_days": 330,
        "season": "Year round",
        "water_req_mm": 1800,
        "optimal_ph": "6.5 - 7.5",
        "soil_types": ["Rich alluvial soil", "Volcanic loam"],
        "mandi_price_per_quintal": 2800,
        "avg_yield_kg_ha": 35000
    },
    "mango": {
        "tamil": "மாம்பழம் (Maangai)",
        "duration_days": 365,
        "season": "Summer harvest",
        "water_req_mm": 1000,
        "optimal_ph": "5.5 - 7.5",
        "soil_types": ["Deep rich alluvial", "Laterite"],
        "mandi_price_per_quintal": 4500,
        "avg_yield_kg_ha": 9000
    },
    "grapes": {
        "tamil": "திராட்சை (Dhiratchai)",
        "duration_days": 140,
        "season": "October - March",
        "water_req_mm": 800,
        "optimal_ph": "6.5 - 7.5",
        "soil_types": ["Sandy loam", "Red gravelly loam"],
        "mandi_price_per_quintal": 6200,
        "avg_yield_kg_ha": 18000
    },
    "watermelon": {
        "tamil": "தர்பூசணி (Tharpoosani)",
        "duration_days": 90,
        "season": "Zaid / Summer",
        "water_req_mm": 400,
        "optimal_ph": "6.0 - 7.0",
        "soil_types": ["Sandy loam with riverbeds"],
        "mandi_price_per_quintal": 1600,
        "avg_yield_kg_ha": 25000
    },
    "muskmelon": {
        "tamil": "முலாம் பழம் (Mulaam Pazham)",
        "duration_days": 85,
        "season": "Summer",
        "water_req_mm": 400,
        "optimal_ph": "6.0 - 7.0",
        "soil_types": ["Sandy loam"],
        "mandi_price_per_quintal": 2200,
        "avg_yield_kg_ha": 16000
    },
    "apple": {
        "tamil": "ஆப்பிள் (Apple)",
        "duration_days": 365,
        "season": "Temperate / Hill station",
        "water_req_mm": 1100,
        "optimal_ph": "5.5 - 6.5",
        "soil_types": ["Loamy soil with good organic matter"],
        "mandi_price_per_quintal": 9000,
        "avg_yield_kg_ha": 12000
    },
    "orange": {
        "tamil": "ஆரஞ்சு (Orange)",
        "duration_days": 365,
        "season": "Winter / Spring",
        "water_req_mm": 900,
        "optimal_ph": "6.0 - 7.5",
        "soil_types": ["Deep well-drained loam"],
        "mandi_price_per_quintal": 4800,
        "avg_yield_kg_ha": 14000
    },
    "papaya": {
        "tamil": "பப்பாளி (Pappali)",
        "duration_days": 270,
        "season": "Year round",
        "water_req_mm": 1200,
        "optimal_ph": "6.0 - 6.8",
        "soil_types": ["Sandy loam with rich humus"],
        "mandi_price_per_quintal": 2400,
        "avg_yield_kg_ha": 40000
    },
    "coconut": {
        "tamil": "தென்னை (Thennai)",
        "duration_days": 365,
        "season": "Perennial",
        "water_req_mm": 1600,
        "optimal_ph": "5.2 - 8.0",
        "soil_types": ["Coastal sand", "Laterite", "Alluvial"],
        "mandi_price_per_quintal": 3200,
        "avg_yield_kg_ha": 11000
    },
    "cotton": {
        "tamil": "பருத்தி (Paruthi)",
        "duration_days": 150,
        "season": "Kharif",
        "water_req_mm": 700,
        "optimal_ph": "6.0 - 8.0",
        "soil_types": ["Deep black cotton soil", "Regur"],
        "mandi_price_per_quintal": 7120,
        "avg_yield_kg_ha": 2100
    },
    "jute": {
        "tamil": "சணல் (Sanal)",
        "duration_days": 120,
        "season": "Kharif",
        "water_req_mm": 1400,
        "optimal_ph": "6.0 - 7.5",
        "soil_types": ["Alluvial delta loam"],
        "mandi_price_per_quintal": 5050,
        "avg_yield_kg_ha": 2800
    },
    "coffee": {
        "tamil": "காபி (Coffee)",
        "duration_days": 365,
        "season": "Hill plantations",
        "water_req_mm": 1700,
        "optimal_ph": "5.5 - 6.5",
        "soil_types": ["Lateritic red loam on hill slopes"],
        "mandi_price_per_quintal": 18500,
        "avg_yield_kg_ha": 1250
    }
}

# Detailed Pest & Disease Information
PEST_DISEASE_KNOWLEDGE = {
    "army worm": {
        "tamil": "படைப்புழு (Padai Puzhu)",
        "scientific_name": "Spodoptera frugiperda / Mythimna separata",
        "crops_affected": ["Rice", "Maize", "Sorghum", "Millets"],
        "symptoms": "Ragged holes in foliage, skeletonized leaves, larval droppings in plant whorls.",
        "organic_remedies": [
            "Spray Neem Seed Kernel Extract (NSKE 5%) or Neem oil (3ml/liter).",
            "Release egg parasitoid Trichogramma chilonis @ 50,000/ha at 10-day intervals.",
            "Install pheromone traps @ 5 traps/acre for adult moth monitoring."
        ],
        "chemical_remedies": [
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L of water.",
            "Emamectin Benzoate 5% SG @ 0.4 g/L of water during evening hours."
        ],
        "preventive_practices": [
            "Deep summer ploughing to expose pupae to predatory birds and sun.",
            "Intercrop with pulses like cowpea to encourage beneficial predatory insects."
        ]
    },
    "legume blister beetle": {
        "tamil": "வண்டு பூச்சி (Vandu Poochi)",
        "scientific_name": "Mylabris pustulata",
        "crops_affected": ["Pigeonpeas", "Blackgram", "Chickpea", "Mungbean"],
        "symptoms": "Adult beetles feed aggressively on floral parts, petals, and young pods causing flower drop.",
        "organic_remedies": [
            "Hand pick beetles using gloves in early morning when sluggish, drop into kerosened water.",
            "Dust wood ash mixed with pungent neem oil cake on flower clusters."
        ],
        "chemical_remedies": [
            "Malathion 5% dust @ 25 kg/ha or spray Chlorpyrifos 20% EC @ 2 ml/L."
        ],
        "preventive_practices": [
            "Shake plants over cloth sheets in early morning to collect and destroy beetles.",
            "Maintain light traps near border rows."
        ]
    },
    "red spider": {
        "tamil": "செம்பேன் சிலந்தி (Sembaen Silandhi)",
        "scientific_name": "Tetranychus urticae",
        "crops_affected": ["Vegetables", "Cotton", "Papaya", "Banana"],
        "symptoms": "Yellow speckles on upper leaf surface, fine webbing on underside, bronzed leaf drop.",
        "organic_remedies": [
            "Spray Wettable Sulphur 80% WP @ 2.5 g/L.",
            "Apply Pongamia (Pungam) oil 3% with soft soap emulsifier.",
            "Release predatory mites (Neoseiulus longispinosus)."
        ],
        "chemical_remedies": [
            "Fenpyroximate 5% EC @ 1 ml/L or Spiromesifen 22.9% SC @ 0.8 ml/L."
        ],
        "preventive_practices": [
            "Avoid dry dust accumulation on crop canopy by overhead sprinkler misting.",
            "Remove alternate weed hosts near field bunds."
        ]
    },
    "rice gall midge": {
        "tamil": "ஆனைக்கொம்பன் (Aanai Komban)",
        "scientific_name": "Orseolia oryzae",
        "crops_affected": ["Rice"],
        "symptoms": "Transformation of apical leaf sheath into tubular silver-colored cylindrical gall ('Silver shoot' or 'Onion leaf').",
        "organic_remedies": [
            "Apply Neem cake @ 150 kg/ha in the main field.",
            "Conserve natural platygastrid parasitoids (Platygaster oryzae)."
        ],
        "chemical_remedies": [
            "Fipronil 0.3% G @ 20 kg/ha or spray Thiamethoxam 25% WG @ 0.2 g/L."
        ],
        "preventive_practices": [
            "Plant gall-midge resistant cultivars (e.g. CR 1009, CO 43, ADT 43).",
            "Avoid excessive split applications of nitrogenous fertilizer."
        ]
    },
    "rice leaf roller": {
        "tamil": "இலை சுருட்டு புழு (Ilai Suruttu Puzhu)",
        "scientific_name": "Cnaphalocrocis medinalis",
        "crops_affected": ["Rice", "Sorghum", "Wheat"],
        "symptoms": "Leaves folded longitudinally with white transparent streaks from green tissue scraping.",
        "organic_remedies": [
            "Pass thorny bamboo twigs across the field canopy to dislodge larvae.",
            "Spray Beauveria bassiana @ 5g/L during cloudy weather.",
            "Release Trichogramma japonicum @ 100,000/ha."
        ],
        "chemical_remedies": [
            "Cartap Hydrochloride 50% SP @ 2 g/L or Flubendiamide 39.35% SC @ 0.25 ml/L."
        ],
        "preventive_practices": [
            "Maintain optimal plant spacing to avoid dense canopy shading.",
            "Apply balanced potash to enhance leaf sheath toughness."
        ]
    },
    "rice leafhopper": {
        "tamil": "பச்சை தத்துப்பூச்சி (Pachai Thathupoochi)",
        "scientific_name": "Nephotettix virescens",
        "crops_affected": ["Rice"],
        "symptoms": "Yellowing of leaf blades from tip downwards, stunted growth, vector for Rice Tungro Virus (RTV).",
        "organic_remedies": [
            "Setup yellow sticky traps @ 10 traps/acre.",
            "Spray 5% neem seed kernel extract (NSKE).",
            "Conserve green mirid bugs (Cyrtorhinus lividipennis)."
        ],
        "chemical_remedies": [
            "Imidacloprid 17.8% SL @ 0.25 ml/L or Dinotefuran 20% SG @ 0.4 g/L."
        ],
        "preventive_practices": [
            "Synchronized community planting in the village cluster.",
            "Eradicate weed hosts (Leersia hexandra, Echinochloa) along irrigation channels."
        ]
    },
    "rice water weevil": {
        "tamil": "நீர் வண்டு (Neer Vandu)",
        "scientific_name": "Lissorhoptrus oryzophilus",
        "crops_affected": ["Rice"],
        "symptoms": "Longitudinal white slit scars on leaves from adults; larvae chew rice rootlets causing lodging.",
        "organic_remedies": [
            "Intermittent drainage of paddy water for 3 to 4 days to expose larvae to soil drying.",
            "Apply Metarhizium anisopliae bio-fungus to wet soil beds."
        ],
        "chemical_remedies": [
            "Clothianidin 50% WDG @ 0.1 g/L or Chlorantraniliprole 0.4% GR @ 10 kg/ha."
        ],
        "preventive_practices": [
            "Delay flood establishment where feasible; practice Alternate Wetting and Drying (AWD)."
        ]
    },
    "wheat phloeothrips": {
        "tamil": "இலைப்பேன் (Ilaippaen)",
        "scientific_name": "Haplothrips tritici",
        "crops_affected": ["Wheat", "Barley", "Millets"],
        "symptoms": "Curling of flag leaves, whitish bleached earheads, shrivelled grain development.",
        "organic_remedies": [
            "Blue sticky traps @ 8 traps/acre.",
            "Spray garlic-chilli extract (3%) or neem oil (2%)."
        ],
        "chemical_remedies": [
            "Dimethoate 30% EC @ 1.7 ml/L or Thiamethoxam 25% WG @ 0.2 g/L."
        ],
        "preventive_practices": [
            "Early sowing to escape the peak thrips emergence period.",
            "Crop rotation with non-graminaceous crops."
        ]
    },
    "white backed plant hopper": {
        "tamil": "வெள்ளை முதுகு தத்துப்பூச்சி (Vellai Mudhugu Thathupoochi)",
        "scientific_name": "Sogatella furcifera",
        "crops_affected": ["Rice", "Millets"],
        "symptoms": "Honeydew secretion leading to sooty mould, 'hopper burn' circular dry patches in field.",
        "organic_remedies": [
            "Alternate wetting and drying (AWD) irrigation; avoid continuous stagnant water.",
            "Spray neem oil 10,000 ppm @ 2 ml/L directed towards plant base."
        ],
        "chemical_remedies": [
            "Pymetrozine 50% WDG @ 0.6 g/L or Triflumezopyrim 10% SC @ 0.5 ml/L."
        ],
        "preventive_practices": [
            "Provide 'alleyways' of 30 cm after every 2 meters of planting for aeration and sunlight.",
            "Avoid indiscriminate synthetic pyrethroid sprays which kill predatory spiders."
        ]
    },
    "yellow rice borer": {
        "tamil": "மஞ்சள் தண்டு துளைப்பான் (Thandu Thulaippan)",
        "scientific_name": "Scirpophaga incertulas",
        "crops_affected": ["Rice"],
        "symptoms": "'Dead heart' in vegetative tillers; 'White earhead' with empty chaffy panicles at reproductive stage.",
        "organic_remedies": [
            "Clip seedling tips before transplanting to eliminate egg masses.",
            "Erect bird perches @ 20/acre.",
            "Install pheromone traps with Scirpo-lure @ 5 traps/acre."
        ],
        "chemical_remedies": [
            "Chlorantraniliprole 18.5% SC @ 0.3 ml/L or Cartap Hydrochloride 4% G @ 18 kg/ha."
        ],
        "preventive_practices": [
            "Harvest rice plants at ground level and plough stubbles immediately.",
            "Apply Bacillus thuringiensis (Bt) kurstaki @ 2 g/L."
        ]
    },
    "agricultural weed": {
        "tamil": "களைச்செடிகள் (Kalai Chedigal)",
        "scientific_name": "Various aggressive weed flora (Echinochloa, Cyperus, Parthenium)",
        "crops_affected": ["All field crops"],
        "symptoms": "Stunted crop vigor, competition for sunlight, water, and soil nutrients.",
        "organic_remedies": [
            "Cono-weeder / rotary weeder operation at 15 and 30 days after transplanting.",
            "Mulching with paddy straw or bio-degradable mulch sheets.",
            "Sowing green manure sunnhemp / daincha to smother weed emergence."
        ],
        "chemical_remedies": [
            "Pre-emergence: Pretilachlor 50% EC @ 1.0 kg a.i./ha within 3 days of transplanting.",
            "Post-emergence: Bispyribac sodium 10% SC @ 200 ml/ha at 15-20 days."
        ],
        "preventive_practices": [
            "Use certified clean weed-free seed lots.",
            "Keep irrigation bunds and canals trimmed."
        ]
    },
    "healthy crop leaf": {
        "tamil": "ஆரோக்கியமான பயிர் (Aarokkiyamana Payir)",
        "scientific_name": "Normal healthy botanical canopy",
        "crops_affected": ["Healthy vegetation"],
        "symptoms": "Vibrant uniform chlorophyll green color, intact leaf margins, no fungal spots or pest chewing.",
        "organic_remedies": [
            "Continue standard agronomic practices.",
            "Foliar spray Panchagavya 3% or Vermiwash for sustained vitality."
        ],
        "chemical_remedies": [
            "No chemical intervention required."
        ],
        "preventive_practices": [
            "Maintain soil moisture at field capacity and follow scheduled nutrient splits."
        ]
    }
}

# Government Schemes catalog tailored for India & Tamil Nadu
GOVERNMENT_SCHEMES = [
    {
        "id": "pm-kisan",
        "title": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "tamil_title": "பிரதம மந்திரி கிசான் சம்மான் நிதி",
        "category": "Direct Income Support",
        "benefit": "₹6,000 per year in 3 four-monthly installments of ₹2,000 directly into Aadhaar-linked bank accounts.",
        "eligibility": {
            "max_land_ha": 999,
            "applicable_crops": ["All crops"],
            "states": ["All India", "Tamil Nadu"]
        },
        "documents_required": ["Aadhaar Card", "Land Patta / Chitta", "Bank Passbook with NPCI Aadhaar seeding"],
        "application_mode": "Online via pmkisan.gov.in or CSC / Village VLE",
        "official_url": "https://pmkisan.gov.in"
    },
    {
        "id": "pmfby",
        "title": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
        "tamil_title": "பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
        "category": "Crop Insurance",
        "benefit": "Comprehensive risk insurance cover against drought, flood, pests, and localized calamities. Premium rate only 2% for Kharif, 1.5% for Rabi crops.",
        "eligibility": {
            "max_land_ha": 999,
            "applicable_crops": ["Rice", "Cotton", "Maize", "Groundnut", "Sugarcane", "Pulses"],
            "states": ["All India", "Tamil Nadu"]
        },
        "documents_required": ["Land Adangal / Cultivation Certificate from VAO", "Aadhaar Card", "Sowing Declaration"],
        "application_mode": "Through Primary Agricultural Co-operative Societies (PACS) or Banks",
        "official_url": "https://pmfby.gov.in"
    },
    {
        "id": "kalaignar-scheme",
        "title": "Kalaignar's All Village Integrated Agriculture Development Programme",
        "tamil_title": "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்",
        "category": "Tamil Nadu State Special Scheme",
        "benefit": "Distribution of certified quality seed kits, coconut seedlings, horticultural plant saplings, tarpaulins, power sprayers, and development of fallow lands into cultivable land.",
        "eligibility": {
            "max_land_ha": 5.0,
            "applicable_crops": ["Paddy", "Millets", "Pulses", "Oilseeds", "Vegetables"],
            "states": ["Tamil Nadu"]
        },
        "documents_required": ["Farmer ID / Uzhavan App Registration", "Patta / Chitta", "Aadhaar Card"],
        "application_mode": "Block Agricultural Extension Centre / Uzhavan App",
        "official_url": "https://www.tnagrisnet.tn.gov.in"
    },
    {
        "id": "micro-irrigation",
        "title": "Tamil Nadu Micro Irrigation Scheme (Drip & Sprinkler Subsidy)",
        "tamil_title": "நுண் பாசன திட்டம் (சொட்டு நீர் மற்றும் தெளிப்பு நீர் பாசனம்)",
        "category": "Irrigation Infrastructure",
        "benefit": "100% subsidy for Small & Marginal farmers (up to 5 acres) and 75% subsidy for other category farmers for drip/sprinkler system installation.",
        "eligibility": {
            "max_land_ha": 10.0,
            "applicable_crops": ["Sugarcane", "Banana", "Vegetables", "Cotton", "Coconut", "Maize"],
            "states": ["Tamil Nadu"]
        },
        "documents_required": ["Chitta / Patta", "FMB Sketch", "Soil & Water Test Report", "Aadhaar Card"],
        "application_mode": "Horticulture & Agricultural Engineering Department",
        "official_url": "https://tnhorticulture.tn.gov.in"
    },
    {
        "id": "kcc",
        "title": "Kisan Credit Card (KCC) Concessional Loan",
        "tamil_title": "கிசான் கடன் அட்டை (KCC)",
        "category": "Institutional Credit",
        "benefit": "Collateral-free agricultural production credit up to ₹1.60 Lakh at effective interest rate of 4% per annum (with prompt repayment 3% interest subvention).",
        "eligibility": {
            "max_land_ha": 999,
            "applicable_crops": ["All crops", "Dairy / Livestock", "Fisheries"],
            "states": ["All India", "Tamil Nadu"]
        },
        "documents_required": ["Land Revenue Records", "Aadhaar Card", "Voter ID / PAN"],
        "application_mode": "Commercial Banks / Co-operative Banks / Rural Banks",
        "official_url": "https://agricoop.nic.in"
    },
    {
        "id": "kuruvai-package",
        "title": "Tamil Nadu Kuruvai Cultivation Special Package",
        "tamil_title": "குறுவை சாகுபடி சிறப்பு தொகுப்பு திட்டம்",
        "category": "Cauvery Delta Input Support",
        "benefit": "100% subsidized certified paddy seeds, chemical fertilizers (Urea 45 kg, DAP 50 kg, MOP 25 kg per acre) and micro-nutrient kits for delta farmers.",
        "eligibility": {
            "max_land_ha": 3.0,
            "applicable_crops": ["Rice"],
            "states": ["Tamil Nadu"]
        },
        "documents_required": ["Delta District Certificate", "Uzhavan ID", "Patta"],
        "application_mode": "Primary Agricultural Co-operative Bank / Agri Extension Centre",
        "official_url": "https://www.tnagrisnet.tn.gov.in"
    }
]

# Circular Agricultural Waste Intelligence Database
WASTE_INTELLIGENCE_DATA = [
    {
        "waste_type": "Paddy Straw (Stubble)",
        "tamil": "நெல் வைக்கோல் (Nel Vaikkol)",
        "quantity_per_acre_tons": 2.5,
        "conversions": [
            {
                "pathway": "Oyster Mushroom Cultivation (சிப்பி காளான்)",
                "process": "Pasteurized straw beds inoculated with Pleurotus spawn",
                "investment_rs": 4500,
                "gross_revenue_rs": 18000,
                "net_profit_rs": 13500,
                "time_days": 25,
                "market_demand": "High in urban and local markets"
            },
            {
                "pathway": "Enriched Cattle Feed with Urea Treatment",
                "process": "Treat dry straw with 4% urea spray and stack airtight for 21 days to boost crude protein from 3.5% to 8.5%",
                "investment_rs": 1200,
                "gross_revenue_rs": 6000,
                "net_profit_rs": 4800,
                "time_days": 21,
                "market_demand": "High among local dairy farmers"
            },
            {
                "pathway": "In-situ Waste Decomposer Microbial Composting",
                "process": "Spray ICAR / National Centre for Organic Farming microbial consortium to convert straw to rich humus without burning",
                "investment_rs": 800,
                "gross_revenue_rs": 4500,
                "net_profit_rs": 3700,
                "time_days": 30,
                "market_demand": "On-farm fertility enhancement saving chemical fertilizers"
            }
        ]
    },
    {
        "waste_type": "Sugarcane Bagasse & Trash",
        "tamil": "கரும்பு சக்கை மற்றும் சோகை (Karumbu Sakkai)",
        "quantity_per_acre_tons": 4.0,
        "conversions": [
            {
                "pathway": "Biochar / Soil Carbon Conditioner",
                "process": "Pyrolysis in simple drum kilns to yield high-surface area biochar",
                "investment_rs": 3000,
                "gross_revenue_rs": 14000,
                "net_profit_rs": 11000,
                "time_days": 5,
                "market_demand": "Organic farming inputs and potting soil mixes"
            },
            {
                "pathway": "Compressed Biomass Briquettes / Pellets",
                "process": "Shredding and mechanical pressing into industrial fuel pellets",
                "investment_rs": 3500,
                "gross_revenue_rs": 12000,
                "net_profit_rs": 8500,
                "time_days": 7,
                "market_demand": "Industrial boilers and brick kilns"
            }
        ]
    },
    {
        "waste_type": "Banana Pseudo-Stem & Leaves",
        "tamil": "வாழை தண்டு மற்றும் இலை கழிவு (Vazhai Thandu)",
        "quantity_per_acre_tons": 8.0,
        "conversions": [
            {
                "pathway": "Banana Natural Fiber Extraction",
                "process": "Mechanical raspador decortication to produce high tensile natural textile & rope fiber",
                "investment_rs": 6000,
                "gross_revenue_rs": 24000,
                "net_profit_rs": 18000,
                "time_days": 10,
                "market_demand": "Handicrafts, eco-textiles, and biodegradable packaging"
            },
            {
                "pathway": "Banana Sap Enriched Liquid Bio-Fertilizer",
                "process": "Collect stem sap rich in potassium and micronutrients; ferment with jaggery",
                "investment_rs": 1500,
                "gross_revenue_rs": 7500,
                "net_profit_rs": 6000,
                "time_days": 15,
                "market_demand": "High potassium organic foliar spray"
            }
        ]
    },
    {
        "waste_type": "Dairy Cow Dung & Farmyard Slurry",
        "tamil": "சாணம் மற்றும் பண்ணை கழிவு (Saanam)",
        "quantity_per_acre_tons": 5.0,
        "conversions": [
            {
                "pathway": "Anaerobic Biogas + Enriched Bio-Slurry",
                "process": "Anaerobic digester producing clean cooking methane gas + pathogen-free nitrogen-rich liquid fertilizer",
                "investment_rs": 8000,
                "gross_revenue_rs": 22000,
                "net_profit_rs": 14000,
                "time_days": 40,
                "market_demand": "Household cooking energy savings and organic farm fertilizer"
            },
            {
                "pathway": "Eisenia fetida Vermicomposting",
                "process": "Earthworm bed decomposing dung + crop residue into dark vermicastings",
                "investment_rs": 3500,
                "gross_revenue_rs": 16000,
                "net_profit_rs": 12500,
                "time_days": 45,
                "market_demand": "Retails at ₹8 - ₹12 per kg to home gardeners & nurseries"
            }
        ]
    }
]
