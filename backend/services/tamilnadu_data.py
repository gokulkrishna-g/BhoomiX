"""
BhoomiX - Comprehensive Tamil Nadu Agricultural and Geographic Database
Contains detailed, real agricultural data for all 38 districts of Tamil Nadu:
- Agro-Climatic Zone classification (TNAU)
- Geo-coordinates (lat, lon) for live weather retrieval
- Cultivable land area (hectares)
- Major crops cultivated
- Primary soil types
- Major irrigation sources
- Key agricultural characteristics & GI tags
"""

TAMIL_NADU_DISTRICTS = {
    "Ariyalur": {
        "tamil": "அரியலூர்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 11.1401,
        "lon": 79.0786,
        "cultivable_area_ha": 115000,
        "major_crops": ["Paddy", "Sugarcane", "Cashew", "Cotton", "Maize"],
        "soil_types": ["Red loam", "Black cotton soil", "Clayey loam"],
        "irrigation_sources": ["Borewells", "Tanks", "Canal tributaries"],
        "characteristics": "Major cashew and cement-limestone belt with rainfed maize and cotton in upland tracts."
    },
    "Chengalpattu": {
        "tamil": "செங்கல்பட்டு",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.6819,
        "lon": 79.9836,
        "cultivable_area_ha": 98000,
        "major_crops": ["Paddy", "Groundnut", "Watermelon", "Pulses", "Vegetables"],
        "soil_types": ["Coastal alluvium", "Red sandy loam"],
        "irrigation_sources": ["Palaiyar River basin", "Eris (Tanks)", "Wells"],
        "characteristics": "Intensive peri-urban horticulture and tank-irrigated paddy cultivation."
    },
    "Chennai": {
        "tamil": "சென்னை",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 13.0827,
        "lon": 80.2707,
        "cultivable_area_ha": 450,
        "major_crops": ["Urban Horticulture", "Rooftop Vegetables", "Hydroponics"],
        "soil_types": ["Coastal sand", "Alluvium"],
        "irrigation_sources": ["Municipal recycled water", "Groundwater"],
        "characteristics": "Metropolitan district with focus on vertical farming, micro-greens, and terminal agro-markets (Koyambedu)."
    },
    "Coimbatore": {
        "tamil": "கோயம்புத்தூர்",
        "zone": "Western Zone",
        "zone_tamil": "மேற்கு மண்டலம்",
        "lat": 11.0168,
        "lon": 76.9558,
        "cultivable_area_ha": 178000,
        "major_crops": ["Cotton", "Maize", "Coconut", "Tomato", "Sorghum", "Banana"],
        "soil_types": ["Black cotton soil (Regur)", "Red loam"],
        "irrigation_sources": ["Parambikulam Aliyar Project", "Bhavani canals", "Borewells"],
        "characteristics": "Textile agro-hub, headquarters of Tamil Nadu Agricultural University (TNAU), precision drip-fertigated cash crops."
    },
    "Cuddalore": {
        "tamil": "கடலூர்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 11.7480,
        "lon": 79.7714,
        "cultivable_area_ha": 218000,
        "major_crops": ["Paddy", "Sugarcane", "Cashew", "Tapioca", "Groundnut"],
        "soil_types": ["Coastal alluvium", "Red lateritic loam", "Clay loam"],
        "irrigation_sources": ["Veeranam Tank", "Gadilam River", "Pennaiyar", "Borewells"],
        "characteristics": "Panruti cashew and jackfruit capital with intensive sugarcane supplying multi-district sugar mills."
    },
    "Dharmapuri": {
        "tamil": "தர்மபுரி",
        "zone": "North Western Zone",
        "zone_tamil": "வடமேற்கு மண்டலம்",
        "lat": 12.1211,
        "lon": 78.1582,
        "cultivable_area_ha": 165000,
        "major_crops": ["Finger Millet (Ragi)", "Mango", "Tomato", "Tapioca", "Sugarcane"],
        "soil_types": ["Red sandy loam", "Lateritic gravelly soil"],
        "irrigation_sources": ["Vaniyar Dam", "Nagavathi Dam", "Rainfed tanks", "Borewells"],
        "characteristics": "Foremost producer of ragi and horticultural mango in Tamil Nadu with major vegetable trade links to Bengaluru."
    },
    "Dindigul": {
        "tamil": "திண்டுக்கல்",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 10.3673,
        "lon": 77.9803,
        "cultivable_area_ha": 192000,
        "major_crops": ["Vegetables", "Flowers (Jasmine)", "Cotton", "Maize", "Kodaikanal Garlic"],
        "soil_types": ["Red loam", "Hill soil (Kodaikanal)", "Black soil"],
        "irrigation_sources": ["Palar-Porandalar Dam", "Kamarajar Dam", "Wells"],
        "characteristics": "Famous for GI-tagged Kodaikanal Hill Garlic, Odduchatram commercial vegetable mandi, and floriculture."
    },
    "Erode": {
        "tamil": "ஈரோடு",
        "zone": "Western Zone",
        "zone_tamil": "மேற்கு மண்டலம்",
        "lat": 11.3410,
        "lon": 77.7172,
        "cultivable_area_ha": 182000,
        "major_crops": ["Turmeric", "Sugarcane", "Paddy", "Banana", "Tapioca"],
        "soil_types": ["Red gravelly loam", "Alluvial river basin"],
        "irrigation_sources": ["Bhavanisagar Dam", "Kalingarayan Canal", "Lower Bhavani Project"],
        "characteristics": "'Yellow City' of India, world-renowned for GI-tagged Erode Turmeric and ancient Kalingarayan irrigation network."
    },
    "Kallakurichi": {
        "tamil": "கள்ளக்குறிச்சி",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 11.7384,
        "lon": 78.9639,
        "cultivable_area_ha": 172000,
        "major_crops": ["Paddy", "Sugarcane", "Maize", "Blackgram", "Groundnut"],
        "soil_types": ["Red loam", "Black soil", "Alluvial"],
        "irrigation_sources": ["Gomukhi Dam", "Manimuktha Dam", "Borewells"],
        "characteristics": "'Sugar City' of northern Tamil Nadu, with Kalrayan hills agro-forestry and intensive grain-pulses cropping."
    },
    "Kanchipuram": {
        "tamil": "காஞ்சிபுரம்",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.8342,
        "lon": 79.7036,
        "cultivable_area_ha": 110000,
        "major_crops": ["Paddy", "Groundnut", "Sugarcane", "Watermelon"],
        "soil_types": ["Red loam", "Clayey alluvium"],
        "irrigation_sources": ["Palaiyar River basin", "System Eris (Tanks)", "Borewells"],
        "characteristics": "Historically famous 'District of Thousand Tanks' with high-yielding paddy varieties like ADT 43 and CR 1009."
    },
    "Kanyakumari": {
        "tamil": "கன்னியாகுமரி",
        "zone": "High Rainfall Zone",
        "zone_tamil": "அதிக மழைப்பொழிவு மண்டலம்",
        "lat": 8.0883,
        "lon": 77.5385,
        "cultivable_area_ha": 78000,
        "major_crops": ["Rubber", "Coconut", "Banana (Matti)", "Paddy", "Cloves"],
        "soil_types": ["Deep red lateritic soil", "Coastal alluvium"],
        "irrigation_sources": ["Pechiparai Dam", "Perunchani Dam", "Bimonsoon rains"],
        "characteristics": "Receives both SW and NE monsoons (~1450 mm), GI-tagged Matti Banana, spices, and prime rubber plantations."
    },
    "Karur": {
        "tamil": "கரூர்",
        "zone": "Western Zone",
        "zone_tamil": "மேற்கு மண்டலம்",
        "lat": 10.9601,
        "lon": 78.0766,
        "cultivable_area_ha": 125000,
        "major_crops": ["Sugarcane", "Paddy", "Banana", "Moringa", "Sorghum"],
        "soil_types": ["Red loam", "Alluvial delta fringe"],
        "irrigation_sources": ["Cauvery River channels", "Amaravathi basin", "Borewells"],
        "characteristics": "Confluence of Cauvery and Amaravathi rivers; major moringa (drumstick) export corridor."
    },
    "Krishnagiri": {
        "tamil": "கிருஷ்ணகிரி",
        "zone": "North Western Zone",
        "zone_tamil": "வடமேற்கு மண்டலம்",
        "lat": 12.5186,
        "lon": 78.2137,
        "cultivable_area_ha": 185000,
        "major_crops": ["Mango", "Ragi", "Rose Flowers (Hosur)", "Tomato", "Paddy"],
        "soil_types": ["Red sandy loam", "Laterite soil"],
        "irrigation_sources": ["Krishnagiri Reservoir Project (KRP)", "Thenpennai River"],
        "characteristics": "The Mango capital of India and Hosur hi-tech greenhouse floriculture hub exporting Dutch roses globally."
    },
    "Madurai": {
        "tamil": "மதுரை",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 9.9252,
        "lon": 78.1198,
        "cultivable_area_ha": 145000,
        "major_crops": ["Paddy", "Jasmine (Madurai Malli)", "Millets", "Cotton", "Pulses"],
        "soil_types": ["Deep red loam", "Black cotton soil"],
        "irrigation_sources": ["Periyar-Vaigai Canal System", "Tanks", "Borewells"],
        "characteristics": "Home to the world-famous GI-tagged 'Madurai Malli' jasmine and extensive double-crop Vaigai paddy basin."
    },
    "Mayiladuthurai": {
        "tamil": "மயிலாடுதுறை",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 11.1075,
        "lon": 79.6524,
        "cultivable_area_ha": 94000,
        "major_crops": ["Paddy (Kuruvai / Samba)", "Blackgram", "Cotton", "Greengram"],
        "soil_types": ["Heavy alluvial clay", "Delta river silt"],
        "irrigation_sources": ["Cauvery distributaries", "Kollidam (Coleroon) River"],
        "characteristics": "Heartland of the Cauvery delta rice bowl with intensive rice-fallow pulse cropping system."
    },
    "Nagapattinam": {
        "tamil": "நாகப்பட்டினம்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 10.7672,
        "lon": 79.8449,
        "cultivable_area_ha": 86000,
        "major_crops": ["Paddy", "Groundnut", "Pulses", "Coconut"],
        "soil_types": ["Coastal delta alluvium", "Saline coastal sands"],
        "irrigation_sources": ["Vennar basin", "Cauvery tail-end channels"],
        "characteristics": "Coastal tail-end Cauvery delta with specialized flood-tolerant and coastal saline-tolerant rice varieties."
    },
    "Namakkal": {
        "tamil": "நாமக்கல்",
        "zone": "North Western Zone",
        "zone_tamil": "வடமேற்கு மண்டலம்",
        "lat": 11.2189,
        "lon": 78.1674,
        "cultivable_area_ha": 138000,
        "major_crops": ["Tapioca", "Maize", "Groundnut", "Paddy", "Turmeric"],
        "soil_types": ["Red loam", "Gravelly clay"],
        "irrigation_sources": ["Cauvery channels (Jedarpalayam)", "Deep borewells"],
        "characteristics": "'Poultry & Egg Capital' of India, leading sago/tapioca starch processing and Kolli Hills organic pepper."
    },
    "Nilgiris": {
        "tamil": "நீலகிரி",
        "zone": "Hilly and High Altitude Zone",
        "zone_tamil": "மலை மற்றும் உயர் மண்டலம்",
        "lat": 11.4102,
        "lon": 76.6950,
        "cultivable_area_ha": 58000,
        "major_crops": ["Tea", "Coffee", "Potato", "Carrot", "Cabbage", "Spices"],
        "soil_types": ["Lateritic mountain soil", "Humus-rich forest loam"],
        "irrigation_sources": ["High mountain precipitation", "Springs", "Micro-sprinklers"],
        "characteristics": "GI-tagged Nilgiri Orthodox Tea, temperate European vegetables, and terraced agro-ecosystems at 2000m altitude."
    },
    "Perambalur": {
        "tamil": "பெரம்பலூர்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 11.2342,
        "lon": 78.8820,
        "cultivable_area_ha": 102000,
        "major_crops": ["Small Onion (Shallots)", "Cotton", "Maize", "Sugarcane"],
        "soil_types": ["Black cotton soil", "Red sandy loam"],
        "irrigation_sources": ["Rainfed check dams", "Deep open wells", "Borewells"],
        "characteristics": "'Onion Bowl of Tamil Nadu', cultivating over 70% of the state's traditional sambar small onions."
    },
    "Pudukkottai": {
        "tamil": "புதுக்கோட்டை",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 10.3797,
        "lon": 78.8208,
        "cultivable_area_ha": 154000,
        "major_crops": ["Paddy", "Groundnut", "Cashew", "Millets", "Coconut"],
        "soil_types": ["Red laterite loam", "Sandy clay"],
        "irrigation_sources": ["Vellar basin", "Cascade tanks (Ooranis)", "Borewells"],
        "characteristics": "Ancient heritage of tank cascades with thriving dryland groundnut and coastal coconut plantations."
    },
    "Ramanathapuram": {
        "tamil": "ராமநாதபுரம்",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 9.3639,
        "lon": 78.8395,
        "cultivable_area_ha": 168000,
        "major_crops": ["Paddy (Direct-seeded)", "Mundu Chilli", "Cotton", "Pulses", "Coconut"],
        "soil_types": ["Coastal alluvium", "Saline clay", "Black cotton soil"],
        "irrigation_sources": ["Vaigai tail-end", "Gundar basin", "System tanks"],
        "characteristics": "Home to the world-famous GI-tagged 'Ramnad Mundu Chilli' and resilient direct-seeded dryland rice farming."
    },
    "Ranipet": {
        "tamil": "ராணிப்பேட்டை",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.9224,
        "lon": 79.3328,
        "cultivable_area_ha": 92000,
        "major_crops": ["Paddy", "Sugarcane", "Groundnut", "Banana", "Vegetables"],
        "soil_types": ["Red loam", "Alluvial river clay"],
        "irrigation_sources": ["Palar anicut canals", "Tanks", "Borewells"],
        "characteristics": "Thriving Palar river basin agro-tract cultivating certified organic rice and sugarcane."
    },
    "Salem": {
        "tamil": "சேலம்",
        "zone": "North Western Zone",
        "zone_tamil": "வடமேற்கு மண்டலம்",
        "lat": 11.6643,
        "lon": 78.1460,
        "cultivable_area_ha": 196000,
        "major_crops": ["Mango (Malgoa/Salem)", "Tapioca", "Coffee (Yercaud)", "Paddy", "Cotton"],
        "soil_types": ["Red loam", "Lateritic gravel", "Black soil"],
        "irrigation_sources": ["Mettur Dam canals", "Stanley Reservoir", "Borewells"],
        "characteristics": "Famous for Salem Mangoes, Shevaroy hills coffee plantations, and extensive tapioca/sago processing mills."
    },
    "Sivaganga": {
        "tamil": "சிவகங்கை",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 9.8433,
        "lon": 78.4809,
        "cultivable_area_ha": 132000,
        "major_crops": ["Paddy", "Groundnut", "Sugarcane", "Millets", "Pulses"],
        "soil_types": ["Red sandy loam", "Laterite clay"],
        "irrigation_sources": ["Vaigai canals", "Large irrigation tanks (Kanmois)"],
        "characteristics": "Vast system of ancient irrigation tanks (Kanmois) supporting resilient local red paddy varieties."
    },
    "Tenkasi": {
        "tamil": "தென்காசி",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 8.9593,
        "lon": 77.3150,
        "cultivable_area_ha": 118000,
        "major_crops": ["Paddy", "Banana", "Coconut", "Pepper", "Sugarcane", "Spices"],
        "soil_types": ["Rich alluvial foothills loam", "Red loam"],
        "irrigation_sources": ["Chittar River", "Manimuthar channels", "Mountain streams"],
        "characteristics": "Western Ghats foothill micro-climate blessed with the Courtallam southwest monsoon drizzle (Saaral)."
    },
    "Thanjavur": {
        "tamil": "தஞ்சாவூர்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 10.7870,
        "lon": 79.1378,
        "cultivable_area_ha": 268000,
        "major_crops": ["Paddy (Kuruvai, Samba, Thaladi)", "Blackgram", "Coconut", "Banana", "Sugarcane"],
        "soil_types": ["Deep fertile delta alluvium", "Clay loam"],
        "irrigation_sources": ["Grand Anicut (Kallanai)", "Cauvery & Vennar Canal Network", "Filter points"],
        "characteristics": "'Rice Bowl of Tamil Nadu', heart of the ancient Chola irrigation marvel Kallanai; highest paddy production in the state."
    },
    "Theni": {
        "tamil": "தேனி",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 10.0104,
        "lon": 77.4768,
        "cultivable_area_ha": 112000,
        "major_crops": ["Cardamom", "Coffee", "Grapes (Cumbum Valley)", "Banana", "Paddy", "Silk (Sericulture)"],
        "soil_types": ["Rich black loam", "Laterite hill valley soil"],
        "irrigation_sources": ["Mullaperiyar Dam canals", "Vaigai Dam", "Suruliyar River"],
        "characteristics": "Cumbum Valley yields year-round harvests of GI-tagged Panneer Thratchai grapes and cardamom hills."
    },
    "Thoothukudi": {
        "tamil": "தூத்துக்குடி",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 8.7642,
        "lon": 78.1348,
        "cultivable_area_ha": 175000,
        "major_crops": ["Cotton", "Chillies", "Blackgram", "Banana", "Paddy", "Salt Pan Agriculture"],
        "soil_types": ["Deep black cotton soil (Karisal)", "Coastal sand"],
        "irrigation_sources": ["Thamirabarani River delta", "Borewells"],
        "characteristics": "Celebrated for Karisal black soil pulses, direct Thamira-barani river delta banana plantations, and palmyrah agro-products."
    },
    "Tiruchirappalli": {
        "tamil": "திருச்சிராப்பள்ளி",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 10.7905,
        "lon": 78.7047,
        "cultivable_area_ha": 195000,
        "major_crops": ["Paddy", "Banana", "Sugarcane", "Onion", "Cotton"],
        "soil_types": ["Alluvial river basin", "Red loam"],
        "irrigation_sources": ["Cauvery & Kollidam rivers", "Uyyakondan Canal", "Pannaiyar"],
        "characteristics": "National Research Centre for Banana (NRCB), central logistical gateway for delta and western agro-produce."
    },
    "Tirunelveli": {
        "tamil": "திருநெல்வேலி",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 8.7139,
        "lon": 77.7567,
        "cultivable_area_ha": 156000,
        "major_crops": ["Paddy", "Banana", "Pulses", "Coconut", "Cotton"],
        "soil_types": ["Thamirabarani alluvial loam", "Deep black cotton soil"],
        "irrigation_sources": ["Thamirabarani River canal network", "Manimuthar Dam", "Papanasam Dam"],
        "characteristics": "Perennial Thamirabarani river basin yielding premier organic aromatic and traditional rice varieties."
    },
    "Tirupathur": {
        "tamil": "திருப்பத்தூர்",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.4965,
        "lon": 78.5736,
        "cultivable_area_ha": 88000,
        "major_crops": ["Paddy", "Groundnut", "Sugarcane", "Tomato", "Mango"],
        "soil_types": ["Red gravelly loam", "Sandy loam"],
        "irrigation_sources": ["Javadhu Hills spring cascades", "Tanks", "Borewells"],
        "characteristics": "Javadhu Hills tribal organic fruit orchards, millets, and Palar river basin groundnut belt."
    },
    "Tiruppur": {
        "tamil": "திருப்பூர்",
        "zone": "Western Zone",
        "zone_tamil": "மேற்கு மண்டலம்",
        "lat": 11.1085,
        "lon": 77.3411,
        "cultivable_area_ha": 162000,
        "major_crops": ["Maize", "Cotton", "Coconut", "Groundnut", "Sunflower"],
        "soil_types": ["Black cotton soil", "Red sandy loam"],
        "irrigation_sources": ["Amaravathi Dam", "PAP Project", "Borewells"],
        "characteristics": "High solar insolation, major maize and oilseeds production with integrated poultry and dairy feed networks."
    },
    "Tiruvallur": {
        "tamil": "திருவள்ளூர்",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 13.1432,
        "lon": 79.9083,
        "cultivable_area_ha": 135000,
        "major_crops": ["Paddy", "Sugarcane", "Groundnut", "Watermelon", "Mango"],
        "soil_types": ["Coastal alluvium", "Red sandy loam"],
        "irrigation_sources": ["Poondi Reservoir", "Kosasthalaiyar River", "Araniyar basin"],
        "characteristics": "Prime grain and vegetable supplier to the Chennai metropolis with intensive groundwater drip automation."
    },
    "Tiruvannamalai": {
        "tamil": "திருவண்ணாமலை",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.2253,
        "lon": 79.0747,
        "cultivable_area_ha": 235000,
        "major_crops": ["Groundnut", "Paddy", "Sugarcane", "Millets (Samai, Varagu)"],
        "soil_types": ["Red sandy loam", "Lateritic gravelly soil"],
        "irrigation_sources": ["Sathanur Dam", "Thenpennaiyar River", "Cascade tanks"],
        "characteristics": "Premier Groundnut hub of Tamil Nadu; extensive millets cultivation and Sathanur Dam command area."
    },
    "Tiruvarur": {
        "tamil": "திருவாரூர்",
        "zone": "Cauvery Delta Zone",
        "zone_tamil": "காவிரி டெல்டா மண்டலம்",
        "lat": 10.7725,
        "lon": 79.6365,
        "cultivable_area_ha": 164000,
        "major_crops": ["Paddy (Kuruvai / Samba / Thaladi)", "Blackgram", "Greengram", "Cotton"],
        "soil_types": ["Deep fertile delta clay", "River alluvium"],
        "irrigation_sources": ["Vennar, Vettar, Pamaniyar distributary canals"],
        "characteristics": "Dense river canal delta, traditional epicenter of intensive paddy cultivation with zero-till relay pulses."
    },
    "Vellore": {
        "tamil": "வேலூர்",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 12.9165,
        "lon": 79.1325,
        "cultivable_area_ha": 75000,
        "major_crops": ["Spiny Brinjal (GI-Vellore)", "Paddy", "Groundnut", "Sugarcane", "Banana"],
        "soil_types": ["Red loam", "Sandy clay"],
        "irrigation_sources": ["Palar River basin", "Otteri Lake", "Borewells"],
        "characteristics": "GI-tagged Vellore Spiny Brinjal (முள்ளுக் கத்தரிக்காய்) and intensive smallholder poly-house horticulture."
    },
    "Viluppuram": {
        "tamil": "விழுப்புரம்",
        "zone": "North Eastern Zone",
        "zone_tamil": "வடகிழக்கு மண்டலம்",
        "lat": 11.9401,
        "lon": 79.4861,
        "cultivable_area_ha": 245000,
        "major_crops": ["Sugarcane", "Paddy", "Groundnut", "Tapioca", "Casuarina"],
        "soil_types": ["Red sandy loam", "Black cotton soil", "Alluvium"],
        "irrigation_sources": ["Thenpennaiyar River", "Gingee River", "System tanks"],
        "characteristics": "Top sugarcane producing district in Tamil Nadu, hosting leading cooperative and private sugar mills."
    },
    "Virudhunagar": {
        "tamil": "விருதுநகர்",
        "zone": "Southern Zone",
        "zone_tamil": "தெற்கு மண்டலம்",
        "lat": 9.5872,
        "lon": 77.9514,
        "cultivable_area_ha": 162000,
        "major_crops": ["Cotton", "Millets (Maize, Cumbu)", "Chillies", "Blackgram", "Oilseeds"],
        "soil_types": ["Deep black cotton soil (Karisal)", "Red loam"],
        "irrigation_sources": ["Arjunanadhi basin", "Gundar channels", "Rainfed tanks"],
        "characteristics": "Famous for dryland Karisal agriculture, ginning mills, and high-pungency red chilli export farming."
    }
}

