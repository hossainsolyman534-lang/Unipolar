/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shirt, 
  CheckCircle2, 
  Users, 
  Palette, 
  Zap, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'হোম', href: '#' },
    { name: 'সার্ভিস', href: '#services' },
    { name: 'পোর্টফোলিও', href: '#portfolio' },
    { name: 'কেন আমরা?', href: '#why-us' },
    { name: 'যোগাযোগ', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Shirt className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              ApparelPro
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              অর্ডার করুন
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                  অর্ডার করুন
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide uppercase mb-6"
            >
              প্রিমিয়াম কাস্টম অ্যাপারেল
            </motion.span>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6"
            >
              আপনার ব্র্যান্ডের জন্য <span className="text-indigo-600">সেরা ডিজাইন</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl"
            >
              আমরা আপনার কোম্পানির ব্র্যান্ড ভ্যালু অনুযায়ী কাস্টমাইজ টি-শার্ট, পোলো এবং জার্সি ডিজাইন করে থাকি। গুণগত মান এবং আধুনিক ডিজাইনের নিশ্চয়তা।
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2">
                ফ্রি কনসাল্টেশন নিন <ArrowRight size={20} />
              </button>
              <button className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2">
                আমাদের কাজ দেখুন
              </button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <p className="text-gray-900 font-bold">৫০০+ কোম্পানি</p>
                <p className="text-gray-500 text-sm font-medium">আমাদের উপর আস্থা রেখেছেন</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0] 
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
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
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle2 className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">১০০% কটন</p>
                  <p className="text-xs text-gray-500">প্রিমিয়াম ফেব্রিক</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Palette className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">কাস্টম ডিজাইন</p>
                  <p className="text-xs text-gray-500">আপনার পছন্দমতো</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'কাস্টম টি-শার্ট',
      desc: 'অফিস ইভেন্ট বা প্রমোশনের জন্য প্রিমিয়াম কোয়ালিটি টি-শার্ট।',
      icon: <Shirt className="w-8 h-8" />,
      color: 'bg-blue-50 text-blue-600',
      image: 'https://picsum.photos/seed/tshirt/600/400'
    },
    {
      title: 'কর্পোরেট পোলো',
      desc: 'অফিসিয়াল লুকের জন্য এমব্রয়ডারি করা স্মার্ট পোলো শার্ট।',
      icon: <Shirt className="w-8 h-8" />,
      color: 'bg-indigo-50 text-indigo-600',
      image: 'https://picsum.photos/seed/polo/600/400'
    },
    {
      title: 'স্পোর্টস জার্সি',
      desc: 'টিম স্পিরিট বাড়াতে আধুনিক ও আরামদায়ক স্পোর্টস জার্সি।',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-violet-50 text-violet-600',
      image: 'https://picsum.photos/seed/jersey/600/400'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">আমাদের সার্ভিসসমূহ</h2>
          <p className="text-lg text-gray-600">আমরা প্রতিটি ডিজাইন আপনার ব্র্যান্ডের গাইডলাইন মেনে নিখুঁতভাবে তৈরি করি।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", service.color)}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  বিস্তারিত দেখুন <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const categories = ['সব', 'টি-শার্ট', 'পোলো', 'জার্সি'];
  const [active, setActive] = useState('সব');

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">আমাদের সাম্প্রতিক কাজ</h2>
            <p className="text-lg text-gray-600">বিগত কয়েক মাসে আমাদের করা কিছু সেরা ডিজাইন।</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-semibold transition-all",
                  active === cat 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
            >
              <img
                src={`https://picsum.photos/seed/work${i}/600/800`}
                alt="Work"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg">কর্পোরেট ডিজাইন {i}</p>
                <p className="text-gray-300 text-sm">ব্র্যান্ডিং প্রজেক্ট</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const features = [
    {
      title: 'ইউনিক ডিজাইন',
      desc: 'প্রতিটি ডিজাইন আপনার ব্র্যান্ডের কথা মাথায় রেখে ইউনিকভাবে করা হয়।',
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: 'দ্রুত ডেলিভারি',
      desc: 'আমরা সময়ের গুরুত্ব বুঝি, তাই নির্দিষ্ট সময়ের মধ্যেই ডেলিভারি নিশ্চিত করি।',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'সাশ্রয়ী মূল্য',
      desc: 'সেরা কোয়ালিটির সাথে আমরা দিচ্ছি বাজারের সবচেয়ে সাশ্রয়ী মূল্য।',
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: '২৪/৭ সাপোর্ট',
      desc: 'যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।',
      icon: <MessageSquare className="w-6 h-6" />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-indigo-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/50 -skew-x-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">কেন আমাদের পছন্দ করবেন?</h2>
            <p className="text-indigo-100 text-lg mb-12 leading-relaxed">
              আমরা শুধু কাপড় ডিজাইন করি না, আমরা আপনার ব্র্যান্ডের গল্প ফুটিয়ে তুলি। আমাদের অভিজ্ঞ ডিজাইনার টিম এবং আধুনিক প্রিন্টিং টেকনোলজি আপনাকে দিবে সেরা অভিজ্ঞতা।
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-indigo-700/50 p-3 rounded-xl h-fit">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">{f.title}</h4>
                    <p className="text-indigo-200 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/feat1/400/500" className="rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/feat2/400/300" className="rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/feat3/400/300" className="rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/feat4/400/500" className="rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-16 bg-indigo-600 text-white">
              <h2 className="text-4xl font-bold mb-8">আমাদের সাথে যোগাযোগ করুন</h2>
              <p className="text-indigo-100 mb-12 text-lg">
                আপনার যেকোনো প্রশ্ন বা অর্ডারের জন্য আমাদের সাথে যোগাযোগ করতে পারেন। আমরা খুব দ্রুত আপনার সাথে যোগাযোগ করব।
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-indigo-500 p-4 rounded-2xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm">ফোন করুন</p>
                    <p className="text-xl font-bold">+৮৮০ ১২৩৪ ৫৬৭৮৯০</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-indigo-500 p-4 rounded-2xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm">ইমেইল করুন</p>
                    <p className="text-xl font-bold">info@apparelpro.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-indigo-500 p-4 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm">অফিস ঠিকানা</p>
                    <p className="text-xl font-bold">বনানী, ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="bg-indigo-500 p-3 rounded-xl hover:bg-indigo-400 transition-colors">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="p-8 sm:p-16">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">আপনার নাম</label>
                    <input 
                      type="text" 
                      placeholder="নাম লিখুন"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">ফোন নম্বর</label>
                    <input 
                      type="tel" 
                      placeholder="নম্বর লিখুন"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">ইমেইল (ঐচ্ছিক)</label>
                  <input 
                    type="email" 
                    placeholder="ইমেইল লিখুন"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">সার্ভিস নির্বাচন করুন</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none appearance-none">
                    <option>টি-শার্ট ডিজাইন</option>
                    <option>পোলো শার্ট ডিজাইন</option>
                    <option>জার্সি ডিজাইন</option>
                    <option>অন্যান্য</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">আপনার মেসেজ</label>
                  <textarea 
                    rows={4}
                    placeholder="আপনার চাহিদা সম্পর্কে বিস্তারিত লিখুন..."
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none resize-none"
                  />
                </div>
                <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                  মেসেজ পাঠান
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Shirt className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">ApparelPro</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              আমরা আপনার ব্র্যান্ডের জন্য সেরা মানের কাস্টম পোশাক ডিজাইন এবং সরবরাহ নিশ্চিত করি।
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">লিঙ্কসমূহ</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">হোম</a></li>
              <li><a href="#services" className="hover:text-indigo-600 transition-colors">সার্ভিস</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-600 transition-colors">পোর্টফোলিও</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition-colors">যোগাযোগ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">সার্ভিসসমূহ</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">কাস্টম টি-শার্ট</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">কর্পোরেট পোলো</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">স্পোর্টস জার্সি</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">ব্র্যান্ডিং কনসাল্টেশন</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">নিউজলেটার</h4>
            <p className="text-gray-500 mb-4 text-sm">নতুন ডিজাইন এবং অফার পেতে সাবস্ক্রাইব করুন।</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="ইমেইল"
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 w-full outline-none focus:border-indigo-600"
              />
              <button className="bg-indigo-600 text-white p-2 rounded-xl">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © ২০২৬ ApparelPro. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-indigo-600">প্রাইভেসি পলিসি</a>
            <a href="#" className="hover:text-indigo-600">টার্মস অফ সার্ভিস</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
