import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Tractor, 
  Phone, 
  MapPin, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getResourceSharing, addResourceListing } from '../services/api';
import { TN_DISTRICT_NAMES, TAMIL_NADU_DISTRICTS } from '../data/tamilNaduData';

interface ResourceSharingViewProps {
  language: Language;
}

export const ResourceSharingView: React.FC<ResourceSharingViewProps> = ({ language }) => {
  const t = translations[language];

  const [listings, setListings] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [bookSuccess, setBookSuccess] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [resourceType, setResourceType] = useState('Tractor with Implements');
  const [ownerName, setOwnerName] = useState('');
  const [village, setVillage] = useState('Thanjavur, Tamil Nadu');
  const [phone, setPhone] = useState('');
  const [rate, setRate] = useState('');
  const [availability, setAvailability] = useState('Available on Booking');

  const fetchResources = async () => {
    try {
      const data = await getResourceSharing();
      setListings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !ownerName || !phone) return;
    try {
      await addResourceListing({
        title,
        resource_type: resourceType,
        owner_name: ownerName,
        village: village || 'Tamil Nadu',
        phone,
        rate,
        availability_status: availability
      });
      setShowModal(false);
      setTitle('');
      fetchResources();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = (owner: string, title: string) => {
    setBookSuccess(`Booking Inquiry dispatched to ${owner} for "${title}". Expect a call within 15 minutes!`);
    setTimeout(() => setBookSuccess(null), 5000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'கிராமப்புற உபகரணப் பகிர்வு பொருளாதாரம்' : 'Rural Agricultural Resource Sharing'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Community Equipment & Labor Sharing • Tamil Nadu
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'டிராக்டர், ட்ரோன் தெளிப்பான், அறுவடை இயந்திரம், சேமிப்பு கிடங்கு மற்றும் வேளாண் தொழிலாளர் பகிர்வு தளம்.'
              : 'Decentralized peer sharing for tractors, drone sprayers, harvesters, solar dryers, cold godowns, and farm labor.'
            }
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ta' ? 'உபகரணம் வாடகைக்கு சேர்க்க' : 'List Equipment / Service'}</span>
        </button>
      </div>

      {bookSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{bookSuccess}</span>
        </div>
      )}

      {/* Resource Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {res.resource_type}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {res.availability_status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Owner: <strong className="text-slate-700">{res.owner_name}</strong>
                </p>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{res.village}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block uppercase">Rental Rate</span>
                <strong className="text-sm font-black text-emerald-700">{res.rate}</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Condition: {res.equipment_condition}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2">
              <button
                onClick={() => handleBook(res.owner_name, res.title)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                {language === 'ta' ? 'பதிவு செய்' : 'Book Rental'}
              </button>
              <a
                href={`tel:${res.phone}`}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                title="Call Owner"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-800">
                {language === 'ta' ? 'புதிய உபகரணம் சேர்க்க' : 'List Farming Equipment / Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Equipment Name & Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kubota Combine Paddy Harvester (நெல் அறுவடை இயந்திரம்)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Owner Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98400 55441"
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
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
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
                  <label className="font-semibold text-slate-700 block mb-1">Resource Type</label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Tractor with Implements">Tractor with Implements</option>
                    <option value="Paddy Harvester">Paddy Harvester</option>
                    <option value="Agricultural Drone">Agricultural Drone</option>
                    <option value="Solar Dryer & Storage">Solar Dryer & Storage</option>
                    <option value="Skilled Farm Labor">Skilled Farm Labor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Rental Rate</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹850 / hour"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Availability</label>
                  <input
                    type="text"
                    placeholder="e.g. Available on 24-hr Notice"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
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
                  Publish Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
