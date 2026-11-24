// BhoomiX - Verified Tamil Nadu & Central Government Agricultural Schemes
// Sourced from Department of Agriculture, Govt of Tamil Nadu (TNAgrisnet) & Ministry of Agriculture

export interface AgriScheme {
  id: string;
  name: string;
  name_ta: string;
  agency: 'Tamil Nadu State' | 'Central Government' | 'Joint TN-Centre';
  short_description: string;
  short_description_ta: string;
  eligibility_criteria: string[];
  eligibility_criteria_ta: string[];
  subsidy_benefits: string;
  subsidy_benefits_ta: string;
  documents_required: string[];
  documents_required_ta: string[];
  application_portal_url: string;
  contact_helpline: string;
  status: 'Active / Open' | 'Upcoming';
}

export const TAMIL_NADU_AGRI_SCHEMES: AgriScheme[] = [
  {
    id: "kalaignar-scheme",
    name: "Kalaignarin All Village Integrated Agriculture Development Programme (KAVIADP)",
    name_ta: "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்",
    agency: "Tamil Nadu State",
    short_description: "Flagship Tamil Nadu Government programme turning fallow drylands into cultivable productive lands with micro-irrigation, farm ponds, and community borewells.",
    short_description_ta: "தரிசு நிலங்களை விளைநிலங்களாக மாற்றி, கிராமப்புறங்களில் நுண்ணீர்ப்பாசனம் மற்றும் பண்ணைக் குட்டைகள் அமைக்கும் தமிழ்நாடு அரசின் முதன்மைத் திட்டம்.",
    eligibility_criteria: [
      "All small, marginal, and tenant farmers in designated village panchayats",
      "Special priority given to SC/ST farmers and women-led households",
      "Landholding up to 5 acres eligible for full 100% micro-irrigation subsidy"
    ],
    eligibility_criteria_ta: [
      "தேர்ந்தெடுக்கப்பட்ட கிராம ஊராட்சிகளில் உள்ள அனைத்து சிறு, குறு உழவர்கள்",
      "ஆதிதிராவிடர், பழங்குடியினர் மற்றும் பெண் விவசாயிகளுக்கு முன்னுரிமை",
      "5 ஏக்கர் வரை நிலம் வைத்துள்ளவர்களுக்கு 100% சொட்டு நீர் பாசன மானியம்"
    ],
    subsidy_benefits: "100% subsidy for small/marginal farmers for Drip & Sprinkler; ₹13,500/ha subsidy for fallow land clearing; Free certified seeds and pulse kits.",
    subsidy_benefits_ta: "சிறு/குறு உழவர்களுக்கு 100% சொட்டுநீர் பாசன மானியம்; தரிசு நிலத்தை சீரமைக்க ஹெக்டேருக்கு ₹13,500 மானியம்; இலவச விதை தாரகம்.",
    documents_required: ["Patta / Chitta document", "Aadhaar Card", "Bank Passbook with IFSC", "Passport Photo"],
    documents_required_ta: ["பட்டா / சிட்டா நகல்", "ஆதார் அட்டை", "வங்கி கணக்கு புத்தகம்", "புகைப்படம்"],
    application_portal_url: "https://www.tnagrisnet.tn.gov.in",
    contact_helpline: "1800-425-4444 (Toll-Free TN Agri Kisan Call Center)",
    status: "Active / Open"
  },
  {
    id: "uzhavar-pathukappu",
    name: "Chief Minister's Uzhavar Pathukappu Thittam (Farmers Social Security)",
    name_ta: "முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்",
    agency: "Tamil Nadu State",
    short_description: "Comprehensive social security, accidental relief, education assistance for farmer children, marriage grant, and pension for aged farmers.",
    short_description_ta: "உழவர்கள் மற்றும் விவசாயத் தொழிலாளர்களுக்கு விபத்து நிவாரணம், முதியோர் ஓய்வூதியம், மற்றும் பிள்ளைகளின் கல்வி/திருமண உதவித்தொகை வழங்கும் திட்டம்.",
    eligibility_criteria: [
      "Small and marginal farmers owning agricultural land up to 2.5 acres wet or 5 acres dry",
      "Landless agricultural laborers engaged in farming activities",
      "Age between 18 and 65 years"
    ],
    eligibility_criteria_ta: [
      "2.5 ஏக்கர் நஞ்சை அல்லது 5 ஏக்கர் புஞ்சை வரை நிலமுள்ள சிறு, குறு விவசாயிகள்",
      "விவசாயக் கூலித் தொழிலாளர்கள்",
      "18 முதல் 65 வயதுக்குட்பட்டவர்கள்"
    ],
    subsidy_benefits: "Accidental death relief ₹1,00,000; Monthly old age pension ₹1,000; Higher education grant ₹2,000 - ₹50,000; Marriage assistance ₹10,000.",
    subsidy_benefits_ta: "விபத்து மரண நிவாரணம் ₹1,00,000; முதியோர் மாதாந்திர ஓய்வூதியம் ₹1,000; கல்வி உதவித்தொகை ₹2,000 - ₹50,000.",
    documents_required: ["Uzhavar Card / Land Document", "Aadhaar Card", "Ration Card", "Age Certificate"],
    documents_required_ta: ["உழவர் பாதுகாப்பு அட்டை / பட்டா", "ஆதார் அட்டை", "குடும்ப அட்டை", "வயதுச் சான்றிதழ்"],
    application_portal_url: "https://tnesevai.tn.gov.in",
    contact_helpline: "044-28525544 (TN Social Security Commission)",
    status: "Active / Open"
  },
  {
    id: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    name_ta: "பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)",
    agency: "Central Government",
    short_description: "Direct income support of ₹6,000 per year transferred in three equal four-monthly installments of ₹2,000 directly to farmer bank accounts.",
    short_description_ta: "விவசாயிகளின் இடுபொருள் செலவுகளுக்காக ஆண்டுக்கு ₹6,000 மூன்று தவணைகளில் நேரடியாக வங்கிக் கணக்கில் வரவு வைக்கப்படும் திட்டம்.",
    eligibility_criteria: [
      "All landholding farmer families with cultivable landholding in their names",
      "Aadhaar seeding and e-KYC must be completed",
      "Institutional landholders and income-tax payers excluded"
    ],
    eligibility_criteria_ta: [
      "விவசாய நிலம் சொந்தமாக வைத்துள்ள அனைத்து உழவர் குடும்பங்கள்",
      "ஆதார் எண் மற்றும் e-KYC சரிபார்ப்பு முடிந்திருக்க வேண்டும்",
      "வருமான வரி செலுத்துபவர்கள் தவிர்த்து பிற விவசாயிகள்"
    ],
    subsidy_benefits: "₹6,000 per annum paid in 3 installments of ₹2,000 via Direct Benefit Transfer (DBT).",
    subsidy_benefits_ta: "ஆண்டுக்கு ₹6,000 நிதி உதவி (3 தவணைகளாக ₹2,000 வீதம்) நேரடியாக வங்கி கணக்கில் செலுத்தப்படும்.",
    documents_required: ["Aadhaar linked to Mobile", "Land Record Patta", "Active Bank Account"],
    documents_required_ta: ["ஆதார் அட்டை", "நில உரிமை பட்டா", "வங்கி கணக்கு விவரம்"],
    application_portal_url: "https://pmkisan.gov.in",
    contact_helpline: "155261 / 011-24300606 (PM-KISAN Helpline)",
    status: "Active / Open"
  },
  {
    id: "pmfby-tn",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY Crop Insurance - Tamil Nadu)",
    name_ta: "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
    agency: "Joint TN-Centre",
    short_description: "Comprehensive risk insurance for crop loss due to non-preventable natural risks (drought, flood, unseasonal rains, pest epidemics). Heavily subsidized by Tamil Nadu Govt.",
    short_description_ta: "வறட்சி, வெள்ளம், புயல், பூச்சித் தாக்குதல் போன்ற இயற்கை இடர்பாடுகளால் ஏற்படும் பயிர் இழப்பிற்கு உரிய இழப்பீடு வழங்கும் விரிவான காப்பீட்டு திட்டம்.",
    eligibility_criteria: [
      "All farmers growing notified crops (Paddy, Cotton, Maize, Groundnut, Sugarcane) in notified revenue villages",
      "Both loanee and non-loanee farmers eligible",
      "Must enroll within the cut-off date specified for the crop season"
    ],
    eligibility_criteria_ta: [
      "அறிவிக்கப்பட்ட கிராமங்களில் அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் விவசாயிகள்",
      "வங்கி கடன் பெற்ற மற்றும் பெறாத அனைத்து உழவர்களும் தகுதியுடையவர்கள்",
      "குறிப்பிட்ட காலக்கெடுவுக்குள் பிரீமியம் செலுத்தி பதிவு செய்தல் அவசியம்"
    ],
    subsidy_benefits: "Farmers pay only 1.5% - 2% nominal premium (balance 98% borne by TN Govt & Centre); Full sum insured compensation on crop failure.",
    subsidy_benefits_ta: "விவசாயிகள் 1.5% முதல் 2% மட்டுமே பிரீமியம் செலுத்த வேண்டும்; மீதமுள்ள 98% தொகையை அரசே ஏற்கும்.",
    documents_required: ["Sowing Certificate from Village Administrative Officer (VAO)", "Patta / Adangal", "Aadhaar Card", "Bank Passbook"],
    documents_required_ta: ["கிராம நிர்வாக அலுவலர் (VAO) விதைப்பு சான்றிதழ்", "பட்டா / அடங்கல்", "ஆதார் அட்டை", "வங்கி புத்தகம்"],
    application_portal_url: "https://pmfby.gov.in",
    contact_helpline: "14447 (Crop Insurance National Toll-Free)",
    status: "Active / Open"
  },
  {
    id: "solar-pumps-pmkusum",
    name: "PM-KUSUM & Tamil Nadu Solar Powered Agricultural Pump Scheme",
    name_ta: "முதலமைச்சரின் சூரியசக்தி பம்புசெட் மானியத் திட்டம் (PM-KUSUM)",
    agency: "Joint TN-Centre",
    short_description: "70% subsidy for installation of off-grid and grid-connected solar agricultural pumpsets (5 HP to 10 HP) to enable reliable daytime irrigation.",
    short_description_ta: "பகல் நேரங்களில் தடையற்ற பாசனம் பெற 5 முதல் 10 குதிரைத்திறன் கொண்ட சூரியசக்தி மோட்டார் பம்புசெட்டுகளுக்கு 70% அரசு மானியம்.",
    eligibility_criteria: [
      "Farmers having an assured water source (open well / borewell) with NOC from groundwater board",
      "Farmers who have not availed subsidized free agricultural electricity connection",
      "Small and marginal farmers given preference"
    ],
    eligibility_criteria_ta: [
      "பாதுகாப்பான நிலத்தடி நீர் ஆதாரம் (கிணறு / ஆழ்குழாய் கிணறு) உள்ள விவசாயிகள்",
      "இலவச மின்சார இணைப்பு பெறாமல் காத்திருப்போர்",
      "சிறு, குறு உழவர்களுக்கு முன்னுரிமை"
    ],
    subsidy_benefits: "70% capital subsidy (30% Centre + 40% Tamil Nadu Govt); Farmer contribution only 30% with bank loan facility.",
    subsidy_benefits_ta: "70% அரசு மானியம் (மத்திய அரசு 30% + தமிழக அரசு 40%); விவசாயி பங்கு 30% மட்டுமே.",
    documents_required: ["Chitta / Patta", "Well Certificate from VAO", "Groundwater NOC", "Aadhaar & Bank Details"],
    documents_required_ta: ["சிட்டா / பட்டா", "கிணறு சான்றிதழ்", "நிலத்தடி நீர் வாரிய சான்று", "ஆதார் & வங்கி விவரம்"],
    application_portal_url: "https://aed.tn.gov.in",
    contact_helpline: "044-24352220 (Agricultural Engineering Department TN)",
    status: "Active / Open"
  }
];
