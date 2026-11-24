// BhoomiX - Tamil Nadu Region-Specific Crop Cultivation Guides
// Sourced from TNAU Agritech Portal & Department of Agriculture, Tamil Nadu

export interface CropCultivationGuide {
  id: string;
  name: string;
  name_ta: string;
  category: 'Cereal' | 'Cash Crop' | 'Horticulture' | 'Oilseed' | 'Millet' | 'Spice';
  duration_days: string;
  duration_days_ta: string;
  suitable_districts: string[];
  key_varieties: string[];
  seasons: string[];
  seasons_ta: string[];
  soil_suitability: string;
  soil_suitability_ta: string;
  water_requirement_mm: number;
  expected_yield_per_acre: string;
  expected_yield_per_acre_ta: string;
  mandi_price_approx: string;
  seed_rate_per_acre: string;
  spacing: string;
  fertilizer_recommendation: {
    basal: string;
    basal_ta: string;
    top_dressing_1: string;
    top_dressing_1_ta: string;
    top_dressing_2: string;
    top_dressing_2_ta: string;
  };
  organic_practices: string[];
  organic_practices_ta: string[];
  major_pests_and_remedies: Array<{
    pest: string;
    pest_ta: string;
    symptoms: string;
    symptoms_ta: string;
    organic_remedy: string;
    organic_remedy_ta: string;
  }>;
}