# Agro-Climatic Zones of Tamil Nadu
TAMIL_NADU_AGRO_ZONES = {
    "Cauvery Delta Zone": {
        "tamil": "காவிரி டெல்டா மண்டலம்",
        "color": "#10b981", # Emerald
        "districts": ["Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai", "Cuddalore", "Tiruchirappalli", "Pudukkottai", "Ariyalur", "Perambalur"],
        "rainfall_annual_mm": 950,
        "primary_crops": "Paddy, Pulses (Blackgram, Greengram), Sugarcane, Banana",
        "characteristics": "Fertile alluvial plains fed by Cauvery and Kollidam canals."
    },
    "North Eastern Zone": {
        "tamil": "வடகிழக்கு மண்டலம்",
        "color": "#3b82f6", # Blue
        "districts": ["Kanchipuram", "Chengalpattu", "Tiruvallur", "Vellore", "Ranipet", "Tirupathur", "Tiruvannamalai", "Viluppuram", "Kallakurichi", "Chennai"],
        "rainfall_annual_mm": 1105,
        "primary_crops": "Paddy, Groundnut, Sugarcane, Millets",
        "characteristics": "Dominated by tanks (Eris) and Palar/Pennaiyar river basins; high Northeast monsoon rainfall."
    },
    "Western Zone": {
        "tamil": "மேற்கு மண்டலம்",
        "color": "#f59e0b", # Amber
        "districts": ["Coimbatore", "Tiruppur", "Erode", "Karur"],
        "rainfall_annual_mm": 718,
        "primary_crops": "Cotton, Turmeric, Maize, Sugarcane, Coconut",
        "characteristics": "Semi-arid plateaus with advanced micro-irrigation and intensive commercial agriculture."
    },
    "North Western Zone": {
        "tamil": "வடமேற்கு மண்டலம்",
        "color": "#8b5cf6", # Purple
        "districts": ["Dharmapuri", "Krishnagiri", "Salem", "Namakkal"],
        "rainfall_annual_mm": 875,
        "primary_crops": "Ragi, Mango, Tomato, Tapioca, Coffee",
        "characteristics": "Highland drylands and hilly terrain; leading mango and ragi belt."
    },
    "Southern Zone": {
        "tamil": "தெற்கு மண்டலம்",
        "color": "#ef4444", # Red
        "districts": ["Madurai", "Dindigul", "Sivaganga", "Ramanathapuram", "Virudhunagar", "Tirunelveli", "Tenkasi", "Thoothukudi", "Theni"],
        "rainfall_annual_mm": 857,
        "primary_crops": "Cotton, Chillies, Millets, Pulses, Jasmine, Grapes",
        "characteristics": "Semi-arid Karisal (black soil) tract and Vaigai/Thamirabarani river basins."
    },
    "High Rainfall Zone": {
        "tamil": "அதிக மழைப்பொழிவு மண்டலம்",
        "color": "#06b6d4", # Cyan
        "districts": ["Kanyakumari"],
        "rainfall_annual_mm": 1450,
        "primary_crops": "Rubber, Coconut, Banana (Matti), Spices",
        "characteristics": "Bi-monsoonal coastal and Western Ghats tropical rainfed agriculture."
    },
    "Hilly and High Altitude Zone": {
        "tamil": "மலை மற்றும் உயர் மண்டலம்",
        "color": "#14532d", # Dark Green
        "districts": ["Nilgiris"],
        "rainfall_annual_mm": 1600,
        "primary_crops": "Tea, Coffee, Hill Vegetables (Carrot, Potato), Spices",
        "characteristics": "High-altitude mountainous terrain with temperate horticulture and tea estates."
    }
}
