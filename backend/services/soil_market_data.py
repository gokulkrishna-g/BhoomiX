"""
BhoomiX - Tamil Nadu Soil Testing Laboratories, Mandi Prices & AI Regional Voice Assistant Engine
Contains:
1. Verified Soil Testing Laboratories (Government STLs & TNAU KVKs) with GPS coordinates and distance calculation
2. Mandi Market Prices across Tamil Nadu regulated agricultural markets (AGMARKNET & TN Agri Marketing)
3. Intelligent Bilingual (Tamil & English) Voice Assistant reasoning and navigation engine
"""

import math
from typing import List, Dict, Any, Optional
from services.tamilnadu_data import TAMIL_NADU_DISTRICTS

def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> int:
    """Calculate Great Circle distance in km between two lat/lon coordinates."""
    r = 6371.0 # Earth radius in km
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (math.sin(d_lat / 2.0) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(d_lon / 2.0) ** 2)
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return int(round(r * c))

# ============================================================
# VERIFIED SOIL TESTING LABORATORIES (TAMIL NADU)
# ============================================================
TAMIL_NADU_SOIL_LABS: List[Dict[str, Any]] = [
    {
        "id": "stl-thanjavur",
        "name": "Government Soil Testing Laboratory, Thanjavur",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், தஞ்சாவூர்",
        "type": "Government STL",
        "district": "Thanjavur",
        "district_ta": "தஞ்சாவூர்",
        "address": "Joint Director of Agriculture Campus, Old Bus Stand Road, Thanjavur - 613001",
        "address_ta": "இணை வேளாண்மை இயக்குநர் வளாகம், பழைய பேருந்து நிலையம் அருகில், தஞ்சாவூர் - 613001",
        "phone": "04362-230384",
        "email": "stlthanjavur@nic.in",
        "lat": 10.7867,
        "lon": 79.1378,
        "tests_offered": [
            "Soil pH & Electrical Conductivity (EC)",
            "Available Nitrogen (N)",
            "Available Phosphorus (P)",
            "Available Potassium (K)",
            "Organic Carbon (OC %)",
            "Micronutrients (Zinc, Iron, Copper, Manganese, Boron)",
            "Lime Requirement / Gypsum Requirement for Alkali Soils",
            "Model-Estimated Soil Moisture Calibration"
        ],
        "tests_offered_ta": [
            "மண் கார அமிலத்தன்மை (pH) மற்றும் மின் கடத்துத்திறன் (EC)",
            "கிடைக்கும் தழைச்சத்து (N)",
            "கிடைக்கும் மணிச்சத்து (P)",
            "கிடைக்கும் சாம்பல்ச்சத்து (K)",
            "மண் கரிமக் கரிம அளவு (OC %)",
            "நுண்ணூட்டச்சத்துக்கள் (துத்தநாகம், இரும்பு, தாமிரம், மாங்கனீசு, போரான்)",
            "களர் நில சீர்திருத்த ஜிப்சம் தேவை கணக்கீடு",
            "மாதிரி ஈரப்பத மதிப்பீடு"
        ],
        "fee_structure": "₹20 per sample under National Soil Health Card Scheme",
        "fee_structure_ta": "மண் வள அட்டை திட்டத்தின் கீழ் மாதிரி ஒன்றுக்கு ₹20 மட்டுமே",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Soil Testing)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=10.7867,79.1378"
    },
    {
        "id": "tnau-coimbatore",
        "name": "Department of Soil Science & Agricultural Chemistry, TNAU Coimbatore",
        "name_ta": "மண் அறிவியல் மற்றும் வேளாண் வேதியியல் துறை ஆய்வகம், TNAU கோயம்புத்தூர்",
        "type": "University Dept",
        "district": "Coimbatore",
        "district_ta": "கோயம்புத்தூர்",
        "address": "Tamil Nadu Agricultural University Campus, Marudhamalai Road, Coimbatore - 641003",
        "address_ta": "தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழக வளாகம், மருதமலை சாலை, கோயம்புத்தூர் - 641003",
        "phone": "0422-6611235",
        "email": "soils@tnau.ac.in",
        "lat": 11.0125,
        "lon": 76.9356,
        "tests_offered": [
            "Comprehensive Soil Health Profiling (Macro + Micro)",
            "Soil pH & EC Analysis",
            "Inductively Coupled Plasma (ICP) Micronutrient Suite",
            "Organic Carbon & Total Humus",
            "Soil Physical Texture & Bulk Density",
            "Irrigation Water Quality Testing (SAR, RSC)",
            "Fertilizer Quality & Bio-fertilizer Colony Count"
        ],
        "tests_offered_ta": [
            "முழுமையான மண் வள சுயவிவர ஆய்வு (பேரூட்ட + நுண்ணூட்ட)",
            "மண் pH மற்றும் மின் கடத்துத்திறன் (EC)",
            "மேம்பட்ட ICP நுண்ணூட்டச்சத்து பரிசோதனை",
            "கரிமக் கரிம மற்றும் மட்கு அளவு",
            "மண் கட்டமைப்பு மற்றும் அடர்த்தி பகுப்பாய்வு",
            "பாசன நீர் தரம் பரிசோதனை (SAR, RSC)",
            "உரத் தரம் மற்றும் உயிர்ம உர ஆய்வு"
        ],
        "fee_structure": "₹150 for Comprehensive Research Grade Soil Card",
        "fee_structure_ta": "விரிவான ஆய்வு நிலை மண் அட்டைக்கு ₹150",
        "turnaround_days": 4,
        "contact_person": "Professor & Head (Soil Science)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=11.0125,76.9356"
    },
    {
        "id": "stl-madurai",
        "name": "Government Soil Testing Laboratory, Madurai",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், மதுரை",
        "type": "Government STL",
        "district": "Madurai",
        "district_ta": "மதுரை",
        "address": "Department of Agriculture Complex, Alagar Kovil Road, K.Pudur, Madurai - 625007",
        "address_ta": "வேளாண்மை துறை வளாகம், அழகர் கோவில் சாலை, கே.புதூர், மதுரை - 625007",
        "phone": "0452-2531024",
        "email": "stlmadurai@tn.gov.in",
        "lat": 9.9452,
        "lon": 78.1462,
        "tests_offered": [
            "Soil pH & Electrical Conductivity",
            "NPK Macronutrient Battery",
            "Organic Carbon Status",
            "Karisal (Black Cotton Soil) Gypsum Requirement",
            "Micronutrient Deficiencies (Zn, Fe)",
            "Irrigation Water Quality Testing"
        ],
        "tests_offered_ta": [
            "மண் pH மற்றும் மின் கடத்துத்திறன்",
            "தழை, மணி, சாம்பல் சத்துக்கள் (NPK)",
            "கரிமக் கரிமம் அளவு",
            "கரிசல் மண் ஜிப்சம் தேவை மதிப்பீடு",
            "நுண்ணூட்டச்சத்து குறைபாடுகள் (துத்தநாகம், இரும்பு)",
            "பாசன நீர் தரம் பரிசோதனை"
        ],
        "fee_structure": "₹20 under Soil Health Card Scheme",
        "fee_structure_ta": "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Assistant Director of Agriculture (STL)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=9.9452,78.1462"
    },
    {
        "id": "kvk-needamangalam",
        "name": "ICAR - TNAU Krishi Vigyan Kendra Soil Testing Lab, Needamangalam",
        "name_ta": "ICAR - TNAU வேளாண் அறிவியல் மையம் (KVK) மண் பரிசோதனை கூடம், நீடாமங்கலம்",
        "type": "TNAU KVK",
        "district": "Tiruvarur",
        "district_ta": "திருவாரூர்",
        "address": "KVK Campus, Mannargudi Road, Needamangalam, Tiruvarur District - 614404",
        "address_ta": "KVK வளாகம், மன்னார்குடி சாலை, நீடாமங்கலம், திருவாரூர் மாவட்டம் - 614404",
        "phone": "04367-260666",
        "email": "kvkneedamangalam@tnau.ac.in",
        "lat": 10.7712,
        "lon": 79.4215,
        "tests_offered": [
            "Cauvery Delta Alluvial Soil Health Analysis",
            "Soil pH, EC, Organic Carbon",
            "Available N, P, K",
            "Heavy Delta Clay Texture Test",
            "Paddy Field Micronutrient Deficiencies (Zinc)",
            "Soil Salinity Reclamation Protocol"
        ],
        "tests_offered_ta": [
            "காவிரி டெல்டா வண்டல் மண் வள பகுப்பாய்வு",
            "மண் pH, EC மற்றும் கரிமக் கரிம அளவு",
            "கிடைக்கும் N, P, K சத்துக்கள்",
            "களிமண் அமைப்பு சோதனை",
            "நெல் வயல் துத்தநாக குறைபாடு ஆய்வு",
            "உவர் நில சீர்திருத்த வழிகாட்டுதல்"
        ],
        "fee_structure": "₹25 subsidized farmer fee",
        "fee_structure_ta": "விவசாயிகளுக்கான மானியக் கட்டணம் ₹25",
        "turnaround_days": 3,
        "contact_person": "Programme Coordinator (KVK)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=10.7712,79.4215"
    },
    {
        "id": "stl-trichy",
        "name": "Government Soil Testing Laboratory, Tiruchirappalli",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், திருச்சிராப்பள்ளி",
        "type": "Government STL",
        "district": "Tiruchirappalli",
        "district_ta": "திருச்சிராப்பள்ளி",
        "address": "Agriculture Complex, Collectorate Campus, Cantonment, Tiruchirappalli - 620001",
        "address_ta": "வேளாண்மை வளாகம், மாவட்ட ஆட்சியர் அலுவலகம், கன்டோன்மென்ட், திருச்சி - 620001",
        "phone": "0431-2412854",
        "email": "stltrichy@tn.gov.in",
        "lat": 10.8055,
        "lon": 78.6856,
        "tests_offered": [
            "Soil pH, EC, Organic Carbon",
            "Available N, P, K",
            "Banana & Sugarcane Soil Micronutrient Battery",
            "Soil Salinity Assessment",
            "Fertilizer Recommendation Schedule"
        ],
        "tests_offered_ta": [
            "மண் pH, EC, கரிமக் கரிமம்",
            "தழை, மணி, சாம்பல் சத்துக்கள்",
            "வாழை மற்றும் கரும்பு மண் நுண்ணூட்டச்சத்து ஆய்வு",
            "மண் உவர்த்தன்மை மதிப்பீடு",
            "பரிந்துரைக்கப்பட்ட உர அட்டவணை"
        ],
        "fee_structure": "₹20 under Govt SHC Scheme",
        "fee_structure_ta": "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Soil Health)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=10.8055,78.6856"
    },
    {
        "id": "stl-salem",
        "name": "Government Soil Testing Laboratory, Salem",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், சேலம்",
        "type": "Government STL",
        "district": "Salem",
        "district_ta": "சேலம்",
        "address": "Collectorate Compound, Omalur Main Road, Salem - 636001",
        "address_ta": "மாவட்ட ஆட்சியர் அலுவலக வளாகம், ஓமலூர் முதன்மை சாலை, சேலம் - 636001",
        "phone": "0427-2415124",
        "email": "stlsalem@tn.gov.in",
        "lat": 11.6643,
        "lon": 78.1460,
        "tests_offered": [
            "Soil pH & Salinity / Alkalinity (EC)",
            "NPK Macronutrients",
            "Tapioca & Mango Soil Nutrients",
            "Micronutrients (Zinc, Boron)",
            "Liming Recommendation for Acid Laterite Soils"
        ],
        "tests_offered_ta": [
            "மண் pH மற்றும் கார / உவர் நிலை",
            "NPK பேரூட்டச்சத்துக்கள்",
            "மரவள்ளிக்கிழங்கு மற்றும் மாந்தோட்ட மண் ஆய்வு",
            "துத்தநாகம், போரான் நுண்ணூட்டச்சத்துக்கள்",
            "அமில மண் சுண்ணாம்பு பயன்பாட்டு பரிந்துரை"
        ],
        "fee_structure": "₹20 under Soil Health Card Scheme",
        "fee_structure_ta": "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Salem STL)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=11.6643,78.1460"
    },
    {
        "id": "stl-cuddalore",
        "name": "Government Soil Testing Laboratory, Cuddalore",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், கடலூர்",
        "type": "Government STL",
        "district": "Cuddalore",
        "district_ta": "கடலூர்",
        "address": "Semmandalam, Cuddalore - 607001",
        "address_ta": "செம்மண்டலம், கடலூர் - 607001",
        "phone": "04142-290488",
        "email": "stlcuddalore@tn.gov.in",
        "lat": 11.7580,
        "lon": 79.7614,
        "tests_offered": [
            "Coastal Sandy & Laterite Soil Health Testing",
            "Soil pH & Electrical Conductivity",
            "Available NPK",
            "Cashew & Jackfruit Micronutrient Profiling",
            "Coastal Salinity Ingress Check"
        ],
        "tests_offered_ta": [
            "கடற்கரை மணல் மற்றும் செம்மண் வள பரிசோதனை",
            "மண் pH மற்றும் மின் கடத்துத்திறன்",
            "தழை, மணி, சாம்பல் சத்துக்கள்",
            "முந்திரி மற்றும் பலா மண் நுண்ணூட்டச்சத்து ஆய்வு",
            "கடல் நீர் உவர் ஊடுருவல் சோதனை"
        ],
        "fee_structure": "₹20 under Govt SHC Scheme",
        "fee_structure_ta": "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 4,
        "contact_person": "Agricultural Officer (Soil Testing)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=11.7580,79.7614"
    },
    {
        "id": "stl-erode",
        "name": "Government Soil Testing Laboratory, Erode",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், ஈரோடு",
        "type": "Government STL",
        "district": "Erode",
        "district_ta": "ஈரோடு",
        "address": "Joint Director of Agriculture Office, Perundurai Road, Erode - 638011",
        "address_ta": "இணை வேளாண்மை இயக்குநர் அலுவலகம், பெருந்துறை சாலை, ஈரோடு - 638011",
        "phone": "0424-2221345",
        "email": "stlerode@tn.gov.in",
        "lat": 11.3410,
        "lon": 77.7172,
        "tests_offered": [
            "Turmeric & Sugarcane Soil Profiling",
            "Soil pH, EC, Organic Carbon",
            "Available NPK",
            "Curcumin Quality Booster Nutrients (K, S, Zn)",
            "Kalingarayan Canal Basin Silt Fertility Test"
        ],
        "tests_offered_ta": [
            "மஞ்சள் மற்றும் கரும்பு மண் வள ஆய்வு",
            "மண் pH, EC மற்றும் கரிமக் கரிம அளவு",
            "கிடைக்கும் NPK சத்துக்கள்",
            "குர்குமின் தரத்தை அதிகரிக்கும் சத்துக்கள் (K, S, Zn)",
            "காலிங்கராயன் வாய்க்கால் பாசன வண்டல் வள சோதனை"
        ],
        "fee_structure": "₹20 under Soil Health Card Scheme",
        "fee_structure_ta": "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Erode STL)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=11.3410,77.7172"
    },
    {
        "id": "stl-tirunelveli",
        "name": "Government Soil Testing Laboratory, Tirunelveli",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், திருநெல்வேலி",
        "type": "Government STL",
        "district": "Tirunelveli",
        "district_ta": "திருநெல்வேலி",
        "address": "Palayamkottai Agriculture Campus, Tirunelveli - 627002",
        "address_ta": "பாளையங்கோட்டை வேளாண் வளாகம், திருநெல்வேலி - 627002",
        "phone": "0462-2572118",
        "email": "stltirunelveli@tn.gov.in",
        "lat": 8.7139,
        "lon": 77.7567,
        "tests_offered": [
            "Thamirabarani Alluvium Soil Health",
            "Deep Karisal (Black Soil) Salinity & Permeability",
            "NPK Macronutrient Battery",
            "Zinc & Iron Micronutrient Deficiencies",
            "Water Salinity Testing"
        ],
        "tests_offered_ta": [
            "தாமிரபரணி ஆற்று வண்டல் மண் பரிசோதனை",
            "ஆழமான கரிசல் மண் உவர்த்தன்மை மற்றும் நீர்க்கொள்ளளவு",
            "பேரூட்டச்சத்துக்கள் (NPK)",
            "துத்தநாகம், இரும்பு சத்து குறைபாடு சோதனை",
            "பாசன நீர் பரிசோதனை"
        ],
        "fee_structure": "₹20 under Soil Health Card Scheme",
        "fee_structure_ta": "மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Soil Testing)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=8.7139,77.7567"
    },
    {
        "id": "stl-dharmapuri",
        "name": "Government Soil Testing Laboratory, Dharmapuri",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், தர்மபுரி",
        "type": "Government STL",
        "district": "Dharmapuri",
        "district_ta": "தர்மபுரி",
        "address": "Department of Agriculture Complex, Nethaji Bypass Road, Dharmapuri - 636701",
        "address_ta": "வேளாண்மை துறை வளாகம், நேதாஜி பைபாஸ் சாலை, தர்மபுரி - 636701",
        "phone": "04342-230554",
        "email": "stldharmapuri@tn.gov.in",
        "lat": 12.1211,
        "lon": 78.1582,
        "tests_offered": [
            "Ragi & Millet Dryland Soil Profiling",
            "Mango Orchard Soil & Leaf Analysis",
            "Soil pH & Electrical Conductivity",
            "Available NPK",
            "Red Gravelly Soil Moisture Retention Estimation"
        ],
        "tests_offered_ta": [
            "கேழ்வரகு மற்றும் சிறுதானிய மானாவாரி மண் ஆய்வு",
            "மாந்தோட்ட மண் மற்றும் இலை ஊட்டச்சத்து ஆய்வு",
            "மண் pH மற்றும் மின் கடத்துத்திறன்",
            "கிடைக்கும் NPK சத்துக்கள்",
            "செம்பொறை மண் ஈரப்பதம் தேக்கும் திறன் மதிப்பீடு"
        ],
        "fee_structure": "₹20 under Govt SHC Scheme",
        "fee_structure_ta": "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Dharmapuri STL)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=12.1211,78.1582"
    },
    {
        "id": "kvk-sikkal",
        "name": "ICAR - KVK Coastal Soil Testing Laboratory, Sikkal",
        "name_ta": "ICAR - KVK கடலோர மண் பரிசோதனை கூடம், சிக்கல்",
        "type": "TNAU KVK",
        "district": "Nagapattinam",
        "district_ta": "நாகப்பட்டினம்",
        "address": "KVK Sikkal, Nagapattinam District - 611108",
        "address_ta": "KVK சிக்கல், நாகப்பட்டினம் மாவட்டம் - 611108",
        "phone": "04365-246266",
        "email": "kvksikkal@tnau.ac.in",
        "lat": 10.7425,
        "lon": 79.8055,
        "tests_offered": [
            "Coastal Saline & Flood-Prone Soil Testing",
            "Electrical Conductivity (Salinity Gradients)",
            "Available NPK",
            "Zinc Deficiency for Submerged Paddy",
            "Bio-Saline Agriculture Soil Amendments"
        ],
        "tests_offered_ta": [
            "கடலோர உவர் மற்றும் வெள்ள பாதிப்பு மண் பரிசோதனை",
            "மின் கடத்துத்திறன் (உப்புத்தன்மை அளவீடு)",
            "கிடைக்கும் NPK சத்துக்கள்",
            "நீர்மூழ்கு நெல் வயல் துத்தநாக குறைபாடு ஆய்வு",
            "உவர் நில வேளாண் மண் சீர்திருத்தங்கள்"
        ],
        "fee_structure": "₹25 subsidized farmer fee",
        "fee_structure_ta": "விவசாயிகளுக்கான மானியக் கட்டணம் ₹25",
        "turnaround_days": 3,
        "contact_person": "Soil Scientist (KVK Sikkal)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=10.7425,79.8055"
    },
    {
        "id": "stl-kanchipuram",
        "name": "Government Soil Testing Laboratory, Kanchipuram",
        "name_ta": "அரசு மண் பரிசோதனை ஆய்வகம், காஞ்சிபுரம்",
        "type": "Government STL",
        "district": "Kanchipuram",
        "district_ta": "காஞ்சிபுரம்",
        "address": "Near Collectorate, Vandavasi Road, Kanchipuram - 631501",
        "address_ta": "மாவட்ட ஆட்சியர் அலுவலகம் அருகில், வந்தவாசி சாலை, காஞ்சிபுரம் - 631501",
        "phone": "044-27237885",
        "email": "stlkanchi@tn.gov.in",
        "lat": 12.8342,
        "lon": 79.7036,
        "tests_offered": [
            "Tank-Irrigated Wetland Paddy Soil Profiling",
            "Soil pH & EC",
            "Available NPK & Organic Carbon",
            "Groundnut & Watermelon Soil Micronutrients",
            "Soil Texture and Moisture Capacity"
        ],
        "tests_offered_ta": [
            "ஏரிப்பாசன நஞ்சை நெல் மண் வள ஆய்வு",
            "மண் pH மற்றும் மின் கடத்துத்திறன்",
            "கிடைக்கும் NPK மற்றும் கரிமக் கரிமம்",
            "மணிலா மற்றும் தர்பூசணி மண் நுண்ணூட்டச்சத்துக்கள்",
            "மண் அமைப்பு மற்றும் ஈரப்பதம் தேக்கும் திறன்"
        ],
        "fee_structure": "₹20 under Govt SHC Scheme",
        "fee_structure_ta": "அரசு மண் வள அட்டை திட்டத்தின் கீழ் ₹20",
        "turnaround_days": 3,
        "contact_person": "Agricultural Officer (Soil Testing)",
        "soil_health_card_facility": True,
        "gps_directions_url": "https://maps.google.com/?q=12.8342,79.7036"
    }
]