export const TAMIL_NADU_CROP_GUIDES: CropCultivationGuide[] = [
  {
    id: "paddy",
    name: "Paddy / Rice (நெல்)",
    name_ta: "நெல் (காவிரி டெல்டா & நஞ்சை பயிர்)",
    category: "Cereal",
    duration_days: "105 - 135 Days (Variety Dependent)",
    duration_days_ta: "105 முதல் 135 நாட்கள் (ரகம் சார்ந்தது)",
    suitable_districts: ["Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai", "Cuddalore", "Tiruchirappalli", "Pudukkottai", "Kanchipuram", "Tirunelveli"],
    key_varieties: ["CO 51 (105 days)", "ADT 43 (110 days)", "ADT 45 (110 days)", "CR 1009 Sub 1 (150 days flood-tolerant)", "BPT 5204 / Samba Masuri (140 days)"],
    seasons: ["Kuruvai (June-July)", "Samba (August-September)", "Thaladi (September-October)", "Navarai (Dec-Jan)"],
    seasons_ta: ["குறுவை (ஜூன்-ஜூலை)", "சம்பா (ஆகஸ்ட்-செப்டம்பர்)", "தாளடி (செப்-அக்)", "நவரை (டிச-ஜன)"],
    soil_suitability: "Heavy alluvial clay, clay loam, and delta river silt with pH 6.0 to 7.5.",
    soil_suitability_ta: "களிமண், வண்டல் மண், மற்றும் களி கலந்த வண்டல் மண் (pH 6.0 முதல் 7.5).",
    water_requirement_mm: 1250,
    expected_yield_per_acre: "24 - 32 Bags (75kg bag) / ~2,200 - 2,800 kg",
    expected_yield_per_acre_ta: "ஏக்கருக்கு 24 முதல் 32 மூட்டைகள் (75 கிலோ மூட்டை)",
    mandi_price_approx: "₹2,360 - ₹2,450 / Quintal (Govt MSP)",
    seed_rate_per_acre: "12 - 15 kg for SRI single seedling / 30 kg for conventional",
    spacing: "25 x 25 cm (SRI) or 15 x 10 cm (Conventional)",
    fertilizer_recommendation: {
      basal: "DAP 50 kg + MOP 15 kg + Zinc Sulphate 10 kg per acre",
      basal_ta: "டிஏபி 50 கிலோ + பொட்டாஷ் 15 கிலோ + ஜிங்க் சல்பேட் 10 கிலோ அடியுரமாக இடவும்",
      top_dressing_1: "Urea 30 kg + MOP 15 kg at active tillering (20-25 DAT)",
      top_dressing_1_ta: "தூர்கட்டும் பருவத்தில் யூரியா 30 கிலோ + பொட்டாஷ் 15 கிலோ",
      top_dressing_2: "Urea 20 kg at panicle initiation (40-45 DAT)",
      top_dressing_2_ta: "கதிர் வரும் பருவத்தில் யூரியா 20 கிலோ"
    },
    organic_practices: [
      "Azolla incorporation @ 200 kg/acre as bio-fertilizer and weed suppressor",
      "Panchagavya 3% foliar spray at 30, 45, and 60 days after transplanting",
      "Neem cake @ 100 kg/acre in basal soil preparation"
    ],
    organic_practices_ta: [
      "அசோலா பாசி ஏக்கருக்கு 200 கிலோ இட்டு மடக்கி உழுதல்",
      "நடவு செய்த 30, 45, 60 ஆம் நாட்களில் 3% பஞ்சகாவ்யா தெளித்தல்",
      "அடியுரத்துடன் ஏக்கருக்கு 100 கிலோ வேப்பம்பிண்ணாக்கு சேர்த்தல்"
    ],
    major_pests_and_remedies: [
      {
        pest: "Yellow Stem Borer (மஞ்சள் குருத்துப்பூச்சி)",
        pest_ta: "மஞ்சள் குருத்துப்பூச்சி",
        symptoms: "Dead hearts in vegetative stage and white heads at panicle stage.",
        symptoms_ta: "தழைப்பருவத்தில் குருத்து காய்ந்து போதல்; கதிர் பருவத்தில் வெண்கதிர் தோன்றுதல்.",
        organic_remedy: "Release Trichogramma japonicum egg parasitoid @ 2 cc/acre; install pheromone traps @ 5/acre.",
        organic_remedy_ta: "டிரைக்கோடெர்மா ஒட்டுண்ணி அட்டை ஏக்கருக்கு 2 சிசி கட்டுதல்; இனக்கவர்ச்சி பொறி 5 வைத்தல்."
      },
      {
        pest: "Leaf Folder (இலைச்சுருட்டுப்புழு)",
        pest_ta: "இலைச்சுருட்டுப்புழு",
        symptoms: "Leaves longitudinally folded with scraped green chlorophyll and white streaks.",
        symptoms_ta: "இலைகள் நீளவாக்கில் சுருட்டப்பட்டு வெண்ணிற கோடுகளுடன் பச்சையம் சுரண்டப்படுதல்.",
        organic_remedy: "Neem Seed Kernel Extract (NSKE 5%) or Bacillus thuringiensis (Bt) @ 2g/litre.",
        organic_remedy_ta: "5% வேப்பங்கொட்டை கரைசல் அல்லது பேசிலஸ் துரிஞ்சியென்சிஸ் (Bt) தெளித்தல்."
      }
    ]
  },
  {
    id: "turmeric",
    name: "Turmeric (மஞ்சள்)",
    name_ta: "ஈரோடு மஞ்சள் (பொன் விளையும் பயிர்)",
    category: "Spice",
    duration_days: "270 - 285 Days (9 Months)",
    duration_days_ta: "270 முதல் 285 நாட்கள் (9 மாதங்கள்)",
    suitable_districts: ["Erode", "Coimbatore", "Tiruppur", "Salem", "Namakkal", "Dharmapuri"],
    key_varieties: ["Erode Local (GI Tag)", "BSR 1", "BSR 2", "IISR Prathibha", "Roma"],
    seasons: ["May - June (Vaigasi - Aani pattam)"],
    seasons_ta: ["மே - ஜூன் (வைகாசி - ஆனி பட்டம்)"],
    soil_suitability: "Well-drained loose friable rich red loamy or alluvial soil with pH 6.5 - 7.5.",
    soil_suitability_ta: "நல்ல வடிகால் வசதியுள்ள இருமண் நிலம் அல்லது செம்மண் (pH 6.5 - 7.5).",
    water_requirement_mm: 1400,
    expected_yield_per_acre: "10 - 14 Quintals cured dry fingers / ~8 - 10 tonnes raw rhizomes",
    expected_yield_per_acre_ta: "ஏக்கருக்கு 10 முதல் 14 குவிண்டால் காய்ந்த விரலி மஞ்சள்",
    mandi_price_approx: "₹15,500 - ₹17,500 / Quintal (Erode Mandi)",
    seed_rate_per_acre: "800 - 1,000 kg healthy seed rhizomes with at least 2 viable eyes",
    spacing: "Broad bed and furrow (BBF) 45 x 15 cm with drip inline",
    fertilizer_recommendation: {
      basal: "FYM 10 tonnes + SSP 150 kg + MOP 30 kg + Neem cake 200 kg per acre",
      basal_ta: "மக்கிய தொழு உரம் 10 டன் + சூப்பர் பாஸ்பேட் 150 கிலோ + வேப்பம்பிண்ணாக்கு 200 கிலோ",
      top_dressing_1: "Urea 35 kg + MOP 25 kg at 30th and 60th day",
      top_dressing_1_ta: "30 மற்றும் 60 ஆம் நாட்களில் யூரியா 35 கிலோ + பொட்டாஷ் 25 கிலோ",
      top_dressing_2: "Micronutrient mixture (Zinc + Boron + Ferrous) foliar spray at 90 days",
      top_dressing_2_ta: "90 ஆம் நாளில் மஞ்சள் சிறப்பு நுண்ணூட்ட கலவை இலைவழி தெளித்தல்"
    },
    organic_practices: [
      "Green mulching with Glyricidia or subabul loppings to conserve bed moisture",
      "Bio-inoculant rhizome dip in Trichoderma viride @ 5g/kg seed before planting",
      "Jeevamrutham soil drenching every 21 days through drip irrigation"
    ],
    organic_practices_ta: [
      "சீமை அகத்தி இலைகள் கொண்டு பாத்திகளில் மூடாக்கு இடுதல்",
      "டிரைக்கோடெர்மா விரிடி கொண்டு விதைக்கிழங்கு நேர்த்தி செய்தல்",
      "21 நாட்களுக்கு ஒருமுறை சொட்டு நீர் மூலம் ஜீவாமிர்தம் பாய்ச்சுதல்"
    ],
    major_pests_and_remedies: [
      {
        pest: "Rhizome Rot / Soft Rot (கிழங்கு அழுகல் நோய்)",
        pest_ta: "கிழங்கு அழுகல் நோய்",
        symptoms: "Collar rot and foul smelling soft rotting of underground rhizomes with yellow leaves.",
        symptoms_ta: "தண்டு அடிப்பகுதி அழுகி மஞ்சள் நிறமாகி நாற்றமடித்தல்.",
        organic_remedy: "Drench Trichoderma viride or Pseudomonas @ 10g/litre along root beds; ensure complete drainage.",
        organic_remedy_ta: "சூடோமோனாஸ் அல்லது டிரைக்கோடெர்மா கரைசல் வேர்ப்பகுதியில் ஊற்றுதல்; நீர் தேங்காமல் பார்த்தல்."
      }
    ]
  },
  {
    id: "cotton",
    name: "Cotton (பருத்தி)",
    name_ta: "பருத்தி (வெள்ளை தங்கம்)",
    category: "Cash Crop",
    duration_days: "150 - 165 Days",
    duration_days_ta: "150 முதல் 165 நாட்கள்",
    suitable_districts: ["Coimbatore", "Tiruppur", "Virudhunagar", "Thoothukudi", "Perambalur", "Salem", "Madurai"],
    key_varieties: ["MCU 5", "SVPR 2", "CO 14", "Suraj", "Bt Hybrids"],
    seasons: ["August - September (Winter Irrigated) or February - March (Summer)"],
    seasons_ta: ["ஆகஸ்ட் - செப்டம்பர் (குளிர்கால பாசனம்) அல்லது பிப்ரவரி - மார்ச்"],
    soil_suitability: "Deep black cotton soil (Regur / Karisal) with high clay content and water retention.",
    soil_suitability_ta: "ஆழமான கரிசல் மண் (Regur) மற்றும் வண்டல் கலந்த செம்மண்.",
    water_requirement_mm: 750,
    expected_yield_per_acre: "8 - 12 Quintals seed cotton (Kapas)",
    expected_yield_per_acre_ta: "ஏக்கருக்கு 8 முதல் 12 குவிண்டால் பருத்தி",
    mandi_price_approx: "₹7,200 - ₹8,100 / Quintal",
    seed_rate_per_acre: "1.5 kg for Hybrids (dibbled 1 per hill)",
    spacing: "90 x 60 cm or 120 x 60 cm for paired row drip",
    fertilizer_recommendation: {
      basal: "FYM 5 tonnes + DAP 40 kg + MOP 20 kg per acre",
      basal_ta: "தொழு உரம் 5 டன் + டிஏபி 40 கிலோ + பொட்டாஷ் 20 கிலோ அடியுரமாக",
      top_dressing_1: "Urea 30 kg at square formation (45 DAS)",
      top_dressing_1_ta: "பூ மொட்டு உருவாகும் 45 ஆம் நாளில் யூரியா 30 கிலோ",
      top_dressing_2: "Urea 25 kg + MOP 15 kg at boll formation (75 DAS)",
      top_dressing_2_ta: "காய் பிடிக்கும் 75 ஆம் நாளில் யூரியா 25 கிலோ + பொட்டாஷ் 15 கிலோ"
    },
    organic_practices: [
      "Intercropping with cowpea (1 row cowpea for 4 rows cotton) as trap crop",
      "Yellow and blue sticky traps @ 10/acre for sucking pest suppression",
      "Foliar spray of 1% DAP + 1% Potassium Nitrate to prevent square shedding"
    ],
    organic_practices_ta: [
      "தட்டப்பயறு ஊடுபயிர் சாகுபடி செய்து நன்மை செய்யும் பூச்சிகளை ஈர்த்தல்",
      "மஞ்சள் மற்றும் நீல வண்ண ஒட்டுப்பொறி ஏக்கருக்கு 10 அமைத்தல்",
      "சப்பைக் கொட்டுதலை தடுக்க 1% டிஏபி கரைசல் தெளித்தல்"
    ],
    major_pests_and_remedies: [
      {
        pest: "Pink Bollworm (இளஞ்சிவப்பு காய்ப்புழு)",
        pest_ta: "இளஞ்சிவப்பு காய்ப்புழு",
        symptoms: "Rosetted flowers, premature boll opening, and stained lint inside bolls.",
        symptoms_ta: "ரோஜா போன்ற மலர்கள், காய்களில் துளைகள், பஞ்சு தரம் குறைதல்.",
        organic_remedy: "Install Pheromone traps @ 8/acre; release Trichogrammatoidea bactrae parasitoids.",
        organic_remedy_ta: "இனக்கவர்ச்சி பொறி ஏக்கருக்கு 8 வைத்தல்; பேசிலஸ் துரிஞ்சியென்சிஸ் தெளித்தல்."
      }
    ]
  },
  {
    id: "banana",
    name: "Banana (வாழை)",
    name_ta: "வாழை (முக்கனிகளில் ஒன்று)",
    category: "Horticulture",
    duration_days: "330 - 365 Days (11 - 12 Months)",
    duration_days_ta: "11 முதல் 12 மாதங்கள்",
    suitable_districts: ["Tiruchirappalli", "Theni", "Thanjavur", "Erode", "Coimbatore", "Kanyakumari", "Tirunelveli"],
    key_varieties: ["Grand Naine (Cavendish)", "Poovan", "Rasthali", "Nendran (Chips)", "Red Banana (செவ்வாழை)", "Matti (Kanyakumari GI)"],
    seasons: ["Year-round with perennial water; ideal planting February-March & July-August"],
    seasons_ta: ["ஆண்டு முழுவதும் பாசன வசதியுடன்; பிப்ரவரி-மார்ச் & ஜூலை-ஆகஸ்ட் சிறந்தது"],
    soil_suitability: "Deep rich loamy soils with continuous drainage and pH 6.5 - 7.5.",
    soil_suitability_ta: "நல்ல ஆழமான வண்டல் அல்லது இருமண் நிலம் (pH 6.5 - 7.5).",
    water_requirement_mm: 1800,
    expected_yield_per_acre: "25 - 35 Tonnes (1,000 plants/acre)",
    expected_yield_per_acre_ta: "ஏக்கருக்கு 25 முதல் 35 டன் தார் மகசூல்",
    mandi_price_approx: "₹28 - ₹38 / kg (Farmgate wholesale)",
    seed_rate_per_acre: "1,000 sword suckers or tissue culture plantlets",
    spacing: "1.8 x 1.8 m (Grand Naine) or 2.1 x 2.1 m (Poovan)",
    fertilizer_recommendation: {
      basal: "FYM 15 kg + Neem cake 500g + Carbofuran/Trichoderma 20g per pit",
      basal_ta: "குழிக்கு 15 கிலோ தொழு உரம் + 500 கிராம் வேப்பம்பிண்ணாக்கு அடியுரமாக",
      top_dressing_1: "Urea 50g + MOP 100g per plant at 3rd and 5th month",
      top_dressing_1_ta: "3 மற்றும் 5 ஆம் மாதங்களில் மரத்திற்கு யூரியா 50 கிராம் + பொட்டாஷ் 100 கிராம்",
      top_dressing_2: "Urea 50g + MOP 150g per plant at bunch emergence (7th month)",
      top_dressing_2_ta: "தார் வெளிவரும் 7 ஆம் மாதத்தில் பொட்டாஷ் 150 கிராம் இடவும்"
    },
    organic_practices: [
      "Pseudostem injection of neem oil to prevent weevil entry",
      "Sunnhemp green manuring sown around basin and incorporated at 45 days",
      "Bunch sleeving with ventilated polypropylene blue bags to prevent fruit scar"
    ],
    organic_practices_ta: [
      "வாழைத் தண்டு கூன்வண்டு தடுக்க வேப்பெண்ணெய் ஊற்றுதல்",
      "தடங்களில் சணப்பை விதைத்து 45 ஆம் நாளில் மடக்கி உழுதல்",
      "தாரை நீல பாலித்தீன் உறை கொண்டு மூடி காய் பளபளப்பை கூட்டுதல்"
    ],
    major_pests_and_remedies: [
      {
        pest: "Sigatoka Leaf Spot (சிகாட்டோகா இலைப்புள்ளி நோய்)",
        pest_ta: "சிகாட்டோகா இலைப்புள்ளி நோய்",
        symptoms: "Oval spindle-shaped dark brown spots with grey centres drying out outer leaves.",
        symptoms_ta: "இலைகளில் நீள்வட்ட கரும்பழுப்பு புள்ளிகள் தோன்றி இலைகள் காய்ந்து போதல்.",
        organic_remedy: "Prune dried leaves; spray mineral oil emulsion (1%) or Copper Hydroxide (2g/L).",
        organic_remedy_ta: "காய்ந்த இலைகளை அப்புறப்படுத்துதல்; 1% மினரல் ஆயில் அல்லது காப்பர் ஹைட்ராக்சைடு தெளித்தல்."
      }
    ]
  }
];
