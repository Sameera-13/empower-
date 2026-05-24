import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { useSubmitContact } from '../hooks/useContact';


const SERVICE_DATA = {
  mehndi: {
    title: 'Mehndi Services',
    description: 'We provide professional mehndi application services for weddings, festivals, parties, and special occasions with elegant and customized designs.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&h=400',
    themeClass: 'from-[#FFD93D]/10 to-[#FFFDF7] border-[#FFD93D]/30',
    accentText: 'text-[#B8860B]',
    bulletColor: 'bg-[#FFD93D]',
    iconColor: 'text-[#D4AF37]',
    badgeBg: 'bg-[#FFD93D]/15 text-[#B8860B] border-[#FFD93D]/25',
    packages: [
      'Bridal Mehndi',
      'Arabic Mehndi',
      'Festival Mehndi',
      'Custom Designs',
      'Home Service Available'
    ],
    features: [
      'Bridal Mehndi Application',
      'Arabic & Indo-Arabic Style',
      'Traditional Festival Designs',
      'Custom Mehndi Artistry',
      'Premium Home Service',
      'Expert Mehndi Classes'
    ]
  },
  beauty: {
    title: 'Beauty & Personal Care',
    description: 'We provide professional salon and self-care services that help women feel confident, stylish, and beautiful with expert treatments.',
    banner: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600&h=400',
    themeClass: 'from-[#FF6B9D]/10 to-[#FFFDF7] border-[#FF6B9D]/30',
    accentText: 'text-[#FF6B9D]',
    bulletColor: 'bg-[#FF6B9D]',
    iconColor: 'text-[#FF6B9D]',
    badgeBg: 'bg-[#FF6B9D]/15 text-[#FF6B9D] border-[#FF6B9D]/25',
    packages: [
      'Facial Treatment',
      'Hair Spa',
      'Hair Coloring',
      'Bridal Makeup'
    ],
    features: [
      'Facial Treatment & Skin Care',
      'Bleach & Deep Cleanup',
      'Premium Hair Spa Treatments',
      'Professional Hair Coloring',
      'Signature Bridal Makeup',
      'Skincare & Grooming Guidance',
      'Home Beauty Service Available'
    ]
  },
  webdev: {
    title: 'Website Development',
    description: 'We create responsive, SEO-friendly, and modern websites for businesses, startups, personal brands, and online services.',
    banner: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600&h=400',
    themeClass: 'from-[#6BCB77]/10 to-[#FFFDF7] border-[#6BCB77]/30',
    accentText: 'text-[#2E7D32]',
    bulletColor: 'bg-[#6BCB77]',
    iconColor: 'text-[#6BCB77]',
    badgeBg: 'bg-[#6BCB77]/15 text-[#2E7D32] border-[#6BCB77]/25',
    packages: [
      'Portfolio Website',
      'Business Website',
      'E-Commerce Website',
      'Custom Web App'
    ],
    features: [
      'Responsive Modern UI Design',
      'Dynamic Frontend Development',
      'Robust Backend Development',
      'Full Stack Custom Solutions',
      'Search Engine Optimization (SEO)',
      'Rich Admin Control Dashboard',
      'Website Maintenance Support',
      'Ultra Fast Loading Performance'
    ]
  },
  docs: {
    title: 'Documentation & Registration',
    description: 'We provide reliable documentation, online registration, NGO compliance, and government support services for individuals, startups, NGOs, and businesses with fast processing and professional assistance.',
    banner: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=400',
    themeClass: 'from-[#3B82F6]/10 to-[#FFFDF7] border-[#3B82F6]/30',
    accentText: 'text-[#2563EB]',
    bulletColor: 'bg-[#3B82F6]',
    iconColor: 'text-[#3B82F6]',
    badgeBg: 'bg-[#3B82F6]/15 text-[#2563EB] border-[#3B82F6]/25',
    packages: [
      'Online & NGO Registration',
      'GST & PAN Applications',
      '80G & 12A Compliance',
      'Food License (FSSAI)',
      'MSME & Scheme Applications'
    ],
    features: [
      'Fast Professional Processing',
      'Secure & Trustworthy Documentation',
      'Dedicated NGO Compliance Experts',
      'Online & Offline Advisory Help',
      'Government Registration Support',
      'Affordable Service Packages'
    ]
  },
  social: {
    title: 'Social Media Management',
    description: 'We help brands grow online with creative social media management, content creation, audience engagement, and marketing strategies for businesses, creators, startups, and organizations.',
    banner: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600&h=400',
    themeClass: 'from-[#A855F7]/10 to-[#FFFDF7] border-[#A855F7]/30',
    accentText: 'text-[#7E22CE]',
    bulletColor: 'bg-[#A855F7]',
    iconColor: 'text-[#A855F7]',
    badgeBg: 'bg-[#A855F7]/15 text-[#7E22CE] border-[#A855F7]/25',
    packages: [
      'Instagram & Facebook Handling',
      'Post & Reel Designing',
      'Content Planning',
      'Brand Promotion & Marketing',
      'Monthly Growth Strategy'
    ],
    features: [
      'Daily Creative Post Uploads',
      'Engaging Reels & Captions Design',
      'In-Depth Hashtag & Trend Research',
      'Direct Community Interaction',
      'Transparent Monthly Analytics Report',
      'Custom Creative Content Ideas'
    ]
  }
};