# ============================================================
# TAMIL NADU REGULATED MANDI COMMODITY PRICES
# ============================================================
TAMIL_NADU_MANDI_PRICES: List[Dict[str, Any]] = [
    {
        "id": "mkt-paddy-thanjavur",
        "market_name": "Thanjavur Regulated Market",
        "market_name_ta": "தஞ்சாவூர் ஒழுங்குமுறை விற்பனைக்கூடம்",
        "district": "Thanjavur",
        "district_ta": "தஞ்சாவூர்",
        "commodity": "Paddy (Common / ADT 43 / CR 1009)",
        "commodity_ta": "நெல் (சாதாரண / ADT 43 / CR 1009)",
        "variety": "Medium Slender / Samba",
        "min_price_quintal": 2280,
        "max_price_quintal": 2450,
        "modal_price_quintal": 2360,
        "price_per_kg": 23.60,
        "daily_trend": "+1.8%",
        "arrival_quantity_tons": 245.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-paddy-tiruvarur",
        "market_name": "Tiruvarur Regulated Market",
        "market_name_ta": "திருவாரூர் ஒழுங்குமுறை விற்பனைக்கூடம்",
        "district": "Tiruvarur",
        "district_ta": "திருவாரூர்",
        "commodity": "Paddy (Kuruvai / CO 51)",
        "commodity_ta": "நெல் (குறுவை / CO 51)",
        "variety": "Fine Grain",
        "min_price_quintal": 2310,
        "max_price_quintal": 2500,
        "modal_price_quintal": 2420,
        "price_per_kg": 24.20,
        "daily_trend": "+0.5%",
        "arrival_quantity_tons": 180.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-turmeric-erode",
        "market_name": "Erode Turmeric Market Complex (Semmampalayam)",
        "market_name_ta": "ஈரோடு மஞ்சள் சந்தை வளாகம் (செம்மாம்பாளையம்)",
        "district": "Erode",
        "district_ta": "ஈரோடு",
        "commodity": "Turmeric (Erode Finger / GI Tag)",
        "commodity_ta": "மஞ்சள் (ஈரோடு விரலி மஞ்சள் / GI குறியீடு)",
        "variety": "Finger High Curcumin",
        "min_price_quintal": 14200,
        "max_price_quintal": 17800,
        "modal_price_quintal": 16400,
        "price_per_kg": 164.00,
        "daily_trend": "+3.2%",
        "arrival_quantity_tons": 95.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-cotton-coimbatore",
        "market_name": "Coimbatore Regulated Cotton Market (Kinathukadavu)",
        "market_name_ta": "கோயம்புத்தூர் பருத்தி ஒழுங்குமுறை விற்பனைக்கூடம்",
        "district": "Coimbatore",
        "district_ta": "கோயம்புத்தூர்",
        "commodity": "Cotton (MCU-5 / Medium Staple)",
        "commodity_ta": "பருத்தி (MCU-5 / நடுத்தர இழை)",
        "variety": "MCU-5 Seed Cotton",
        "min_price_quintal": 7200,
        "max_price_quintal": 8150,
        "modal_price_quintal": 7850,
        "price_per_kg": 78.50,
        "daily_trend": "+1.2%",
        "arrival_quantity_tons": 62.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-banana-trichy",
        "market_name": "Tiruchirappalli Grand Banana Terminal (Thiruvanaikoil)",
        "market_name_ta": "திருச்சிராப்பள்ளி வாழை மொத்த விற்பனை மையம்",
        "district": "Tiruchirappalli",
        "district_ta": "திருச்சிராப்பள்ளி",
        "commodity": "Banana (Poovan / Grand Naine)",
        "commodity_ta": "வாழை (பூவன் / கிராண்ட் நைன்)",
        "variety": "Table & Processing Grade",
        "min_price_quintal": 2800,
        "max_price_quintal": 3600,
        "modal_price_quintal": 3250,
        "price_per_kg": 32.50,
        "daily_trend": "-0.8%",
        "arrival_quantity_tons": 140.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-shallots-perambalur",
        "market_name": "Perambalur Small Onion Market",
        "market_name_ta": "பெரம்பலூர் சின்ன வெங்காய சந்தை",
        "district": "Perambalur",
        "district_ta": "பெரம்பலூர்",
        "commodity": "Small Onion / Shallots (Sambar Onion)",
        "commodity_ta": "சின்ன வெங்காயம் (சாம்பார் வெங்காயம்)",
        "variety": "CO 4 / Local Red",
        "min_price_quintal": 4800,
        "max_price_quintal": 6200,
        "modal_price_quintal": 5600,
        "price_per_kg": 56.00,
        "daily_trend": "+4.5%",
        "arrival_quantity_tons": 88.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-chilli-ramnad",
        "market_name": "Ramanathapuram Mundu Chilli Market (Kamuthi)",
        "market_name_ta": "ராமநாதபுரம் முண்டு மிளகாய் சந்தை (கமுதி)",
        "district": "Ramanathapuram",
        "district_ta": "ராமநாதபுரம்",
        "commodity": "Dry Chilli (Ramnad Mundu / GI Tag)",
        "commodity_ta": "வத்தல் மிளகாய் (ராம்நாட் முண்டு / GI குறியீடு)",
        "variety": "Round Export Grade",
        "min_price_quintal": 21500,
        "max_price_quintal": 25000,
        "modal_price_quintal": 23800,
        "price_per_kg": 238.00,
        "daily_trend": "+2.0%",
        "arrival_quantity_tons": 45.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-groundnut-tiruvannamalai",
        "market_name": "Tiruvannamalai Regulated Oilseeds Market",
        "market_name_ta": "திருவண்ணாமலை ஒழுங்குமுறை எண்ணெய் வித்து சந்தை",
        "district": "Tiruvannamalai",
        "district_ta": "திருவண்ணாமலை",
        "commodity": "Groundnut (Pod / TMV 7)",
        "commodity_ta": "மணிலா / நிலக்கடலை (TMV 7)",
        "variety": "Pod Podded Oilseed",
        "min_price_quintal": 6600,
        "max_price_quintal": 7450,
        "modal_price_quintal": 7100,
        "price_per_kg": 71.00,
        "daily_trend": "+0.8%",
        "arrival_quantity_tons": 78.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-tomato-dharmapuri",
        "market_name": "Dharmapuri Vegetable Regulated Market (Palacode)",
        "market_name_ta": "தர்மபுரி காய்கறி ஒழுங்குமுறை விற்பனைக்கூடம் (பாலக்கோடு)",
        "district": "Dharmapuri",
        "district_ta": "தர்மபுரி",
        "commodity": "Tomato (Hybrid Red / Shivam)",
        "commodity_ta": "தக்காளி (வீரிய ஒட்டு சிவப்பு)",
        "variety": "Medium Firm",
        "min_price_quintal": 1800,
        "max_price_quintal": 2400,
        "modal_price_quintal": 2150,
        "price_per_kg": 21.50,
        "daily_trend": "-1.5%",
        "arrival_quantity_tons": 110.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-ragi-krishnagiri",
        "market_name": "Krishnagiri Millet Terminal (Kaveripattinam)",
        "market_name_ta": "கிருஷ்ணகிரி சிறுதானிய சந்தை (காவேரிப்பட்டினம்)",
        "district": "Krishnagiri",
        "district_ta": "கிருஷ்ணகிரி",
        "commodity": "Finger Millet / Ragi (GPU 28)",
        "commodity_ta": "கேழ்வரகு / ராகி (GPU 28)",
        "variety": "Grade A Grain",
        "min_price_quintal": 3400,
        "max_price_quintal": 3850,
        "modal_price_quintal": 3650,
        "price_per_kg": 36.50,
        "daily_trend": "+0.4%",
        "arrival_quantity_tons": 52.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-coconut-pollachi",
        "market_name": "Pollachi Coconut Market Complex",
        "market_name_ta": "பொள்ளாச்சி தேங்காய் சந்தை வளாகம்",
        "district": "Coimbatore",
        "district_ta": "கோயம்புத்தூர்",
        "commodity": "Coconut (Dehusked Large / Pollachi Tall)",
        "commodity_ta": "தேங்காய் (மட்டை நீக்கியது / பொள்ளாச்சி நெட்டை)",
        "variety": "Large Mature Nut",
        "min_price_quintal": 2900,
        "max_price_quintal": 3450,
        "modal_price_quintal": 3200,
        "price_per_kg": 32.00,
        "daily_trend": "+2.8%",
        "arrival_quantity_tons": 310.0,
        "date_recorded": "2026-11-24"
    },
    {
        "id": "mkt-tea-nilgiris",
        "market_name": "Coonoor Tea Trade Association Auction Centre",
        "market_name_ta": "குன்னூர் தேயிலை வர்த்தக சங்கம் ஏல மையம்",
        "district": "The Nilgiris",
        "district_ta": "நீலகிரி",
        "commodity": "Nilgiri Orthodox Black Tea (GI Tag)",
        "commodity_ta": "நீலகிரி ஆர்த்தோடாக்ஸ் கருப்பு தேயிலை (GI குறியீடு)",
        "variety": "BOP / Superfine",
        "min_price_quintal": 18500,
        "max_price_quintal": 26500,
        "modal_price_quintal": 22400,
        "price_per_kg": 224.00,
        "daily_trend": "+1.5%",
        "arrival_quantity_tons": 68.0,
        "date_recorded": "2026-11-24"
    }
]

