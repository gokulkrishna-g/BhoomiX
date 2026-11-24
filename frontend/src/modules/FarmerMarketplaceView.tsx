import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Sparkles, 
  Star,
  Search,
  Filter
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getMarketplace, addMarketplaceItem } from '../services/api';
import { TN_DISTRICT_NAMES, TAMIL_NADU_DISTRICTS } from '../data/tamilNaduData';

interface FarmerMarketplaceViewProps {
  language: Language;
}

export const FarmerMarketplaceView: React.FC<FarmerMarketplaceViewProps> = ({ language }) => {
  const t = translations[language];

  const [items, setItems] = useState<any[]>([]);
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New Listing Form State
  const [title, setTitle] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('Thanjavur, Tamil Nadu');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Grains & Cereals');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [organic, setOrganic] = useState(true);

  const fetchListings = async () => {
    try {
      const data = await getMarketplace();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !farmerName || !phone) return;
    try {
      await addMarketplaceItem({
        title,
        farmer_name: farmerName,
        location: location || 'Tamil Nadu',
        phone,
        category,
        quantity_available: quantity,
        price_per_unit: price,
        organic_certified: organic
      });
      setShowModal(false);
      setTitle('');
      fetchListings();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesOrganic = filterOrganic ? item.organic_certified : true;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesOrganic && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'விவசாயிகள் நேரடி சந்தை' : 'Direct Farmer Marketplace'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Zero Middleman • Tamil Nadu B2B Direct
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'விளைபொருட்களை தரகர் தலையீடு இல்லாமல் மொத்த கொள்முதல் வணிகர்களுக்கும் நுகர்வோருக்கும் நியாயமான விலையில் விற்கலாம்.'
              : 'Direct-to-consumer and wholesale portal allowing farmers to sell verified organic produce at peak farmgate margins.'
            }
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ta' ? 'விளைபொருள் சேர்க்க' : 'List Farm Produce'}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'பயிர் அல்லது ஊர் பெயர் தேட...' : 'Search crop, variety, or village...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={() => setFilterOrganic(!filterOrganic)}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            filterOrganic
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'இயற்கை சான்றளிக்கப்பட்டவை மட்டும்' : 'Organic Certified Only'}</span>
        </button>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {item.category}
                </span>
                {item.organic_certified && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Certified Organic</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Farmer: <strong className="text-slate-700">{item.farmer_name}</strong>
                </p>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                  <strong className="text-base font-black text-emerald-700">{item.price_per_unit}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Stock</span>
                  <strong className="text-xs font-bold text-slate-800">{item.quantity_available}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${item.phone}`}
                className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'விவசாயியை அழைக்க' : 'Contact Farmer'} ({item.phone})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Produce Listing */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-800">
                {language === 'ta' ? 'புதிய விளைபொருள் விற்பனைக்கு சேர்க்க' : 'Add New Produce Listing'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Produce Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Poongar Organic Rice (பூங்கார் அரிசி)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Farmer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98400 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'ta' ? 'தமிழ்நாடு மாவட்டம்' : 'Tamil Nadu District'}
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {TN_DISTRICT_NAMES.map(d => (
                      <option key={d} value={`${d}, Tamil Nadu`}>
                        {d} {TAMIL_NADU_DISTRICTS[d] ? `(${TAMIL_NADU_DISTRICTS[d].tamil_name})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Grains & Cereals">Grains & Cereals</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Oils & Value-Added">Oils & Value-Added</option>
                    <option value="Pulses">Pulses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Available Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 50 Quintals"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price per Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹65 / kg"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="orgCheck"
                  checked={organic}
                  onChange={(e) => setOrganic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="orgCheck" className="font-semibold text-slate-700">
                  Certified Organic / பாரம்பரிய இயற்கை வேளாண்மை
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
