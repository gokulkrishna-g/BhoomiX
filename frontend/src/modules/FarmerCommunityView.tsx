import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  Sparkles, 
  MapPin, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getCommunityPosts, addCommunityPost } from '../services/api';
import { TN_DISTRICT_NAMES, TAMIL_NADU_DISTRICTS } from '../data/tamilNaduData';

interface FarmerCommunityViewProps {
  language: Language;
}

export const FarmerCommunityView: React.FC<FarmerCommunityViewProps> = ({ language }) => {
  const t = translations[language];

  const [posts, setPosts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // New Post Form
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Thanjavur, Tamil Nadu');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Pest Management');

  const fetchPosts = async () => {
    try {
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !author) return;
    try {
      await addCommunityPost({
        author,
        location: location || 'Tamil Nadu',
        title,
        content,
        category,
        language: 'en'
      });
      setShowModal(false);
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'விவசாயிகள் சமூக அறிவுப் பகிர்வு வலைப்பின்னல்' : 'Farmer-to-Farmer Knowledge Network'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Peer-to-Peer Agronomy • Tamil Nadu
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'விவசாய அனுபவங்கள், இயற்கை பூச்சி விரட்டி முறைகள், வினா-விடைகள் மற்றும் வெற்றிகரமான நுட்பங்களை பிற உழவர்களுடன் பகிர்ந்துகொள்ளுங்கள்.'
              : 'Community peer network where farmers ask questions, share organic techniques, exchange soil experiences, and discuss farm problems.'
            }
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ta' ? 'கேள்வி / பதிவு எழுதுக' : 'Ask Question or Share Tip'}</span>
        </button>
      </div>

      {/* Community Posts Stream */}
      <div className="space-y-4 max-w-3xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{post.author}</h4>
                  <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{post.location} • {post.date}</span>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {post.category}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {language === 'ta' && post.tamil_title ? post.tamil_title : post.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                {post.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-1.5 hover:text-emerald-600 font-semibold transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Helpful Upvotes</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Community Post */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-800">
                {language === 'ta' ? 'புதிய கேள்வி அல்லது அனுபவ பகிர்வு' : 'Create Farmer Community Post'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Kumar"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
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
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Topic / Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value="Organic Pest Management">Organic Pest Management</option>
                  <option value="Smart Irrigation">Smart Irrigation</option>
                  <option value="Waste Wealth">Waste Wealth</option>
                  <option value="Fertilizer Experience">Fertilizer Experience</option>
                  <option value="Government Subsidies">Government Subsidies</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to manage yellow stem borer in Samba paddy?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details of your crop stage, soil type, and exact symptoms or observation..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                ></textarea>
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
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
