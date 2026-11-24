// BhoomiX - Tamil Nadu Agricultural Farming Calendar & Seasonal Sowing Schedule
// Sourced from TNAU Crop Production Guide & Season and Crop Report of Tamil Nadu

export interface CalendarStage {
  stage: string;
  stage_ta: string;
  recommended_timing: string;
  recommended_timing_ta: string;
  key_activities: string[];
  key_activities_ta: string[];
  irrigation_advice: string;
  irrigation_advice_ta: string;
  fertilizer_guidance: string;
  fertilizer_guidance_ta: string;
  pest_watch: string;
  pest_watch_ta: string;
}

export interface TamilNaduSeason {
  id: string;
  name: string;
  name_ta: string;
  months: string;
  months_ta: string;
  key_districts: string[];
  primary_crops: string[];
  primary_crops_ta: string[];
  description: string;
  description_ta: string;
  stages: CalendarStage[];
}

export const TAMIL_NADU_SEASONS: TamilNaduSeason[] = [
  {
    id: "kuruvai",
    name: "Kuruvai Season (குறுவை பருவம்)",
    name_ta: "குறுவை பருவம் (ஜூன் - செப்டம்பர்)",
    months: "June to September",
    months_ta: "ஜூன் முதல் செப்டம்பர் வரை",
    key_districts: ["Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai", "Cuddalore", "Tiruchirappalli"],
    primary_crops: ["Short Duration Paddy (ADT 43, ADT 45, CO 51)", "Greengram", "Blackgram"],
    primary_crops_ta: ["குறுகிய கால நெல் (ADT 43, ADT 45, CO 51)", "பச்சைப்பயறு", "உளுந்து"],
    description: "Short duration summer-monsoon paddy irrigated via Mettur Dam release and filter points in the Cauvery delta.",
    description_ta: "மேட்டூர் அணை நீர் திறப்பு மற்றும் ஆழ்குழாய் பாசனத்தை நம்பிய காவிரி டெல்டாவின் குறுகிய கால நெல் சாகுபடி பருவம்.",
    stages: [
      {
        stage: "Nursery & Sowing (நாற்றங்கால் & விதைப்பு)",
        stage_ta: "நாற்றங்கால் தயாரிப்பு மற்றும் விதைப்பு",
        recommended_timing: "Day 1 to 20 (June 1 - June 20)",
        recommended_timing_ta: "1 முதல் 20 ஆம் நாள் வரை (ஜூன் முதல் ஜூன் 20)",
        key_activities: [
          "Treat seeds with Pseudomonas fluorescens @ 10g/kg or Azospirillum",
          "Prepare dapog nursery or wet bed nursery with organic manure",
          "Ensure light surface film of water; avoid submergence"
        ],
        key_activities_ta: [
          "சூடோமோனாஸ் அல்லது அசோஸ்பைரில்லம் கொண்டு விதை நேர்த்தி செய்தல்",
          "பாய்கட்டு அல்லது சேற்று நாற்றங்கால் தயார் செய்தல்",
          "மெல்லிய நீர் படலத்தை பராமரித்தல்"
        ],
        irrigation_advice: "Maintain saturated soil without standing water for first 5 days.",
        irrigation_advice_ta: "முதல் 5 நாட்களுக்கு நீர் தேங்காமல் ஈரப்பதத்தை மட்டும் பராமரிக்கவும்.",
        fertilizer_guidance: "Apply DAP 2 kg per cent of nursery area as basal.",
        fertilizer_guidance_ta: "ஒரு சென்ட் நாற்றங்காலுக்கு 2 கிலோ டி.ஏ.பி அடியுரமாக இடவும்.",
        pest_watch: "Watch for thrips in nursery leaf tips; spray neem seed kernel extract (NSKE 5%).",
        pest_watch_ta: "இலைப்பேன் தாக்குதலை கண்காணிக்கவும்; வேப்பங்கொட்டை கரைசல் 5% தெளிக்கவும்."
      },
      {
        stage: "Transplanting & Vegetative (நடவு & தழைப்பருவம்)",
        stage_ta: "நடவு மற்றும் தழைப்பருவம்",
        recommended_timing: "Day 21 to 55 (July)",
        recommended_timing_ta: "21 முதல் 55 ஆம் நாள் வரை (ஜூலை)",
        key_activities: [
          "Transplant 15-18 day seedlings with 2-3 seedlings per hill",
          "Spacing 15 x 10 cm for high tiller generation",
          "Cono-weeder operation at 15th and 30th DAT (Days After Transplanting)"
        ],
        key_activities_ta: [
          "15-18 நாள் நாற்றுகளை குத்துக்கு 2-3 நாற்றுகள் வீதம் நடவு செய்தல்",
          "பயிர் இடைவெளி 15 x 10 செ.மீ பராமரித்தல்",
          "நடவு செய்த 15 மற்றும் 30 ஆம் நாளில் கோனோவீடர் மூலம் களையெடுத்தல்"
        ],
        irrigation_advice: "Adopt Alternate Wetting & Drying (AWD) irrigation; irrigate when water level drops 5 cm below surface.",
        irrigation_advice_ta: "காய்ச்சலும் பாய்ச்சலுமாக (AWD) நீர் பாய்ச்சவும்; நீர் மட்டம் 5 செ.மீ குறையும் போது பாய்ச்சவும்.",
        fertilizer_guidance: "Apply Urea 30 kg/acre + MOP 15 kg/acre as first top dressing at tillering.",
        fertilizer_guidance_ta: "தூர்கட்டும் பருவத்தில் ஏக்கருக்கு யூரியா 30 கிலோ + பொட்டாஷ் 15 கிலோ மேலுரமாக இடவும்.",
        pest_watch: "Scout for yellow stem borer dead hearts and leaf folder; release Trichogramma egg parasitoids.",
        pest_watch_ta: "குருத்துப்பூச்சி மற்றும் இலைச்சுருட்டு புழுவை கண்காணிக்கவும்; டிரைக்கோடெர்மா ஒட்டுண்ணி அட்டை கட்டவும்."
      },
      {
        stage: "Panicle Initiation & Flowering (கதிர் உருவாக்கம் & பூக்கும் பருவம்)",
        stage_ta: "கதிர் பருவம் மற்றும் பூக்கும் பருவம்",
        recommended_timing: "Day 56 to 85 (August)",
        recommended_timing_ta: "56 முதல் 85 ஆம் நாள் வரை (ஆகஸ்ட்)",
        key_activities: [
          "Maintain shallow standing water (2-3 cm) during panicle emergence",
          "Foliar spray of 1% Potassium Chloride (MOP) to boost grain filling",
          "Avoid pesticide foliar application during peak midday pollination (10 AM - 12 PM)"
        ],
        key_activities_ta: [
          "கதிர் வரும் பருவத்தில் 2-3 செ.மீ சீரான நீர் தேக்கி வைக்கவும்",
          "மணிப்பிடிப்பு அதிகரிக்க 1% பொட்டாசியம் குளோரைடு இலைவழி தெளித்தல்",
          "மதிய மகரந்த சேர்க்கை நேரத்தில் பூச்சிக்கொல்லி தெளிப்பதை தவிர்க்கவும்"
        ],
        irrigation_advice: "Critical water sensitivity period; never allow root zone to crack or dry out.",
        irrigation_advice_ta: "முக்கிய பாசனக் காலம்; நிலம் வெடிக்கவோ வறண்டு போகவோ கூடாது.",
        fertilizer_guidance: "Second top dressing: Urea 20 kg + MOP 10 kg per acre at panicle initiation.",
        fertilizer_guidance_ta: "இரண்டாம் மேலுரம்: ஏக்கருக்கு யூரியா 20 கிலோ + பொட்டாஷ் 10 கிலோ இடவும்.",
        pest_watch: "Inspect for brown planthopper (BPH) at base of stems; drain standing water if detected.",
        pest_watch_ta: "பயிர் அடிப்பகுதியில் புகையான் பூச்சியை கண்காணிக்கவும்; தென்பட்டால் நீரை வடித்துவிடவும்."
      },
      {
        stage: "Maturity & Harvesting (முதிர்ச்சி & அறுவடை)",
        stage_ta: "பயிர் முதிர்ச்சி மற்றும் அறுவடை பருவம்",
        recommended_timing: "Day 86 to 110 (September)",
        recommended_timing_ta: "86 முதல் 110 ஆம் நாள் வரை (செப்டம்பர்)",
        key_activities: [
          "Completely drain field 10-12 days prior to scheduled harvest",
          "Harvest when 85-90% grains in panicle turn golden straw color",
          "Sow relay pulse (blackgram ADT 5) in standing crop 4-6 days before harvest"
        ],
        key_activities_ta: [
          "அறுவடைக்கு 10-12 நாட்களுக்கு முன்பாக வயலில் உள்ள தண்ணீரை முழுமையாக வடிக்கவும்",
          "85-90% தானியங்கள் பொன்னிறமாக மாறியதும் அறுவடை செய்யவும்",
          "அறுவடைக்கு 4-6 நாட்களுக்கு முன் பயறு (உளுந்து ADT 5) விதைப்பு செய்யவும்"
        ],
        irrigation_advice: "Stop irrigation completely to ease combined harvester mobility.",
        irrigation_advice_ta: "அறுவடை இயந்திரம் எளிதாக இறங்க பாசனத்தை முழுமையாக நிறுத்தவும்.",
        fertilizer_guidance: "Nil (No fertilizer application needed).",
        fertilizer_guidance_ta: "உரம் எதுவும் இடத்தேவையில்லை.",
        pest_watch: "Guard against grain discoloration and moisture rot during unexpected cloudbursts.",
        pest_watch_ta: "திடீர் மழையின் போது தானியம் நிறம்மாறுதல் மற்றும் ஈரப்பத பூஞ்சை வராமல் பாதுகாக்கவும்."
      }
    ]
  },
  {
    id: "samba",
    name: "Samba / Thaladi Season (சம்பா / தாளடி பருவம்)",
    name_ta: "சம்பா / தாளடி பருவம் (ஆகஸ்ட் - ஜனவரி)",
    months: "August to January",
    months_ta: "ஆகஸ்ட் முதல் ஜனவரி வரை",
    key_districts: ["Thanjavur", "Tiruvarur", "Nagapattinam", "Mayiladuthurai", "Cuddalore", "Villupuram", "Kanchipuram", "Chengalpattu", "Tiruvallur"],
    primary_crops: ["Medium / Long Duration Paddy (CR 1009, BPT 5204, IW Ponni)", "Sugarcane", "Cotton"],
    primary_crops_ta: ["நீண்ட கால நெல் (CR 1009, BPT 5204, பொன்னி)", "கரும்பு", "பருத்தி"],
    description: "The primary agro-economic backbone of Tamil Nadu, coinciding with the Northeast Monsoon rains.",
    description_ta: "வடகிழக்கு பருவமழையை மையமாகக் கொண்டு தமிழ்நாட்டின் பெரும்பான்மையான நெல் உற்பத்தியை தரும் முதன்மை பருவம்.",
    stages: [
      {
        stage: "Sowing & Nursery Raising",
        stage_ta: "விதைப்பு & நாற்றங்கால் தயாரிப்பு",
        recommended_timing: "August 15 to September 15",
        recommended_timing_ta: "ஆகஸ்ட் 15 முதல் செப்டம்பர் 15 வரை",
        key_activities: ["Wet nursery bed preparation", "Seed treatment with biocontrol agents", "Pre-monsoon soil tilling"],
        key_activities_ta: ["சேற்று நாற்றங்கால் தயாரிப்பு", "உயிர் உரங்களுடன் விதை நேர்த்தி", "பருவமழைக்கு முந்தைய உழவு"],
        irrigation_advice: "Conserve canal inflows and monsoon precipitation in farm ponds.",
        irrigation_advice_ta: "வாய்க்கால் நீர் மற்றும் பருவமழை நீரை சேமித்து பயன்படுத்தவும்.",
        fertilizer_guidance: "Apply well-decomposed FYM or green manure (Daincha) @ 5 tonnes/acre.",
        fertilizer_guidance_ta: "ஏக்கருக்கு 5 டன் மக்கிய தொழு உரம் அல்லது தக்கைப்பூண்டு இட்டு உழவும்.",
        pest_watch: "Blast and leaf spot preventive monitoring.",
        pest_watch_ta: "குலைநோய் மற்றும் இலைப்புள்ளி நோய் முன்னெச்சரிக்கை கண்காணிப்பு."
      },
      {
        stage: "Active Tillering & Northeast Monsoon Inflow",
        stage_ta: "பருவமழை கால தழைப்பருவம்",
        recommended_timing: "October to November",
        recommended_timing_ta: "அக்டோபர் முதல் நவம்பர் வரை",
        key_activities: ["Drain excess floodwaters through drainage channels", "Split application of nitrogen after heavy rains"],
        key_activities_ta: ["அதிகப்படியான மழைநீரை வடிகால் மூலம் வடித்தல்", "மழை நின்ற பின் யூரியா மேலுரம் இடுதல்"],
        irrigation_advice: "Drainage management is paramount to prevent water stagnation above collar height.",
        irrigation_advice_ta: "பயிர் மூழ்காதவாறு வடிகால் வசதி செய்து நீரை வெளியேற்றுவது மிக முக்கியம்.",
        fertilizer_guidance: "Top dress Urea 35 kg + MOP 15 kg when water recedes.",
        fertilizer_guidance_ta: "வெள்ள நீர் வடிந்ததும் ஏக்கருக்கு யூரியா 35 கிலோ + பொட்டாஷ் 15 கிலோ இடவும்.",
        pest_watch: "High humidity fosters Bacterial Leaf Blight (BLB); spray Copper oxychloride + Streptocycline if lesions appear.",
        pest_watch_ta: "அதிக காற்றில் பாக்டீரியா இலைக்கருகல் வரலாம்; தாமிர நுண்ணுயிர் மருந்து தெளிக்கவும்."
      },
      {
        stage: "Grain Maturity & Harvest",
        stage_ta: "தானிய முதிர்ச்சி & அறுவடை",
        recommended_timing: "January (Thai Pongal Harvest)",
        recommended_timing_ta: "ஜனவரி (தைப்பொங்கல் அறுவடை)",
        key_activities: ["Sun drying paddy to 14% moisture", "Immediate storage in hermetic bags or sale at regulated mandi"],
        key_activities_ta: ["நெல்லை 14% ஈரப்பதத்திற்கு வெயிலில் உலர்த்துதல்", "ஒழுங்குமுறை விற்பனைக்கூடத்தில் விற்பனை செய்தல்"],
        irrigation_advice: "Stop watering 15 days before harvest.",
        irrigation_advice_ta: "அறுவடைக்கு 15 நாட்களுக்கு முன் பாசனத்தை நிறுத்தவும்.",
        fertilizer_guidance: "Nil.",
        fertilizer_guidance_ta: "உரம் எதுவும் தேவையில்லை.",
        pest_watch: "Protect harvested paddy heaps from unseasonal showers using tarpaulin covers.",
        pest_watch_ta: "அறுவடை செய்த நெல் குவியல்களை தார்பாலின் கொண்டு மூடவும்."
      }
    ]
  },
  {
    id: "navarai",
    name: "Navarai Season (நவரை பருவம்)",
    name_ta: "நவரை பருவம் (டிசம்பர் - ஏப்ரல்)",
    months: "December to April",
    months_ta: "டிசம்பர் முதல் ஏப்ரல் வரை",
    key_districts: ["Vellore", "Tiruvannamalai", "Chengalpattu", "Kanchipuram", "Viluppuram", "Salem", "Dharmapuri"],
    primary_crops: ["Borewell Paddy", "Groundnut (TMV 7, VRI 2)", "Watermelon", "Sesame (Gingelly)"],
    primary_crops_ta: ["ஆழ்குழாய் நெல்", "மணிலா / நிலக்கடலை (TMV 7, VRI 2)", "தர்பூசணி", "எள்ளு"],
    description: "Post-monsoon sunny dry season with groundwater or tank well irrigation, ideal for oilseeds and pulses.",
    description_ta: "பருவமழைக்கு பிந்தைய தெளிவான வெயில் பருவம்; நிலத்தடி நீரை பயன்படுத்தி எண்ணெய் வித்துக்கள் மற்றும் பயறு சாகுபடிக்கு உகந்தது.",
    stages: [
      {
        stage: "Sowing & Germination",
        stage_ta: "விதைப்பு மற்றும் முளைப்பு",
        recommended_timing: "December 15 to January 15",
        recommended_timing_ta: "டிசம்பர் 15 முதல் ஜனவரி 15 வரை",
        key_activities: ["Gypsum application for groundnut @ 80 kg/acre at sowing", "Drip installation"],
        key_activities_ta: ["நிலக்கடலைக்கு ஏக்கருக்கு 80 கிலோ ஜிப்சம் இடுதல்", "சொட்டு நீர் பாசனம் அமைத்தல்"],
        irrigation_advice: "Irrigate immediately after sowing and again on 3rd day (life irrigation).",
        irrigation_advice_ta: "விதைத்தவுடன் ஒரு பாசனமும், 3 ஆம் நாள் உயிர்த்தண்ணீரும் பாய்ச்சவும்.",
        fertilizer_guidance: "Basal NPK 10:20:30 kg/acre for groundnut.",
        fertilizer_guidance_ta: "நிலக்கடலைக்கு அடியுரமாக NPK 10:20:30 கிலோ/ஏக்கர் இடவும்.",
        pest_watch: "Termites and white grub watch.",
        pest_watch_ta: "கரையான் மற்றும் வேர்ப்புழு தாக்குதலை கண்காணிக்கவும்."
      },
      {
        stage: "Pod Development & Harvesting",
        stage_ta: "காய் பிடிப்பு & அறுவடை",
        recommended_timing: "March to April",
        recommended_timing_ta: "மார்ச் முதல் ஏப்ரல் வரை",
        key_activities: ["Peg penetration monitoring", "Second gypsum application at 45 DAS", "Pulling and pod stripping"],
        key_activities_ta: ["விழுது இறங்கும் பருவம்", "45 ஆம் நாளில் 80 கிலோ ஜிப்சம் இடுதல்", "செடி பிடுங்குதல் மற்றும் காய் பிரித்தல்"],
        irrigation_advice: "Maintain peg-zone moisture with light sprinkler irrigation.",
        irrigation_advice_ta: "தெளிப்பான் மூலம் விழுது இறங்கும் பகுதிக்கு மிதமான நீர் பாய்ச்சவும்.",
        fertilizer_guidance: "Gypsum top dressing enhances pod filling and prevents blind nuts (pop pods).",
        fertilizer_guidance_ta: "ஜிப்சம் இடுவதால் திரட்சியான காய்கள் பிடிக்கும்; பதர் காய்கள் உருவாவது தடுக்கப்படும்.",
        pest_watch: "Spodoptera litura (tobacco caterpillar); install pheromone traps @ 5/acre.",
        pest_watch_ta: "புகையிலைப் படைப்புழு; ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறி வைக்கவும்."
      }
    ]
  }
];
