/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  CheckCircle2, 
  Palette, 
  Zap, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Plus,
  Trash2,
  Settings as SettingsIcon,
  Image as ImageIcon,
  LogOut,
  LogIn,
  Save,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { db, auth } from './firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { MetaPixel } from './components/MetaPixel';
import { Toaster, toast } from 'react-hot-toast';

// --- Types ---
interface GlobalSettings {
  pixelId: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  companyName: string;
  galleryTitle: string;
  gallerySubtitle: string;
}

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// --- Default Data ---
const DEFAULT_SETTINGS: GlobalSettings = {
  pixelId: '',
  heroTitle: 'আপনার ব্র্যান্ডের জন্য সেরা ডিজাইন',
  heroSubtitle: 'আমরা আপনার কোম্পানির ব্র্যান্ড ভ্যালু অনুযায়ী কাস্টমাইজ টি-শার্ট, পোলো এবং জার্সি ডিজাইন করে থাকি। গুণগত মান এবং আধুনিক ডিজাইনের নিশ্চয়তা।',
  whatsappNumber: '8801234567890',
  companyName: 'Fast Unipolar',
  galleryTitle: 'গ্যালারি',
  gallerySubtitle: 'আমাদের করা কিছু উল্লেখযোগ্য কাজের নমুনা।'
};

// --- Components ---

