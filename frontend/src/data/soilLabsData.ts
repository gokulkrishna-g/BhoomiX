// BhoomiX - Verified Soil Testing Laboratories Across Tamil Nadu
// Sourced from Department of Agriculture, Govt of Tamil Nadu & TNAU Agritech Portal

export interface SoilTestingLab {
  id: string;
  name: string;
  name_ta: string;
  type: 'Government STL' | 'TNAU KVK' | 'ICAR Research' | 'University Dept';
  district: string;
  district_ta: string;
  address: string;
  address_ta: string;
  phone: string;
  email: string;
  lat: number;
  lon: number;
  tests_offered: string[];
  tests_offered_ta: string[];
  fee_structure: string;
  fee_structure_ta: string;
  turnaround_days: number;
  contact_person: string;
  soil_health_card_facility: boolean;
  gps_directions_url: string;
}

export const TAMIL_NADU_SOIL_LABS: SoilTestingLab[] = [
  {
    id: "stl-thanjavur",
    name: "Government Soil Testing Laboratory, Thanjavur",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், தஞ்சாவூர்",
    type: "Government STL",
    district: "Thanjavur",
    district_ta: "தஞ்சாவூர்",
    address: "Joint Director of Agriculture Campus, Old Bus Stand Road, Thanjavur - 613001",
    address_ta: "இணை வேளாண்மை இயக்குநர் வளாகம், பழைய பேருந்து நிலையம் அருகில், தஞ்சாவூர் - 613001",
    phone: "04362-230384",
    email: "stlthanjavur@nic.in",
    lat: 10.7867,
    lon: 79.1378,
    tests_offered: [
      "Soil pH & Electrical Conductivity (EC)",
      "Available Nitrogen (N)",
      "Available Phosphorus (P)",
      "Available Potassium (K)",
      "Organic Carbon (OC %)",
      "Micronutrients (Zinc, Iron, Copper, Manganese, Boron)",
      "Lime Requirement / Gypsum Requirement for Alkali Soils",
      "Model-Estimated Soil Moisture Calibration"
    ],
    tests_offered_ta: [
      "மண் கார அமிலத்தன்மை (pH) மற்றும் மின் கடத்துத்திறன் (EC)",
      "கிடைக்கும் தழைச்சத்து (N)",
      "கிடைக்கும் மணிச்சத்து (P)",
      "கிடைக்கும் சாம்பல்ச்சத்து (K)",
      "மண் கரிமக் கரிம அளவு (OC %)",
      "நுண்ணூட்டச்சத்துக்கள் (துத்தநாகம், இரும்பு, தாமிரம், மாங்கனீசு, போரான்)",
      "களர் நில சீர்திருத்த ஜிப்சம் தேவை கணக்கீடு",
      "மாதிரி ஈரப்பத மதிப்பீடு"
    ],
    fee_structure: "₹20 per sample under National Soil Health Card Scheme",
    fee_structure_ta: "மண் வள அட்டை திட்டத்தின் கீழ் மாதிரி ஒன்றுக்கு ₹20 மட்டுமே",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Soil Testing)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=10.7867,79.1378"
  },
  {
    id: "tnau-coimbatore",
    name: "Department of Soil Science & Agricultural Chemistry, TNAU Coimbatore",
    name_ta: "மண் அறிவியல் மற்றும் வேளாண் வேதியியல் துறை ஆய்வகம், TNAU கோயம்புத்தூர்",
    type: "University Dept",
    district: "Coimbatore",
    district_ta: "கோயம்புத்தூர்",
    address: "Tamil Nadu Agricultural University Campus, Marudhamalai Road, Coimbatore - 641003",
    address_ta: "தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழக வளாகம், மருதமலை சாலை, கோயம்புத்தூர் - 641003",
    phone: "0422-6611235",
    email: "soils@tnau.ac.in",
    lat: 11.0125,
    lon: 76.9356,
    tests_offered: [
      "Comprehensive Soil Health Profiling (Macro + Micro)",
      "Soil pH & EC Analysis",
      "Inductively Coupled Plasma (ICP) Micronutrient Suite",
      "Organic Carbon & Total Humus",
      "Soil Physical Texture & Bulk Density",
      "Irrigation Water Quality Testing (SAR, RSC)",
      "Fertilizer Quality & Bio-fertilizer Colony Count"
    ],
    tests_offered_ta: [
      "முழுமையான மண் வள சுயவிவர ஆய்வு (பேரூட்ட + நுண்ணூட்ட)",
      "மண் pH மற்றும் மின் கடத்துத்திறன் (EC)",
      "மேம்பட்ட ICP நுண்ணூட்டச்சத்து பரிசோதனை",
      "கரிமக் கரிம மற்றும் மட்கு அளவு",
      "மண் கட்டமைப்பு மற்றும் அடர்த்தி பகுப்பாய்வு",
      "பாசன நீர் தரம் பரிசோதனை (SAR, RSC)",
      "உரத் தரம் மற்றும் உயிர்ம உர ஆய்வு"
    ],
    fee_structure: "₹150 for Comprehensive Research Grade Soil Card",
    fee_structure_ta: "விரிவான ஆய்வு நிலை மண் அட்டைக்கு ₹150",
    turnaround_days: 4,
    contact_person: "Professor & Head (Soil Science)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=11.0125,76.9356"
  },
  {
    id: "stl-madurai",
    name: "Government Soil Testing Laboratory, Madurai",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், மதுரை",
    type: "Government STL",
    district: "Madurai",
    district_ta: "மதுரை",
    address: "Department of Agriculture Complex, Alagar Kovil Road, K.Pudur, Madurai - 625007",
    address_ta: "வேளாண்மை துறை வளாகம், அழகர் கோவில் சாலை, கே.புதூர், மதுரை - 625007",
    phone: "0452-2531024",
    email: "stlmadurai@tn.gov.in",
    lat: 9.9452,
    lon: 78.1462,
    tests_offered: [
      "Soil pH & Electrical Conductivity",
      "NPK Macronutrient Battery",
      "Organic Carbon Status",
      "Karisal (Black Cotton Soil) Gypsum Requirement",
      "Micronutrient Deficiencies (Zn, Fe)",
      "Irrigation Water Quality Testing"
    ],
    tests_offered_ta: [
      "மண் pH மற்றும் மின் கடத்துத்திறன்",
      "தழை, மணி, சாம்பல் சத்துக்கள் (NPK)",
      "கரிமக் கரிமம் அளவு",
      "கரிசல் மண் ஜிப்சம் தேவை மதிப்பீடு",
      "நுண்ணூட்டச்சத்து குறைபாடுகள் (துத்தநாகம், இரும்பு)",
      "பாசன நீர் தரம் பரிசோதனை"
    ],
    fee_structure: "₹20 under Soil Health Card Scheme",
    fee_structure_ta: "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Assistant Director of Agriculture (STL)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=9.9452,78.1462"
  },
  {
    id: "kvk-needamangalam",
    name: "ICAR - TNAU Krishi Vigyan Kendra Soil Testing Lab, Needamangalam",
    name_ta: "ICAR - TNAU வேளாண் அறிவியல் மையம் (KVK) மண் பரிசோதனை கூடம், நீடாமங்கலம்",
    type: "TNAU KVK",
    district: "Tiruvarur",
    district_ta: "திருவாரூர்",
    address: "KVK Campus, Mannargudi Road, Needamangalam, Tiruvarur District - 614404",
    address_ta: "KVK வளாகம், மன்னார்குடி சாலை, நீடாமங்கலம், திருவாரூர் மாவட்டம் - 614404",
    phone: "04367-260666",
    email: "kvkneedamangalam@tnau.ac.in",
    lat: 10.7712,
    lon: 79.4215,
    tests_offered: [
      "Cauvery Delta Alluvial Soil Health Analysis",
      "Soil pH, EC, Organic Carbon",
      "Available N, P, K",
      "Heavy Delta Clay Texture Test",
      "Paddy Field Micronutrient Deficiencies (Zinc)",
      "Soil Salinity Reclamation Protocol"
    ],
    tests_offered_ta: [
      "காவிரி டெல்டா வண்டல் மண் வள பகுப்பாய்வு",
      "மண் pH, EC மற்றும் கரிமக் கரிம அளவு",
      "கிடைக்கும் N, P, K சத்துக்கள்",
      "களிமண் அமைப்பு சோதனை",
      "நெல் வயல் துத்தநாக குறைபாடு ஆய்வு",
      "உவர் நில சீர்திருத்த வழிகாட்டுதல்"
    ],
    fee_structure: "₹25 subsidized farmer fee",
    fee_structure_ta: "விவசாயிகளுக்கான மானியக் கட்டணம் ₹25",
    turnaround_days: 3,
    contact_person: "Programme Coordinator (KVK)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=10.7712,79.4215"
  },
  {
    id: "stl-trichy",
    name: "Government Soil Testing Laboratory, Tiruchirappalli",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், திருச்சிராப்பள்ளி",
    type: "Government STL",
    district: "Tiruchirappalli",
    district_ta: "திருச்சிராப்பள்ளி",
    address: "Agriculture Complex, Collectorate Campus, Cantonment, Tiruchirappalli - 620001",
    address_ta: "வேளாண்மை வளாகம், மாவட்ட ஆட்சியர் அலுவலகம், கன்டோன்மென்ட், திருச்சி - 620001",
    phone: "0431-2412854",
    email: "stltrichy@tn.gov.in",
    lat: 10.8055,
    lon: 78.6856,
    tests_offered: [
      "Soil pH, EC, Organic Carbon",
      "Available N, P, K",
      "Banana & Sugarcane Soil Micronutrient Battery",
      "Soil Salinity Assessment",
      "Fertilizer Recommendation Schedule"
    ],
    tests_offered_ta: [
      "மண் pH, EC, கரிமக் கரிமம்",
      "தழை, மணி, சாம்பல் சத்துக்கள்",
      "வாழை மற்றும் கரும்பு மண் நுண்ணூட்டச்சத்து ஆய்வு",
      "மண் உவர்த்தன்மை மதிப்பீடு",
      "பரிந்துரைக்கப்பட்ட உர அட்டவணை"
    ],
    fee_structure: "₹20 under Govt SHC Scheme",
    fee_structure_ta: "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Soil Health)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=10.8055,78.6856"
  },
  {
    id: "stl-salem",
    name: "Government Soil Testing Laboratory, Salem",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், சேலம்",
    type: "Government STL",
    district: "Salem",
    district_ta: "சேலம்",
    address: "Collectorate Compound, Omalur Main Road, Salem - 636001",
    address_ta: "மாவட்ட ஆட்சியர் அலுவலக வளாகம், ஓமலூர் முதன்மை சாலை, சேலம் - 636001",
    phone: "0427-2415124",
    email: "stlsalem@tn.gov.in",
    lat: 11.6643,
    lon: 78.1460,
    tests_offered: [
      "Soil pH & Salinity / Alkalinity (EC)",
      "NPK Macronutrients",
      "Tapioca & Mango Soil Nutrients",
      "Micronutrients (Zinc, Boron)",
      "Liming Recommendation for Acid Laterite Soils"
    ],
    tests_offered_ta: [
      "மண் pH மற்றும் கார / உவர் நிலை",
      "NPK பேரூட்டச்சத்துக்கள்",
      "மரவள்ளிக்கிழங்கு மற்றும் மாந்தோட்ட மண் ஆய்வு",
      "துத்தநாகம், போரான் நுண்ணூட்டச்சத்துக்கள்",
      "அமில மண் சுண்ணாம்பு பயன்பாட்டு பரிந்துரை"
    ],
    fee_structure: "₹20 under Soil Health Card Scheme",
    fee_structure_ta: "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Salem STL)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=11.6643,78.1460"
  },
  {
    id: "stl-cuddalore",
    name: "Government Soil Testing Laboratory, Cuddalore",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், கடலூர்",
    type: "Government STL",
    district: "Cuddalore",
    district_ta: "கடலூர்",
    address: "Semmandalam, Cuddalore - 607001",
    address_ta: "செம்மண்டலம், கடலூர் - 607001",
    phone: "04142-290488",
    email: "stlcuddalore@tn.gov.in",
    lat: 11.7580,
    lon: 79.7614,
    tests_offered: [
      "Coastal Sandy & Laterite Soil Health Testing",
      "Soil pH & Electrical Conductivity",
      "Available NPK",
      "Cashew & Jackfruit Micronutrient Profiling",
      "Coastal Salinity Ingress Check"
    ],
    tests_offered_ta: [
      "கடற்கரை மணல் மற்றும் செம்மண் வள பரிசோதனை",
      "மண் pH மற்றும் மின் கடத்துத்திறன்",
      "தழை, மணி, சாம்பல் சத்துக்கள்",
      "முந்திரி மற்றும் பலா மண் நுண்ணூட்டச்சத்து ஆய்வு",
      "கடல் நீர் உவர் ஊடுருவல் சோதனை"
    ],
    fee_structure: "₹20 under Govt SHC Scheme",
    fee_structure_ta: "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 4,
    contact_person: "Agricultural Officer (Soil Testing)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=11.7580,79.7614"
  },
  {
    id: "stl-erode",
    name: "Government Soil Testing Laboratory, Erode",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், ஈரோடு",
    type: "Government STL",
    district: "Erode",
    district_ta: "ஈரோடு",
    address: "Joint Director of Agriculture Office, Perundurai Road, Erode - 638011",
    address_ta: "இணை வேளாண்மை இயக்குநர் அலுவலகம், பெருந்துறை சாலை, ஈரோடு - 638011",
    phone: "0424-2221345",
    email: "stlerode@tn.gov.in",
    lat: 11.3410,
    lon: 77.7172,
    tests_offered: [
      "Turmeric & Sugarcane Soil Profiling",
      "Soil pH, EC, Organic Carbon",
      "Available NPK",
      "Curcumin Quality Booster Nutrients (K, S, Zn)",
      "Kalingarayan Canal Basin Silt Fertility Test"
    ],
    tests_offered_ta: [
      "மஞ்சள் மற்றும் கரும்பு மண் வள ஆய்வு",
      "மண் pH, EC மற்றும் கரிமக் கரிம அளவு",
      "கிடைக்கும் NPK சத்துக்கள்",
      "குர்குமின் தரத்தை அதிகரிக்கும் சத்துக்கள் (K, S, Zn)",
      "காலிங்கராயன் வாய்க்கால் பாசன வண்டல் வள சோதனை"
    ],
    fee_structure: "₹20 under Soil Health Card Scheme",
    fee_structure_ta: "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Erode STL)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=11.3410,77.7172"
  },
  {
    id: "stl-tirunelveli",
    name: "Government Soil Testing Laboratory, Tirunelveli",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், திருநெல்வேலி",
    type: "Government STL",
    district: "Tirunelveli",
    district_ta: "திருநெல்வேலி",
    address: "Palayamkottai Agriculture Campus, Tirunelveli - 627002",
    address_ta: "பாளையங்கோட்டை வேளாண் வளாகம், திருநெல்வேலி - 627002",
    phone: "0462-2572118",
    email: "stltirunelveli@tn.gov.in",
    lat: 8.7139,
    lon: 77.7567,
    tests_offered: [
      "Thamirabarani Alluvium Soil Health",
      "Deep Karisal (Black Soil) Salinity & Permeability",
      "NPK Macronutrient Battery",
      "Zinc & Iron Micronutrient Deficiencies",
      "Water Salinity Testing"
    ],
    tests_offered_ta: [
      "தாமிரபரணி ஆற்று வண்டல் மண் பரிசோதனை",
      "ஆழமான கரிசல் மண் உவர்த்தன்மை மற்றும் நீர்க்கொள்ளளவு",
      "பேரூட்டச்சத்துக்கள் (NPK)",
      "துத்தநாகம், இரும்பு சத்து குறைபாடு சோதனை",
      "பாசன நீர் பரிசோதனை"
    ],
    fee_structure: "₹20 under Soil Health Card Scheme",
    fee_structure_ta: "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Soil Testing)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=8.7139,77.7567"
  },
  {
    id: "stl-dharmapuri",
    name: "Government Soil Testing Laboratory, Dharmapuri",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், தர்மபுரி",
    type: "Government STL",
    district: "Dharmapuri",
    district_ta: "தர்மபுரி",
    address: "Department of Agriculture Complex, Nethaji Bypass Road, Dharmapuri - 636701",
    address_ta: "வேளாண்மை துறை வளாகம், நேதாஜி பைபாஸ் சாலை, தர்மபுரி - 636701",
    phone: "04342-230554",
    email: "stldharmapuri@tn.gov.in",
    lat: 12.1211,
    lon: 78.1582,
    tests_offered: [
      "Ragi & Millet Dryland Soil Profiling",
      "Mango Orchard Soil & Leaf Analysis",
      "Soil pH & Electrical Conductivity",
      "Available NPK",
      "Red Gravelly Soil Moisture Retention Estimation"
    ],
    tests_offered_ta: [
      "கேழ்வரகு மற்றும் சிறுதானிய மானாவாரி மண் ஆய்வு",
      "மாந்தோட்ட மண் மற்றும் இலை ஊட்டச்சத்து ஆய்வு",
      "மண் pH மற்றும் மின் கடத்துத்திறன்",
      "கிடைக்கும் NPK சத்துக்கள்",
      "செம்பொறை மண் ஈரப்பதம் தேக்கும் திறன் மதிப்பீடு"
    ],
    fee_structure: "₹20 under Govt SHC Scheme",
    fee_structure_ta: "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Dharmapuri STL)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=12.1211,78.1582"
  },
  {
    id: "kvk-sikkal",
    name: "ICAR - KVK Coastal Soil Testing Laboratory, Sikkal",
    name_ta: "ICAR - KVK கடலோர மண் பரிசோதனை கூடம், சிக்கல்",
    type: "TNAU KVK",
    district: "Nagapattinam",
    district_ta: "நாகப்பட்டினம்",
    address: "KVK Sikkal, Nagapattinam District - 611108",
    address_ta: "KVK சிக்கல், நாகப்பட்டினம் மாவட்டம் - 611108",
    phone: "04365-246266",
    email: "kvksikkal@tnau.ac.in",
    lat: 10.7425,
    lon: 79.8055,
    tests_offered: [
      "Coastal Saline & Flood-Prone Soil Testing",
      "Electrical Conductivity (Salinity Gradients)",
      "Available NPK",
      "Zinc Deficiency for Submerged Paddy",
      "Bio-Saline Agriculture Soil Amendments"
    ],
    tests_offered_ta: [
      "கடலோர உவர் மற்றும் வெள்ள பாதிப்பு மண் பரிசோதனை",
      "மின் கடத்துத்திறன் (உப்புத்தன்மை அளவீடு)",
      "கிடைக்கும் NPK சத்துக்கள்",
      "நீர்மூழ்கு நெல் வயல் துத்தநாக குறைபாடு ஆய்வு",
      "உவர் நில வேளாண் மண் சீர்திருத்தங்கள்"
    ],
    fee_structure: "₹25 subsidized farmer fee",
    fee_structure_ta: "விவசாயிகளுக்கான மானியக் கட்டணம் ₹25",
    turnaround_days: 3,
    contact_person: "Soil Scientist (KVK Sikkal)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=10.7425,79.8055"
  },
  {
    id: "stl-kanchipuram",
    name: "Government Soil Testing Laboratory, Kanchipuram",
    name_ta: "அரசு மண் பரிசோதனை ஆய்வகம், காஞ்சிபுரம்",
    type: "Government STL",
    district: "Kanchipuram",
    district_ta: "காஞ்சிபுரம்",
    address: "Near Collectorate, Vandavasi Road, Kanchipuram - 631501",
    address_ta: "மாவட்ட ஆட்சியர் அலுவலகம் அருகில், வந்தவாசி சாலை, காஞ்சிபுரம் - 631501",
    phone: "044-27237885",
    email: "stlkanchi@tn.gov.in",
    lat: 12.8342,
    lon: 79.7036,
    tests_offered: [
      "Tank-Irrigated Wetland Paddy Soil Profiling",
      "Soil pH & EC",
      "Available NPK & Organic Carbon",
      "Groundnut & Watermelon Soil Micronutrients",
      "Soil Texture and Moisture Capacity"
    ],
    tests_offered_ta: [
      "ஏரிப்பாசன நஞ்சை நெல் மண் வள ஆய்வு",
      "மண் pH மற்றும் மின் கடத்துத்திறன்",
      "கிடைக்கும் NPK மற்றும் கரிமக் கரிமம்",
      "மணிலா மற்றும் தர்பூசணி மண் நுண்ணூட்டச்சத்துக்கள்",
      "மண் அமைப்பு மற்றும் ஈரப்பதம் தேக்கும் திறன்"
    ],
    fee_structure: "₹20 under Govt SHC Scheme",
    fee_structure_ta: "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
    turnaround_days: 3,
    contact_person: "Agricultural Officer (Soil Testing)",
    soil_health_card_facility: true,
    gps_directions_url: "https://maps.google.com/?q=12.8342,79.7036"
  }
];

// Helper: Calculate Great Circle Distance in KM between two lat/lon points
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