const SERVICE_OPTIONS = [
  { value: 'mehndi', label: 'Mehndi Service' },
  { value: 'beauty', label: 'Beauty Service' },
  { value: 'webdev', label: 'Website Development' },
  { value: 'docs', label: 'Documentation & Registration' },
  { value: 'social', label: 'Social Media Management' }
];

export default function BookService() {
  const location = useLocation();
  const submitContact = useSubmitContact();
  const [selectedService, setSelectedService] = useState('mehndi');
  const [selectedPackage, setSelectedPackage] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Set initial service based on query param
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceParam = searchParams.get('service');
    if (serviceParam && SERVICE_DATA[serviceParam]) {
      setSelectedService(serviceParam);
    }
  }, [location.search]);

  // Set default package when selected service changes
  useEffect(() => {
    if (SERVICE_DATA[selectedService]) {
      setSelectedPackage(SERVICE_DATA[selectedService].packages[0]);
    }
  }, [selectedService]);

  const activeServiceData = SERVICE_DATA[selectedService] || SERVICE_DATA.mehndi;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(form.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.date) newErrors.date = 'Preferred Date is required';
    if (!form.time) newErrors.time = 'Preferred Time is required';
    if (!form.address.trim()) newErrors.address = 'Address / Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    
    const serviceLabel = SERVICE_OPTIONS.find(o => o.value === selectedService)?.label || selectedService;
    
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      subject: `Service Booking: ${serviceLabel}`,
      message: `Booking Request Details:
-------------------------
Service: ${serviceLabel}
Selected Package: ${selectedPackage}
Preferred Date: ${form.date}
Preferred Time: ${form.time}
Location Address: ${form.address}
Notes/Requirements: ${form.notes || 'None provided'}`
    };

    submitContact.mutate(payload, {
      onSuccess: () => {
        setLoading(false);
        setSuccess(true);
      },
      onError: (err) => {
        setLoading(false);
        alert(err?.response?.data?.message || 'Failed to submit booking request. Please try again.');
      }
    });
  };

  const handlePopupConfirm = () => {
    setSuccess(false);
    
    // WhatsApp integration
    const serviceLabel = SERVICE_OPTIONS.find(o => o.value === selectedService)?.label || selectedService;
    const message = `Hello, I want to book a service.\n\nName: ${form.name}\nService: ${serviceLabel}\nPackage: ${selectedPackage}\nDate: ${form.date}\nTime: ${form.time}\nPhone: ${form.phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919004068132?text=${encodedMessage}`;
    
    // Clear form
    setForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      address: '',
      notes: ''
    });

    window.open(whatsappUrl, '_blank');
  };

  return (
    <PageContainer title="Book Your Service — Empower Stop">
      {/* Hero */}
      <section className="gradient-hero border-b border-[#F0E6F6]">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B9D] bg-[#FF6B9D]/15 px-4 py-1.5 rounded-full border border-[#FF6B9D]/20 inline-block mb-3">
            Secure Booking
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3436] mb-3">Book Your Service</h1>
          <p className="text-[#2D3436]/50 max-w-lg mx-auto text-sm leading-relaxed md:text-base">
            Fill in your details and our team will contact you shortly to confirm your booking.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-white via-[#FFFDF7] to-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDE: Dynamic Service Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-[2.25rem] border p-6 md:p-8 bg-gradient-to-b ${activeServiceData.themeClass} shadow-lg shadow-black/5 transition-all duration-500 sticky top-24`}>
              
              {/* Service Banner Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-md shadow-[#F0E6F6] border border-[#F0E6F6]/50">
                <img 
                  src={activeServiceData.banner} 
                  alt={activeServiceData.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md ${activeServiceData.badgeBg}`}>
                    Platform Choice
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="font-display text-2xl md:text-3xl text-[#2D3436] mb-3 flex items-center gap-2">
                <span className={activeServiceData.iconColor}>✦</span> {activeServiceData.title}
              </h2>
              <p className="text-xs text-[#2D3436]/60 leading-relaxed mb-6 border-b border-[#F0E6F6] pb-6">
                {activeServiceData.description}
              </p>

              {/* Packages List */}
              <div className="mb-6">
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">Popular Packages</h3>
                <div className="space-y-2.5 bg-white/60 rounded-2xl p-4 border border-[#F0E6F6]">
                  {activeServiceData.packages.map((pkg, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#2D3436]/80 font-bold">
                      <span className={`w-1.5 h-1.5 rounded-full ${activeServiceData.bulletColor}`} />
                      {pkg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">Included Benefits</h3>
                <ul className="grid grid-cols-1 gap-2.5">
                  {activeServiceData.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#2D3436]/70 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20">
                        <svg className="w-2 h-2 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Booking Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 backdrop-blur-md border border-[#F0E6F6] rounded-[2.25rem] p-6 md:p-10 shadow-xl shadow-black/5">
              
              <h2 className="font-display text-2xl text-[#2D3436] mb-1">Enter Booking Details</h2>
              <p className="text-xs text-[#2D3436]/40 mb-8">Please enter valid contact details for confirmation.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border ${errors.name ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.name && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-[#F0E6F6] bg-[#FFFDF7]/50 text-xs font-bold text-[#2D3436]/40">+91</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="99509 93330"
                        className={`flex-1 h-11 px-4 rounded-r-2xl text-sm bg-[#FFFDF7] border ${errors.phone ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.phone}</p>}
                  </div>

                </div>

                {/* Email Address & Select Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Email */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="jane@example.com"
                      className={`w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border ${errors.email ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.email && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.email}</p>}
                  </div>

                  {/* Select Service */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Select Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border border-[#F0E6F6] focus:border-[#FF6B9D] text-[#2D3436] outline-none focus:ring-4 focus:ring-[#FF6B9D]/15 transition-all duration-300 cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Select Package & Preferred Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Select Package */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Select Package</label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border border-[#F0E6F6] focus:border-[#FF6B9D] text-[#2D3436] outline-none focus:ring-4 focus:ring-[#FF6B9D]/15 transition-all duration-300 cursor-pointer"
                    >
                      {activeServiceData.packages.map((pkg, i) => (
                        <option key={i} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Preferred Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className={`w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border ${errors.date ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] outline-none focus:ring-4 transition-all duration-300 cursor-pointer`}
                    />
                    {errors.date && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.date}</p>}
                  </div>

                </div>

                {/* Preferred Time & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Preferred Time */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Preferred Time</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className={`w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border ${errors.time ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] outline-none focus:ring-4 transition-all duration-300 cursor-pointer`}
                    />
                    {errors.time && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.time}</p>}
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Address / Location</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Street, City, Zip Code"
                      className={`w-full h-11 px-4 rounded-2xl text-sm bg-[#FFFDF7] border ${errors.address ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/15'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.address && <p className="text-[10px] text-[#EF5350] font-semibold mt-1.5 ml-1">{errors.address}</p>}
                  </div>

                </div>

                {/* Additional Requirements */}
                <div className="relative">
                  <label className="block text-xs font-bold text-[#2D3436]/60 uppercase tracking-wider mb-2">Additional Requirements (Optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Specific bridal pattern requests, skin allergies, or design references..."
                    rows={4}
                    className="w-full p-4 rounded-2xl text-sm bg-[#FFFDF7] border border-[#F0E6F6] text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/15 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Confirm Booking CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] text-white hover:shadow-xl hover:shadow-[#ff4f8b]/20 active:scale-[0.99] transition-all duration-300 transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>

              </form>

              {/* Booking Footer Contacts Grid */}
              <div className="mt-12 pt-8 border-t border-[#F0E6F6] grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Call / WhatsApp */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#6BCB77]/10 flex items-center justify-center shrink-0 border border-[#6BCB77]/20">
                    <svg className="w-4 h-4 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40">Call or WhatsApp</h4>
                    <a href="tel:+919004068132" className="text-xs text-[#2D3436] font-bold hover:underline block mt-0.5">
                      +91 90040 68132
                    </a>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center shrink-0 border border-[#FF6B9D]/20">
                    <svg className="w-4 h-4 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40">Email Support</h4>
                    <a href="mailto:support@empowerstop.com" className="text-xs text-[#2D3436] font-bold hover:underline block mt-0.5">
                      support@empowerstop.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-3 col-span-1 sm:col-span-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD93D]/10 flex items-center justify-center shrink-0 border border-[#FFD93D]/20">
                    <svg className="w-4 h-4 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40">Business Hours</h4>
                    <span className="text-xs text-[#2D3436]/70 font-semibold block mt-0.5">
                      Monday — Sunday: 9:00 AM — 8:00 PM (IST)
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Full-Screen Success Popup Card Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#F0E6F6] rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl relative animate-scale-in">
            
            {/* Animated Checkmark Circle */}
            <div className="w-20 h-20 rounded-full bg-[#6BCB77]/10 flex items-center justify-center mx-auto mb-6 border border-[#6BCB77]/20 shadow-inner">
              <svg className="w-10 h-10 text-[#6BCB77] stroke-2 animate-draw-check" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-display text-2xl text-[#2D3436] mb-2">Booking Submitted!</h3>
            <p className="text-sm text-[#2D3436]/50 mb-6 leading-relaxed">
              Your booking request has been submitted successfully! Click below to send a pre-filled confirmation message on WhatsApp.
            </p>

            <button
              onClick={handlePopupConfirm}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6BCB77] to-[#4CAF50] text-white font-bold text-sm shadow-lg shadow-[#6BCB77]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              Open WhatsApp Confirmation
            </button>
            
          </div>
        </div>
      )}

    </PageContainer>
  );
}