const AdminPanel = ({ settings, gallery, user, onClose }: { 
  settings: GlobalSettings, 
  gallery: GalleryImage[], 
  user: User | null,
  onClose: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'gallery' | 'pixel'>('content');
  const [localSettings, setLocalSettings] = useState(settings);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  
  const isAdmin = user?.email === 'hossainsolyman534@gmail.com';

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!user || !isAdmin) return null;

  const handleSaveSettings = async () => {
    try {
      await setDoc(doc(db, 'settings', 'global'), localSettings);
      toast.success('সেটিংস সেভ হয়েছে!');
    } catch (e) {
      toast.error('সেভ করতে সমস্যা হয়েছে');
    }
  };

  const handleAddGalleryImage = async () => {
    if (!newImageUrl) return;
    try {
      await addDoc(collection(db, 'gallery'), {
        url: newImageUrl,
        title: newImageTitle,
        createdAt: new Date().toISOString()
      });
      setNewImageUrl('');
      setNewImageTitle('');
      toast.success('ছবি যোগ হয়েছে!');
    } catch (e) {
      toast.error('যোগ করতে সমস্যা হয়েছে');
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      toast.success('ছবি মুছে ফেলা হয়েছে');
    } catch (e) {
      toast.error('মুছতে সমস্যা হয়েছে');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="text-indigo-600" /> অ্যাডমিন প্যানেল
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => signOut(auth)}
              className="flex items-center gap-2 text-red-600 font-bold px-4 py-2 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} /> লগ আউট
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-4 overflow-x-auto">
          {[
            { id: 'content', label: 'কন্টেন্ট', icon: <MessageSquare size={18} /> },
            { id: 'gallery', label: 'গ্যালারি', icon: <ImageIcon size={18} /> },
            { id: 'pixel', label: 'পিক্সেল', icon: <Zap size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap",
                activeTab === tab.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activeTab === 'content' && (
            <div className="space-y-6 bg-gray-50 p-8 rounded-3xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">কোম্পানির নাম</label>
                <input 
                  value={localSettings.companyName}
                  onChange={e => setLocalSettings({...localSettings, companyName: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">হিরো টাইটেল</label>
                <input 
                  value={localSettings.heroTitle}
                  onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">হিরো সাবটাইটেল</label>
                <textarea 
                  value={localSettings.heroSubtitle}
                  onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})}
                  rows={3}
                  className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">হোয়াটসঅ্যাপ নম্বর (Country Code সহ)</label>
                <input 
                  value={localSettings.whatsappNumber}
                  onChange={e => setLocalSettings({...localSettings, whatsappNumber: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <button 
                onClick={handleSaveSettings}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
              >
                <Save size={20} /> সেভ করুন
              </button>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-3xl space-y-4">
                <h4 className="font-bold text-lg">নতুন ছবি যোগ করুন</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    placeholder="ইমেজ URL"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <input 
                    placeholder="টাইটেল (ঐচ্ছিক)"
                    value={newImageTitle}
                    onChange={e => setNewImageTitle(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <button 
                  onClick={handleAddGalleryImage}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
                >
                  <Plus size={20} /> যোগ করুন
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="relative group aspect-square rounded-2xl overflow-hidden">
                    <img src={img.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button 
                      onClick={() => handleDeleteGalleryImage(img.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pixel' && (
            <div className="space-y-6 bg-gray-50 p-8 rounded-3xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">মেটা পিক্সেল আইডি (Pixel ID)</label>
                <input 
                  value={localSettings.pixelId}
                  onChange={e => setLocalSettings({...localSettings, pixelId: e.target.value})}
                  placeholder="যেমন: 1234567890"
                  className="w-full px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <p className="text-sm text-gray-500">
                পিক্সেল আইডি দেওয়ার পর নিচের ইভেন্টগুলো অটোমেটিকলি ট্র্যাক হবে:<br/>
                - Time_30s, Time_60s, Time_120s<br/>
                - Scroll_25, Scroll_50, Scroll_75, Scroll_95
              </p>
              <button 
                onClick={handleSaveSettings}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
              >
                <Save size={20} /> সেভ করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as GlobalSettings);
      }
      setLoading(false);
    });

    const unsubscribeGallery = onSnapshot(query(collection(db, 'gallery'), orderBy('createdAt', 'desc')), (snapshot) => {
      setGallery(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryImage)));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSettings();
      unsubscribeGallery();
    };
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isAdmin = user?.email === 'hossainsolyman534@gmail.com';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" />
      <MetaPixel pixelId={settings.pixelId} />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/fast-unipolar-logo.png" 
                alt="Fast Unipolar Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if the image doesn't load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden bg-indigo-600 p-2 rounded-lg">
                <Shirt className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                {settings.companyName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {isAdmin && (
                <button 
                  onClick={() => setShowAdmin(!showAdmin)}
                  className={cn(
                    "p-2.5 rounded-full transition-all",
                    showAdmin ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <SettingsIcon size={20} />
                </button>
              )}
              {!user && (
                <button 
                  onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                  className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all"
                >
                  <LogIn size={20} />
                </button>
              )}
              <a 
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank" 
                rel="noreferrer"
                className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center gap-2"
              >
                <MessageSquare size={18} /> হোয়াটসঅ্যাপ করুন
              </a>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showAdmin && (
          <AdminPanel 
            settings={settings} 
            gallery={gallery} 
            user={user} 
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/50 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
                  প্রিমিয়াম কাস্টম অ্যাপারেল
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                  {settings.heroTitle}
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                  {settings.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-2"
                  >
                    হোয়াটসঅ্যাপে অর্ডার দিন <MessageSquare size={20} />
                  </a>
                  <a 
                    href="#gallery"
                    className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
                  >
                    আমাদের কাজ দেখুন
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0] 
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/50">
                  <img
                    src="https://picsum.photos/seed/apparel-hero/800/1000"
                    alt="Custom Apparel"
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">আমাদের সার্ভিসসমূহ</h2>
              <p className="text-lg text-gray-600">আমরা প্রতিটি ডিজাইন আপনার ব্র্যান্ডের গাইডলাইন মেনে নিখুঁতভাবে তৈরি করি।</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'কাস্টম টি-শার্ট', desc: 'অফিস ইভেন্ট বা প্রমোশনের জন্য প্রিমিয়াম কোয়ালিটি টি-শার্ট।', color: 'bg-blue-50 text-blue-600', icon: <Shirt /> },
                { title: 'কর্পোরেট পোলো', desc: 'অফিসিয়াল লুকের জন্য এমব্রয়ডারি করা স্মার্ট পোলো শার্ট।', color: 'bg-indigo-50 text-indigo-600', icon: <Shirt /> },
                { title: 'স্পোর্টস জার্সি', desc: 'টিম স্পিরিট বাড়াতে আধুনিক ও আরামদায়ক স্পোর্টস জার্সি।', color: 'bg-violet-50 text-violet-600', icon: <Zap /> }
              ].map((service, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", service.color)}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{settings.galleryTitle}</h2>
              <p className="text-lg text-gray-600">{settings.gallerySubtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {gallery.length > 0 ? gallery.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  whileHover={{ y: -5 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                    referrerPolicy="no-referrer"
                  />
                  {img.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <p className="text-white font-bold text-lg">{img.title}</p>
                    </div>
                  )}
                </motion.div>
              )) : (
                [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden p-8 sm:p-16 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">সরাসরি অর্ডার করতে হোয়াটসঅ্যাপ করুন</h2>
              <p className="text-indigo-100 mb-12 text-lg max-w-2xl mx-auto">
                আপনার পছন্দের ডিজাইন বা যেকোনো জিজ্ঞাসার জন্য সরাসরি আমাদের হোয়াটসঅ্যাপে মেসেজ দিন। আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
              </p>
              
              <div className="flex flex-col items-center gap-8">
                <a 
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-green-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-50 transition-all shadow-2xl flex items-center gap-4"
                >
                  <MessageSquare size={32} /> হোয়াটসঅ্যাপে কথা বলুন
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