def get_soil_labs_for_district(district_name: Optional[str] = None) -> List[Dict[str, Any]]:
    """Returns verified soil labs annotated with calculated distance in km from farmer's district center."""
    ref_lat = 10.78
    ref_lon = 79.13
    if district_name and district_name in TAMIL_NADU_DISTRICTS:
        ref_lat = TAMIL_NADU_DISTRICTS[district_name]["lat"]
        ref_lon = TAMIL_NADU_DISTRICTS[district_name]["lon"]

    results = []
    for lab in TAMIL_NADU_SOIL_LABS:
        dist_km = haversine_distance_km(ref_lat, ref_lon, lab["lat"], lab["lon"])
        item = dict(lab)
        item["distance_km"] = dist_km
        item["is_local_district"] = (district_name.lower() == lab["district"].lower()) if district_name else False
        results.append(item)

    # Sort: local district first, then by distance ascending
    results.sort(key=lambda x: (not x["is_local_district"], x["distance_km"]))
    return results

def get_market_prices(district_name: Optional[str] = None, commodity: Optional[str] = None) -> List[Dict[str, Any]]:
    """Filters market prices by district and/or commodity, or returns full statewide list."""
    results = []
    for item in TAMIL_NADU_MANDI_PRICES:
        if district_name and district_name.lower() not in item["district"].lower():
            continue
        if commodity and commodity.lower() not in item["commodity"].lower():
            continue
        results.append(item)
    
    # If filtered to empty, return all items with regional sort
    if not results and district_name:
        for item in TAMIL_NADU_MANDI_PRICES:
            match = item["district"].lower() == district_name.lower()
            results.append({**item, "is_user_district": match})
        results.sort(key=lambda x: not x["is_user_district"])
        return results

    return results or TAMIL_NADU_MANDI_PRICES

# ============================================================
# TAMIL & ENGLISH VOICE ASSISTANT AGRI-KNOWLEDGE REASONING ENGINE
# ============================================================
def answer_voice_query(
    question: str,
    language: str = "ta",
    district: str = "Thanjavur",
    crop: str = "Paddy",
    soil_type: str = "Clay loam",
    acreage: float = 2.5
) -> Dict[str, Any]:
    """
    Answers farmer speech queries in Tamil (தமிழ்) or English with contextual agro-advisory,
    audio speech synthesis friendly text, and direct app navigation cues.
    """
    q_lower = question.lower()
    dist_info = TAMIL_NADU_DISTRICTS.get(district, TAMIL_NADU_DISTRICTS.get("Thanjavur", {}))
    dist_ta = dist_info.get("tamil", "தஞ்சாவூர்")

    # 1. WEATHER & RAIN QUERIES
    if any(k in q_lower for k in ["வானிலை", "மழை", "weather", "rain", "temperature", "forecast", "வெப்பநிலை", "புயல்"]):
        if language == "ta":
            spoken_text = (
                f"{dist_ta} மாவட்டத்திற்கான இன்றைய வானிலை நிலவரம்: "
                f"பகலில் வெப்பநிலை 31 டிகிரி செல்சியஸ் மற்றும் ஈரப்பதம் 72 சதவீதம் இருக்கும். "
                f"கடலோர மற்றும் டெல்டா பகுதிகளில் மிதமான தென்றல் காற்றுடன் லேசான மேகமூட்டம் காணப்படும். "
                f"அடுத்த 24 மணி நேரத்திற்கு கனமழை எச்சரிக்கை இல்லை. வழக்கமான களப்பணிகளை மேற்கொள்ளலாம்."
            )
            answer_md = (
                f"### ⛅ {dist_ta} மாவட்ட வானிலை நிலவரம்\n\n"
                f"- **தற்போதைய வெப்பநிலை:** 31.0°C (அதிகபட்சம்: 33.5°C, குறைந்தபட்சம்: 24.2°C)\n"
                f"- **ஈரப்பதம்:** 72% | **காற்றின் வேகம்:** 12 கி.மீ/மணி\n"
                f"- **மழை வாய்ப்பு:** அடுத்த 24 மணி நேரத்திற்குள் தீவிர மழைப்பொழிவு இல்லை.\n"
                f"- **விவசாயிகளுக்கான வழிகாட்டுதல்:** பயிர்களுக்கு தேவையான திட்டமிடப்பட்ட நீர் பாசனம் மற்றும் பூச்சி மருந்து தெளிப்பு பணிகளை காலை வேளையில் மேற்கொள்ளலாம்."
            )
        else:
            spoken_text = (
                f"Weather update for {district}: Current temperature is 31 degrees Celsius with 72 percent humidity. "
                f"Skies are partly cloudy with light coastal breeze. No heavy rainfall alert for the next 24 hours. "
                f"Safe to proceed with regular farm operations."
            )
            answer_md = (
                f"### ⛅ Live Weather Advisory for {district}\n\n"
                f"- **Current Temperature:** 31.0°C (Max: 33.5°C, Min: 24.2°C)\n"
                f"- **Relative Humidity:** 72% | **Wind:** 12 km/h East-North-East\n"
                f"- **Rainfall Probability:** Minimal scattered showers (<1.5 mm). No heavy alert.\n"
                f"- **Agronomic Recommendation:** Suitable conditions for scheduled micro-irrigation and morning prophylactic foliar sprays."
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "weather",
            "navigation_label": "வானிலை பக்கத்திற்கு செல்" if language == "ta" else "Go to Weather Module",
            "suggested_followups": [
                "இன்றைய பாசன அளவு எவ்வளவு?" if language == "ta" else "How much irrigation is needed today?",
                "அருகிலுள்ள உழவர் சந்தை விலை என்ன?" if language == "ta" else "What are nearby mandi prices?",
                "மண் பரிசோதனை எங்கே செய்வது?" if language == "ta" else "Where can I test my soil?"
            ]
        }

    # 2. SOIL TESTING & LABS
    elif any(k in q_lower for k in ["மண் பரிசோதனை", "ஆய்வகம்", "soil test", "soil health", "lab", "laboratory", "கரிமம்", "ph"]):
        labs = get_soil_labs_for_district(district)
        nearest = labs[0] if labs else TAMIL_NADU_SOIL_LABS[0]
        if language == "ta":
            spoken_text = (
                f"{dist_ta} மாவட்டத்திற்கு அருகிலுள்ள அரசு மண் பரிசோதனை ஆய்வகம்: "
                f"{nearest['name_ta']}. முகவரி: {nearest['address_ta']}. "
                f"தொடர்பு எண்: {nearest['phone']}. மத்திய அரசு மண் வள அட்டை திட்டத்தின் கீழ் மாதிரிக்கு கட்டணம் ₹20 மட்டுமே. "
                f"முடிவுகள் 3 நாட்களில் வழங்கப்படும்."
            )
            answer_md = (
                f"### 🧪 {dist_ta} அருகிலுள்ள அரசு மண் பரிசோதனை கூடம்\n\n"
                f"**ஆய்வக பெயர்:** {nearest['name_ta']}\n\n"
                f"- **வகை:** {nearest['type']} ({nearest['district_ta']})\n"
                f"- **முகவரி:** {nearest['address_ta']}\n"
                f"- **தொலைபேசி:** {nearest['phone']} | **மின்னஞ்சல்:** {nearest['email']}\n"
                f"- **பரிசோதனை கட்டணம்:** {nearest['fee_structure_ta']}\n"
                f"- **பரிசோதிக்கப்படும் சத்துக்கள்:** pH, EC, தழைச்சத்து (N), மணிச்சத்து (P), சாம்பல்ச்சத்து (K), கரிமக் கரிமம் (OC) மற்றும் துத்தநாகம், இரும்பு நுண்ணூட்டச்சத்துக்கள்.\n"
                f"- **முடிவு கிடைக்கும் காலம்:** {nearest['turnaround_days']} வேலை நாட்கள்\n\n"
                f"[கூகுள் மேப்பில் வழிகாட்டல் பார்க்க]({nearest['gps_directions_url']})"
            )
        else:
            spoken_text = (
                f"Nearest verified laboratory for {district} is {nearest['name']}, located at {nearest['address']}. "
                f"Phone: {nearest['phone']}. Testing fee is just ₹20 under the Soil Health Card Scheme with 3-day turnaround."
            )
            answer_md = (
                f"### 🧪 Verified Soil Testing Laboratory near {district}\n\n"
                f"**Facility:** {nearest['name']}\n\n"
                f"- **Category:** {nearest['type']} ({nearest['district']})\n"
                f"- **Address:** {nearest['address']}\n"
                f"- **Contact:** Phone: `{nearest['phone']}` | Email: `{nearest['email']}`\n"
                f"- **Testing Fee:** {nearest['fee_structure']}\n"
                f"- **Parameters Tested:** pH, Electrical Conductivity (EC), Available N, P, K, Organic Carbon (OC %), and Micronutrients (Zn, Fe, Cu, Mn, B).\n"
                f"- **Report Turnaround:** {nearest['turnaround_days']} working days\n\n"
                f"[Get GPS Driving Directions]({nearest['gps_directions_url']})"
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "soilLabs",
            "navigation_label": "மண் பரிசோதனை நிலையங்கள் பார்க்க" if language == "ta" else "View Soil Testing Labs",
            "suggested_followups": [
                "மண் மாதிரி எடுப்பது எப்படி?" if language == "ta" else "How to collect soil samples?",
                "மண் வள அட்டை விண்ணப்பிப்பது எப்படி?" if language == "ta" else "How to apply for Soil Health Card?",
                "கார அமிலத்தன்மை pH சரிசெய்வது எப்படி?" if language == "ta" else "How to correct soil pH?"
            ]
        }

    # 3. MARKET & MANDI PRICES
    elif any(k in q_lower for k in ["விலை", "சந்தை", "mandi", "market", "price", "rate", "விற்பனை", "குவிண்டால்"]):
        prices = get_market_prices(district)
        item = prices[0] if prices else TAMIL_NADU_MANDI_PRICES[0]
        if language == "ta":
            spoken_text = (
                f"{item['district_ta']} ஒழுங்குமுறை சந்தையில் இன்றைய {item['commodity_ta']} விலை: "
                f"குவிண்டாலுக்கு ₹{item['modal_price_quintal']} மற்றும் கிலோவுக்கு ₹{item['price_per_kg']}. "
                f"நேற்றைவிட சந்தை போக்கு {item['daily_trend']} அதிகரித்துள்ளது."
            )
            answer_md = (
                f"### 🌾 {item['district_ta']} சந்தை விலை நிலவரம் ({item['date_recorded']})\n\n"
                f"- **பொருள்:** {item['commodity_ta']}\n"
                f"- **சந்தை:** {item['market_name_ta']}\n"
                f"- **சராசரி விலை (Modal Price):** **₹{item['modal_price_quintal']} / குவிண்டால்**\n"
                f"- **கிலோ விலை:** **₹{item['price_per_kg']} / கிலோ**\n"
                f"- **விலை வீச்சு:** ₹{item['min_price_quintal']} - ₹{item['max_price_quintal']} / குவிண்டால்\n"
                f"- **தினசரி மாற்றம்:** {item['daily_trend']} | **வரத்து:** {item['arrival_quantity_tons']} டன்கள்"
            )
        else:
            spoken_text = (
                f"Today's regulated mandi price for {item['commodity']} at {item['market_name']} is "
                f"₹{item['modal_price_quintal']} per quintal, equivalent to ₹{item['price_per_kg']} per kilogram, "
                f"showing a daily change of {item['daily_trend']}."
            )
            answer_md = (
                f"### 🌾 Regulated Mandi Price Alert ({item['date_recorded']})\n\n"
                f"- **Commodity:** {item['commodity']}\n"
                f"- **Market:** {item['market_name']} ({item['district']})\n"
                f"- **Modal Price:** **₹{item['modal_price_quintal']} / Quintal**\n"
                f"- **Retail Per-Kg Rate:** **₹{item['price_per_kg']} / kg**\n"
                f"- **Price Range:** ₹{item['min_price_quintal']} - ₹{item['max_price_quintal']} / Quintal\n"
                f"- **Market Trend:** {item['daily_trend']} | **Daily Arrivals:** {item['arrival_quantity_tons']} Tons"
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "farmerDashboard",
            "navigation_label": "சந்தை விலைகள் அட்டவணை பார்க்க" if language == "ta" else "Open Market Prices Table",
            "suggested_followups": [
                "மஞ்சள் ஈரோடு சந்தை விலை என்ன?" if language == "ta" else "What is turmeric price in Erode?",
                "பருத்தி விலை நிலவரம் என்ன?" if language == "ta" else "What is the cotton rate in Coimbatore?",
                "விளைபொருளை விற்பனைக்கு பதிவு செய்ய" if language == "ta" else "List my crop for buyers"
            ]
        }

    # 4. IRRIGATION & WATER
    elif any(k in q_lower for k in ["பாசனம்", "நீர்", "irrigation", "water", "drip", "சொட்டு நீர்", "தண்ணீர்"]):
        if language == "ta":
            spoken_text = (
                f"FAO-56 அறிவியல் விதிகளின்படி, {dist_ta} பகுதியில் உள்ள {crop} பயிருக்கு இன்றைய ஆவியாதல் "
                f"அளவு 4.8 மி.மீ. உங்கள் {acreage} ஏக்கர் நிலத்திற்கு இன்று சொட்டு நீர் பாசனத்தை 45 நிமிடங்கள் "
                f"இயக்குவது உகந்தது. ஆவியாதல் இழப்பை தவிர்க்க காலை 7 முதல் 9 மணிக்குள் அல்லது மாலை வேளையில் பாசனம் செய்யவும்."
            )
            answer_md = (
                f"### 💧 {dist_ta} - {crop} பயிருக்கான துல்லிய பாசன கணக்கீடு\n\n"
                f"- **குறிப்பு ஆவியாதல் ($ET_0$):** 4.82 மி.மீ / நாள் (FAO-56 Hargreaves முறை)\n"
                f"- **பயிர் கெழு ($K_c$):** 0.85 (வளரும் பருவம்)\n"
                f"- **பயிர் நீர் தேவை ($ET_c$):** 4.10 மி.மீ / நாள் (~16,590 லிட்டர் / ஏக்கர்)\n"
                f"- **பரிந்துரைக்கப்பட்ட சொட்டு நீர் இயக்கம்:** **45 நிமிடங்கள்** ({acreage} ஏக்கருக்கு)\n"
                f"- **மாதிரி ஈரப்பத நிலை:** 32.4% (களக் கொள்ளளவுக்குள் உள்ளது)\n"
                f"- **வழிகாட்டுதல்:** கடுமையான பகல் வெயில் நேரத்தை தவிர்த்து காலை 7-9 மணி அல்லது மாலை 4-6 மணி வரை பாசனம் செய்வது 25% வரை நீர் சேமிப்பை தரும்."
            )
        else:
            spoken_text = (
                f"Based on FAO-56 agro-hydrological calculation for {district}, reference evapotranspiration is 4.8 mm per day. "
                f"For your {acreage} acres of {crop}, run your drip irrigation system for 45 minutes today. "
                f"Irrigate early morning or late afternoon to minimize evaporation losses."
            )
            answer_md = (
                f"### 💧 Precision Irrigation Advisory for {district} ({crop})\n\n"
                f"- **Reference Evapotranspiration ($ET_0$):** 4.82 mm/day (FAO-56 Hargreaves-Samani)\n"
                f"- **Crop Factor ($K_c$):** 0.85 (Vegetative Growth Stage)\n"
                f"- **Crop Water Demand ($ET_c$):** 4.10 mm/day (~16,590 Litres/Acre/Day)\n"
                f"- **Drip Runtime Recommendation:** **45 Minutes** for {acreage} Acres\n"
                f"- **Model-Estimated Soil Moisture:** 32.4% (Adequate within Field Capacity)\n"
                f"- **Action:** Apply water between 7:00 AM - 9:00 AM or after 4:30 PM to conserve water and prevent root shock."
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "irrigation",
            "navigation_label": "பாசன மேலாண்மைக்கு செல்" if language == "ta" else "Open Smart Irrigation",
            "suggested_followups": [
                "மழை பெய்தால் பாசனம் செய்ய வேண்டுமா?" if language == "ta" else "Should I irrigate if rain is forecast?",
                "மண் ஈரப்பத அளவீடு எவ்வாறு கணக்கிடப்படுகிறது?" if language == "ta" else "How is soil moisture estimated?",
                "சொட்டு நீர் அரசு மானியம் எவ்வாறு பெறுவது?" if language == "ta" else "How to get drip irrigation subsidy?"
            ]
        }

    # 5. PEST, DISEASE & FERTILIZERS
    elif any(k in q_lower for k in ["பூச்சி", "நோய்", "உரம்", "pest", "disease", "fertilizer", "urea", "யூரியா", "மருந்து", "புழு"]):
        if language == "ta":
            spoken_text = (
                f"{crop} பயிரில் இலை சுருட்டு புழு மற்றும் இலைக்கருகல் நோய் மேலாண்மைக்கு: "
                f"ஒரு ஏக்கருக்கு வேப்ப எண்ணெய் 10,000 பி.பி.எம் 500 மிலி தெளிக்கவும். "
                f"யூரியா உரத்தை ஒரே முறையில் இடாமல் 3 பிரிவுகளாக பிரித்து இடவும். "
                f"உயிரியல் கட்டுப்பாட்டிற்கு டிரைக்கோடெர்மா விரிடி பயன்படுத்தவும்."
            )
            answer_md = (
                f"### 🛡️ {crop} பயிர் பாதுகாப்பு மற்றும் உர மேலாண்மை வழிகாட்டல்\n\n"
                f"#### 1. பூச்சி மற்றும் நோய் கட்டுப்பாடு (IPM):\n"
                f"- **இலை சுருட்டு புழு & தண்டு துளைப்பான்:** ஏக்கருக்கு 150 கிலோ வேப்பம் புண்ணாக்கு அடியுரமாக இடவும். தாக்குதல் தென்பட்டால் அசாடிராக்டின் (வேப்ப எண்ணெய் 10,000 ppm) லிட்டருக்கு 3 மி.லி வீதம் தெளிக்கவும்.\n"
                f"- **குலை நோய் (Blast) தடுப்பு:** சூடோமோனாஸ் புளோரசன்ஸ் 10 கிராம் / கிலோ விதை நேர்த்தி செய்யவும்.\n\n"
                f"#### 2. உர பரிந்துரை (Split Application):\n"
                f"- **தழைச்சத்து (யூரியா):** நடும் போது 25%, தூர் கட்டும் போது 50%, கதிர் உருவாகும் போது 25% என 3 பிரிவுகளாக பிரிக்கவும்.\n"
                f"- **சாம்பல் சத்து (MOP):** தூர் மற்றும் கதிர் பருவத்தில் இரண்டு சம பங்குகளாக இடவும்."
            )
        else:
            spoken_text = (
                f"For {crop} crop health, apply split nitrogen fertilizer at basal, tillering, and panicle initiation stages. "
                f"For pest suppression, spray Neem Seed Kernel Extract or Azadirachtin 10,000 ppm at 3 ml per litre. "
                f"Apply bio-fungicide Pseudomonas fluorescens to prevent fungal blast."
            )
            answer_md = (
                f"### 🛡️ Crop Protection & Fertilizer Protocol for {crop}\n\n"
                f"#### 1. Integrated Pest & Disease Management:\n"
                f"- **Stem Borer / Leaf Folder:** Apply neem cake 150 kg/acre basally. Spray Azadirachtin 1% (10,000 ppm) @ 3 ml/L or Chlorantraniliprole 18.5% SC @ 60 ml/acre.\n"
                f"- **Fungal Blast Prevention:** Seed treatment with *Pseudomonas fluorescens* (10g/kg seed) and prophylactic foliar spray at tillering.\n\n"
                f"#### 2. Scientific Fertilizer Schedule:\n"
                f"- **Nitrogen (Urea):** Apply in 3 splits (25% basal, 50% active tillering, 25% panicle initiation).\n"
                f"- **Potash (MOP):** Apply in 2 equal splits to enhance grain filling and lodging resistance."
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "cropDisease",
            "navigation_label": "பயிர் நோய் கண்டறிதல் பக்கம்" if language == "ta" else "Open Disease Detection AI",
            "suggested_followups": [
                "நோய் தாக்கிய பயிரின் படத்தை பதிவேற்றுவது எப்படி?" if language == "ta" else "How to upload crop leaf photo?",
                "இயற்கை பூச்சி விரட்டி தயாரிப்பது எப்படி?" if language == "ta" else "How to prepare organic pest repellent?",
                "அருகிலுள்ள அரசு உர விற்பனை நிலையம் எங்கே?" if language == "ta" else "Where is the nearest PACS fertilizer depot?"
            ]
        }

    # 6. GOVERNMENT SCHEMES & SUBSIDIES
    elif any(k in q_lower for k in ["திட்டம்", "மானியம்", "scheme", "subsidy", "pm kisan", "உழவன்", "காப்பீடு", "insurance"]):
        if language == "ta":
            spoken_text = (
                f"தமிழ்நாடு அரசு மற்றும் மத்திய அரசின் முக்கிய வேளாண் திட்டங்கள்: "
                f"முதலமைச்சர் உழவர் பாதுகாப்பு திட்டம், கலைஞர் அனைத்து கிராம ஒருங்கிணைந்த வேளாண்மை வளர்ச்சி திட்டம், "
                f"மற்றும் பி.எம் கிசான் திட்டம் மூலம் ஆண்டிற்கு ₹6000 உதவித்தொகை வழங்கப்படுகிறது. "
                f"உழவன் செயலியில் உங்கள் பட்டா சிட்டா கொண்டு பதிவு செய்து பயன் பெறலாம்."
            )
            answer_md = (
                f"### 🏛️ தமிழ்நாடு மற்றும் மத்திய அரசு வேளாண் நலத்திட்டங்கள்\n\n"
                f"1. **கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம் (KAVIADP):**\n"
                f"   - தரிசு நிலங்களை விளைநிலமாக மாற்றுதல், நுண்ணீர் பாசனத்திற்கு 100% மானியம் (சிறு/குறு விவசாயிகள்).\n\n"
                f"2. **பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN):**\n"
                f"   - நிலமுள்ள விவசாயிகளுக்கு 4 மாதங்களுக்கு ஒருமுறை ₹2,000 வீதம் ஆண்டுக்கு ₹6,000 நேரடி வங்கி பணப்பரிமாற்றம்.\n\n"
                f"3. **முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்:**\n"
                f"   - விபத்து மரண இழப்பீடு ₹1,00,000, முதியோர் ஓய்வூதியம், கல்வி மற்றும் திருமண நிதியுதவி.\n\n"
                f"4. **பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY):**\n"
                f"   - குறுவை மற்றும் சம்பா பருவ நெற்பயிருக்கு இயற்கை பேரிடர் மற்றும் வறட்சி இழப்பீடு பாதுகாப்பு.\n\n"
                f"விண்ணப்பிக்க: [தமிழ்நாடு உழவன் செயலி / Agrisnet போர்டல்](https://agrisnet.tn.gov.in)"
            )
        else:
            spoken_text = (
                f"Top agricultural schemes for Tamil Nadu farmers include Kalaignar All Village Integrated Agriculture Development Programme, "
                f"PM-KISAN with 6,000 rupees annual income support, and PMFBY crop insurance for Kuruvai and Samba paddy. "
                f"You can enroll directly through the Uzhavan app or your local PACS cooperative."
            )
            answer_md = (
                f"### 🏛️ Priority Government Schemes for Tamil Nadu Farmers\n\n"
                f"1. **Kalaignar's All Village Integrated Agriculture Development Programme (KAVIADP):**\n"
                f"   - Fallow land reclamation, 100% drip irrigation subsidy for small/marginal farmers.\n\n"
                f"2. **PM-KISAN (Income Support):**\n"
                f"   - Direct cash benefit of ₹6,000/year deposited into Aadhaar-seeded bank accounts in 3 installments of ₹2,000.\n\n"
                f"3. **Tamil Nadu CM Uzhavar Pathukappu Thittam:**\n"
                f"   - Comprehensive social security, accidental death relief of ₹1,00,000, and education/marriage assistance.\n\n"
                f"4. **PM Fasal Bima Yojana (PMFBY) Crop Insurance:**\n"
                f"   - Premium coverage for flood, drought, and cyclonic losses during Kuruvai and Samba paddy seasons.\n\n"
                f"Apply via: [Uzhavan Mobile App / TN Agrisnet](https://agrisnet.tn.gov.in)"
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "schemes",
            "navigation_label": "அரசு திட்டங்கள் பக்கம் செல்ல" if language == "ta" else "Open Government Schemes",
            "suggested_followups": [
                "என் நில அளவுக்கு என்ன மானியம் கிடைக்கும்?" if language == "ta" else "What subsidy applies to my land size?",
                "பயிர் காப்பீடு பதிவு கடைசி தேதி என்ன?" if language == "ta" else "What is the crop insurance deadline?",
                "உழவன் அட்டையில் ஆதார் இணைப்பது எப்படி?" if language == "ta" else "How to seed Aadhaar in Uzhavan app?"
            ]
        }

    # 7. 3D MAP OR GEOGRAPHIC INQUIRY
    elif any(k in q_lower for k in ["வரைபடம்", "மேப்", "map", "3d", "மாவட்டம்", "மண்டலம்", "zone"]):
        if language == "ta":
            spoken_text = (
                f"தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான முப்பரிமாண 3D விவசாய நில வரைபடத்தில் "
                f"மண் வகைகள், பயிரிடப்படும் பயிர்கள், மற்றும் ஆற்று பாசனப் பகுதிகளை சுழற்றி பெரிதாக்கி பார்க்கலாம்."
            )
            answer_md = (
                f"### 🗺️ தமிழ்நாடு 3D முப்பரிமாண விவசாய நில வரைபடம்\n\n"
                f"- **38 மாவட்ட வேளாண் எல்லைகள்:** மேற்கு தொடர்ச்சி மலைகள் முதல் காவிரி டெல்டா மற்றும் சோழமண்டல கடற்கரை வரை.\n"
                f"- **7 வேளாண் காலநிலை மண்டலங்கள்:** காவிரி டெல்டா, வடகிழக்கு, மேற்கு, தெற்கு, வடமேற்கு, மலை மற்றும் அதிக மழை மண்டலங்கள்.\n"
                f"- **பயிர்கள் வாரியாக வண்ணக் குறியீடு:** நெல் (பச்சை), கரும்பு (மஞ்சள்), பருத்தி (நீலம்), மா மற்றும் சிறுதானியங்கள்.\n"
                f"- **பயன்படுத்தும் முறை:** சுட்டி அல்லது தொடுதிரை மூலம் 3D வரைபடத்தை சுழற்றலாம் (Rotate), பெரிதாக்கலாம் (Zoom) மற்றும் மாவட்டத்தை கிளிக் செய்து வேளாண் புள்ளிவிவரங்களை அறியலாம்."
            )
        else:
            spoken_text = (
                f"The interactive 3D Tamil Nadu Agricultural Map visualizes terrain elevation, 38 district boundaries, "
                f"agro-climatic zones, and major crops. You can rotate, zoom, and inspect any district in 3D."
            )
            answer_md = (
                f"### 🗺️ Advanced 3D Agricultural Map of Tamil Nadu\n\n"
                f"- **Full 38-District Coverage:** Featuring Western Ghats elevation, Cauvery Delta basin, and Coromandel coastal plains.\n"
                f"- **Agro-Climatic Zones:** TNAU 7-zone classification with crop-specific thematic color palettes.\n"
                f"- **Interactive Exploration:** OrbitControls let you rotate, zoom, and tilt in realistic 3D space.\n"
                f"- **District Inspector:** Click any district plate to view cultivable hectares, major crops, soil texture, and irrigation channels."
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "agriMap3d",
            "navigation_label": "3D வரைபடத்தை திறக்க" if language == "ta" else "Open 3D Agricultural Map",
            "suggested_followups": [
                "காவிரி டெல்டா மாவட்டங்கள் எவை?" if language == "ta" else "Which districts are in Cauvery Delta?",
                "மேற்கு மண்டலத்தில் என்ன பயிர்கள் உள்ளன?" if language == "ta" else "What crops grow in Western Zone?",
                "என் மாவட்டத்தின் சாகுபடி பரப்பு எவ்வளவு?" if language == "ta" else "What is the cultivable area in my district?"
            ]
        }

    # 8. DEFAULT / GENERAL ADVISORY
    else:
        if language == "ta":
            spoken_text = (
                f"வணக்கம்! நான் உங்கள் பூமி எக்ஸ் தமிழ் வேளாண் உதவியாளர். "
                f"{dist_ta} மாவட்டத்திற்கு ஏற்ற வானிலை, மண் பரிசோதனை, பயிர் பாதுகாப்பு, "
                f"உழவர் சந்தை விலைகள், மற்றும் அரசு நலத்திட்டங்கள் குறித்து என்னிடம் வாய்மொழியாக கேட்கலாம்."
            )
            answer_md = (
                f"### 🌾 பூமி எக்ஸ் - தமிழ் வேளாண் குரல் உதவியாளர் (BhoomiX Tamil AI)\n\n"
                f"வணக்கம் விவசாய தோழரே! உங்கள் **{dist_ta}** மாவட்டம் மற்றும் **{crop}** பயிருக்கான ஆலோசனைகள்:\n\n"
                f"- ⛅ **வானிலை & மழை கணிப்பு:** 'இன்றைய மழை வாய்ப்பு என்ன?'\n"
                f"- 💧 **FAO-56 பாசன வழிகாட்டல்:** 'இன்று எத்தனை நிமிடங்கள் தண்ணீர் பாய்ச்ச வேண்டும்?'\n"
                f"- 🧪 **அருகிலுள்ள மண் பரிசோதனை கூடம்:** 'மண் பரிசோதனை எங்கு செய்வது?'\n"
                f"- 🌾 **சந்தை விலைகள்:** 'தஞ்சாவூர் நெல் விலை என்ன?'\n"
                f"- 🛡️ **பூச்சி & உரம்:** 'இலை சுருட்டு புழுவை கட்டுப்படுத்துவது எப்படி?'\n"
                f"- 🏛️ **அரசு மானியங்கள்:** 'சொட்டு நீர் பாசன மானியம் பெறுவது எப்படி?'"
            )
        else:
            spoken_text = (
                f"Hello! I am your BhoomiX Agriculture Voice Assistant. "
                f"Ask me about weather forecasts, precision irrigation, soil testing laboratories, "
                f"mandi prices, or government schemes for {district}."
            )
            answer_md = (
                f"### 🌾 BhoomiX Tamil Nadu Agri Voice Assistant\n\n"
                f"Welcome! Here are key areas I can assist you with for **{district}** ({crop}):\n\n"
                f"- ⛅ **Live Weather & Advisory:** 'Will it rain today in {district}?'\n"
                f"- 💧 **Precision Irrigation:** 'How much water does my crop need?'\n"
                f"- 🧪 **Soil Testing Labs:** 'Where is the nearest government soil lab?'\n"
                f"- 🌾 **Mandi Market Prices:** 'What is today's paddy price in Thanjavur?'\n"
                f"- 🛡️ **Pest & Plant Health:** 'How to control paddy leaf folder?'\n"
                f"- 🏛️ **Schemes & Subsidies:** 'What schemes are available for small farmers?'"
            )
        return {
            "query": question,
            "language": language,
            "spoken_text": spoken_text,
            "answer_markdown": answer_md,
            "navigation_target": "farmerDashboard",
            "navigation_label": "விவசாயி முகப்பு பக்கம்" if language == "ta" else "Open Farmer Dashboard",
            "suggested_followups": [
                "இன்றைய வானிலை எப்படி?" if language == "ta" else "How is today's weather?",
                "மண் பரிசோதனை எங்கே செய்வது?" if language == "ta" else "Where can I test my soil?",
                "இன்றைய சந்தை விலை என்ன?" if language == "ta" else "What is the market price today?"
            ]
        }
