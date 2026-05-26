import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
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
      'Bleach & Cleanup',
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
      'Custom Web App',
      'Website Maintenance'
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
      'Online Registration',
      'GST Registration',
      'NGO Registration',
      'Business Registration',
      '80G Registration',
      'MSME/Udyam Registration',
      '12A Registration',
      'Income Certificate',
      'PAN Card Application',
      'Online Form Filling',
      'Food License (FSSAI)',
      'Government Scheme Applications',
      'CSR Registration Support',
      'Document Verification Support'
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
      'Instagram Management',
      'Brand Promotion',
      'Facebook Page Handling',
      'Content Creation',
      'Post & Reel Designing',
      'Audience Engagement',
      'Content Planning',
      'Monthly Growth Strategy',
      'Social Media Marketing'
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
  { value: 'mehndi', label: 'Mehndi Services' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'webdev', label: 'Full Stack Web Development' },
  { value: 'docs', label: 'Documentation & Registration' },
  { value: 'social', label: 'Social Media Management' }
];

function getPackagePrice(serviceId, packageName) {
  const prices = {
    mehndi: {
      'Bridal Mehndi': '₹5,000 - ₹8,000',
      'Arabic Mehndi': '₹1,500 - ₹3,000',
      'Festival Mehndi': '₹799 - ₹1,499',
      'Custom Designs': '₹2,000 - ₹5,000',
      'Home Service Available': 'Free'
    },
    beauty: {
      'Facial Treatment': '₹999 - ₹1,999',
      'Hair Spa': '₹1,499 - ₹2,499',
      'Hair Coloring': '₹2,500 - ₹4,999',
      'Bleach & Cleanup': '₹699 - ₹1,299',
      'Bridal Makeup': '₹8,000 - ₹15,000'
    },
    webdev: {
      'Portfolio Website': '₹9,999 - ₹14,999',
      'Business Website': '₹15,000 - ₹29,999',
      'E-Commerce Website': '₹25,000 - ₹49,999',
      'Custom Web App': '₹40,000+',
      'Website Maintenance': '₹2,000/mo'
    }
  };

  return prices[serviceId]?.[packageName] || 'Free Quote';
}

export default function BookService() {
  const location = useLocation();
  const navigate = useNavigate();
  const submitContact = useSubmitContact();
  const fileInputRef = useRef(null);

  const [selectedService, setSelectedService] = useState('mehndi');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
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
Uploaded Document: ${selectedFile ? selectedFile.name : 'None'}
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
    const message = `Hello EmpowerStop! I want to confirm my service booking request.\n\nName: ${form.name}\nService: ${serviceLabel}\nPackage: ${selectedPackage}\nDate: ${form.date}\nTime: ${form.time}\nPhone: ${form.phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919004068132?text=${encodedMessage}`;
    
    // Reset form
    setForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      address: '',
      notes: ''
    });
    setSelectedFile(null);

    window.open(whatsappUrl, '_blank');
  };

  const triggerTrackAlert = () => {
    alert('Booking tracking dashboard is loading. Our support team has already received your request and will contact you within 2 hours!');
  };

  return (
    <PageContainer>
      {/* 1. TOP HERO SECTION */}
      <section className="pt-6 pb-12 px-4 relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] to-white border-b border-[#F0E6F6]">
        {/* Floating gradient blur shapes */}
        <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-[#FF6B9D]/10 blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-5 right-1/3 w-64 h-64 rounded-full bg-[#6BCB77]/5 blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left Hero */}
          <div className="flex-1 text-left space-y-4">
            <span className="inline-block text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase text-[#B8860B] bg-[#FFD93D]/10 px-4 py-1.5 rounded-full border border-[#FFD93D]/25 backdrop-blur-sm">
              SECURE SCHEDULING
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-[#2D3436] font-normal leading-[1.15]">
              Book Your Service <br />
              With <span className="gradient-text-pink-green font-bold">EmpowerStop</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#2D3436]/50 max-w-lg leading-relaxed">
              Fill in your details and our team will contact you shortly to confirm your booking slot. Fast, secure, and professional.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] md:text-xs font-bold text-[#2D3436]/70">
              <span className="flex items-center gap-1 bg-[#6BCB77]/10 text-[#2E7D32] px-3 py-1 rounded-full border border-[#6BCB77]/20">
                ✓ Trusted Services
              </span>
              <span className="flex items-center gap-1 bg-[#FF6B9D]/10 text-[#FF6B9D] px-3 py-1 rounded-full border border-[#FF6B9D]/20">
                ✓ Quick Response
              </span>
              <span className="flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full border border-purple-200">
                ✓ Professional Support
              </span>
            </div>
          </div>

          {/* Right Hero Illustration */}
          <div className="w-full md:w-80 lg:w-[360px] shrink-0 relative">
            <div className="relative rounded-3xl overflow-hidden p-1 bg-white shadow-xl shadow-black/5 border border-[#F0E6F6]">
              <img 
                src="https://www.empowerstop.com/web/image/1778-e6eba054/Empower%20Stop%20%283%29.jpg"
                alt="EmpowerStop Professional Consultant"
                className="w-full h-44 object-cover rounded-[1.25rem] ring-4 ring-white"
              />
            </div>
            {/* Overlay sparkle decoration */}
            <div className="absolute -top-4 -right-4 text-2xl text-[#FFD93D] animate-bounce">✦</div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN BOOKING FORM SECTION */}
      <section className="py-16 px-4 bg-gradient-to-b from-white via-[#FFFDF7] to-[#FFFDF7] relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT SIDE: Booking Form */}
            <div className="lg:col-span-8 bg-white/70 backdrop-blur-md border border-[#F0E6F6] rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-300">
              <h2 className="font-display text-2xl text-[#2D3436] mb-1">Enter Booking Details</h2>
              <p className="text-xs text-[#2D3436]/40 mb-6">Please provide your contact information and requirements.</p>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full h-11 px-4 rounded-xl text-xs bg-white border ${errors.name ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.name && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#F0E6F6] bg-[#FFFDF7] text-[10px] font-bold text-[#2D3436]/40">+91</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="99509 93330"
                        className={`flex-1 h-11 px-4 rounded-r-xl text-xs bg-white border ${errors.phone ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                      />
                    </div>
                    {errors.phone && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email Address & Select Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="jane@example.com"
                      className={`w-full h-11 px-4 rounded-xl text-xs bg-white border ${errors.email ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.email && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Select Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl text-xs bg-white border border-[#F0E6F6] focus:border-[#FF6B9D] text-[#2D3436] outline-none focus:ring-4 focus:ring-[#FF6B9D]/10 transition-all duration-300 cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Select Package & Preferred Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Select Package</label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl text-xs bg-white border border-[#F0E6F6] focus:border-[#FF6B9D] text-[#2D3436] outline-none focus:ring-4 focus:ring-[#FF6B9D]/10 transition-all duration-300 cursor-pointer"
                    >
                      {activeServiceData.packages.map((pkg, i) => (
                        <option key={i} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl text-xs bg-white border ${errors.date ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] outline-none focus:ring-4 transition-all duration-300 cursor-pointer`}
                    />
                    {errors.date && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.date}</p>}
                  </div>
                </div>

                {/* Preferred Time & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Preferred Time</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl text-xs bg-white border ${errors.time ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] outline-none focus:ring-4 transition-all duration-300 cursor-pointer`}
                    />
                    {errors.time && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.time}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Address / Location</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Street, City, Zip Code"
                      className={`w-full h-11 px-4 rounded-xl text-xs bg-white border ${errors.address ? 'border-[#EF5350] focus:ring-[#EF5350]/15' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-[#FF6B9D]/10'} text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:ring-4 transition-all duration-300`}
                    />
                    {errors.address && <p className="text-[9px] text-[#EF5350] font-semibold mt-1 ml-1">{errors.address}</p>}
                  </div>
                </div>

                {/* File Upload Option */}
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">
                    Upload Documents (Highly Recommended for Documentation Services)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                  <div 
                    onClick={triggerFileSelect}
                    className="border-2 border-dashed border-[#F0E6F6] hover:border-[#FF6B9D]/50 rounded-xl p-5 bg-white text-center cursor-pointer hover:bg-[#FFFDF7]/50 transition-all duration-300 flex flex-col items-center justify-center gap-1.5"
                  >
                    <svg className="w-7 h-7 text-[#2D3436]/30 group-hover:text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    <span className="text-[11px] font-bold text-[#2D3436]/70">
                      {selectedFile ? `Selected File: ${selectedFile.name}` : 'Click to upload document or drag & drop'}
                    </span>
                    <span className="text-[9px] text-[#2D3436]/40 uppercase font-medium">Supported formats: PDF, PNG, JPG (Max 5MB)</span>
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2D3436]/60 uppercase tracking-widest mb-1.5">Additional Requirements (Optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Specific design references, skin allergies, or customized requests..."
                    rows={4}
                    className="w-full p-4 rounded-xl text-xs bg-white border border-[#F0E6F6] text-[#2D3436] placeholder:text-[#2D3436]/20 outline-none focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/10 transition-all duration-300 resize-none font-sans"
                  />
                </div>

                {/* Hidden submit trigger so Enter key works inside inputs */}
                <button type="submit" className="hidden" />

              </form>
            </div>

            {/* RIGHT SIDE: Summary Card & Support Cards */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
              
              {/* STICKY BOOKING SUMMARY CARD */}
              <div className="bg-white border-2 border-[#FF6B9D]/20 rounded-3xl p-6 shadow-lg shadow-[#FF6B9D]/5 flex flex-col justify-between text-left">
                <div>
                  <span className="inline-block text-[9px] font-extrabold tracking-widest uppercase text-[#FF6B9D] bg-[#FF6B9D]/10 px-3 py-1 rounded-full mb-4 border border-[#FF6B9D]/20">
                    Booking Summary
                  </span>
                  
                  <h3 className="font-display text-xl text-[#2D3436] mb-4 border-b border-[#F0E6F6] pb-3">Selected Details</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[10px] font-extrabold text-[#2D3436]/40 uppercase tracking-wider">Service</span>
                      <span className="text-xs font-bold text-[#2D3436] text-right">
                        {SERVICE_OPTIONS.find(o => o.value === selectedService)?.label || selectedService}
                      </span>
                    </div>

                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[10px] font-extrabold text-[#2D3436]/40 uppercase tracking-wider">Selected Package</span>
                      <span className="text-xs font-bold text-[#2D3436] text-right">{selectedPackage || 'None Selected'}</span>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[10px] font-extrabold text-[#2D3436]/40 uppercase tracking-wider">Preferred Date</span>
                      <span className="text-xs font-bold text-[#2D3436]">{form.date || 'Not Selected'}</span>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[10px] font-extrabold text-[#2D3436]/40 uppercase tracking-wider">Preferred Time</span>
                      <span className="text-xs font-bold text-[#2D3436]">{form.time || 'Not Selected'}</span>
                    </div>

                    <hr className="border-[#F0E6F6]" />

                    <div className="flex justify-between items-center gap-4 pt-1">
                      <span className="text-[10px] font-extrabold text-[#2D3436]/40 uppercase tracking-wider">Estimated Price</span>
                      <span className="text-sm font-extrabold text-[#FF6B9D]">{getPackagePrice(selectedService, selectedPackage)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] text-white hover:shadow-lg hover:shadow-[#ff4f8b]/25 active:scale-[0.98] transition-all duration-300 transform flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {loading ? 'Sending Request...' : 'Confirm Booking Now'}
                </button>
              </div>

              {/* Service Benefits / Highlights */}
              <div className="bg-white border border-[#F0E6F6] rounded-3xl p-6 text-left shadow-sm">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D3436]/40 mb-3.5">Service Benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-xs text-[#2D3436]/70 font-semibold leading-tight">
                    <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20 mt-0.5">
                      ✓
                    </span>
                    Direct verification from professional mentors.
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-[#2D3436]/70 font-semibold leading-tight">
                    <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20 mt-0.5">
                      ✓
                    </span>
                    100% secure payment structures & guidelines.
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-[#2D3436]/70 font-semibold leading-tight">
                    <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20 mt-0.5">
                      ✓
                    </span>
                    Safe home service delivery for women community.
                  </li>
                </ul>
              </div>

              {/* Quick Contacts Block */}
              <div className="bg-white border border-[#F0E6F6] rounded-3xl p-6 text-left shadow-sm space-y-4">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D3436]/40 mb-1">Quick Contact Info</h4>
                
                {/* WhatsApp Button */}
                <button
                  onClick={handlePopupConfirm}
                  className="w-full h-11 rounded-xl bg-[#6BCB77] hover:bg-[#6BCB77]/90 text-white font-bold text-xs shadow-md shadow-[#6BCB77]/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.858-1.859-4.339-2.88-6.979-2.88-5.437 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.415 1.32 4.933l-.994 3.635 3.731-.976z" />
                  </svg>
                  Chat with Support
                </button>

                {/* Emergency helpline */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-xl bg-[#EF5350]/10 flex items-center justify-center shrink-0 border border-[#EF5350]/20">
                    <svg className="w-4.5 h-4.5 text-[#EF5350]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-extrabold uppercase tracking-wider text-[#2D3436]/40">Emergency Support</h5>
                    <a href="tel:181" className="text-sm text-[#EF5350] font-extrabold hover:underline">Dial 181 (Women Helpline)</a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY PEOPLE CHOOSE EMPOWERSTOP SECTION */}
      <section className="py-16 px-4 bg-[#FFFDF7] border-t border-b border-[#F0E6F6]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#FF6B9D] bg-[#FF6B9D]/10 px-4 py-1.5 rounded-full border border-[#FF6B9D]/20">
              OUR TRUST PROMISE
            </span>
            <h2 className="font-display text-3xl text-[#2D3436] mt-4 mb-3 font-normal">Why People Choose EmpowerStop</h2>
            <p className="text-[#2D3436]/50 max-w-md mx-auto text-xs leading-relaxed">
              We bridge the gap between skilled women professionals and clients seeking top-tier services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#F0E6F6] rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-3 block">🏅</span>
              <h3 className="font-bold text-xs text-[#2D3436] mb-1.5 uppercase tracking-wider">Verified Professionals</h3>
              <p className="text-[10px] text-[#2D3436]/55 leading-relaxed">
                Every artist and developer is thoroughly vetted, highly-trained, and expert in their craft.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#F0E6F6] rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-3 block">🏷️</span>
              <h3 className="font-bold text-xs text-[#2D3436] mb-1.5 uppercase tracking-wider">Affordable Pricing</h3>
              <p className="text-[10px] text-[#2D3436]/55 leading-relaxed">
                Get premium custom work and professional services at highly competitive local rates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#F0E6F6] rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-3 block">⚡</span>
              <h3 className="font-bold text-xs text-[#2D3436] mb-1.5 uppercase tracking-wider">Fast Support</h3>
              <p className="text-[10px] text-[#2D3436]/55 leading-relaxed">
                Enjoy 24/7 client support channels with instant answers and transparent schedules.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#F0E6F6] rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-3 block">🤝</span>
              <h3 className="font-bold text-xs text-[#2D3436] mb-1.5 uppercase tracking-wider">Trusted by Community</h3>
              <p className="text-[10px] text-[#2D3436]/55 leading-relaxed">
                Backed by a national network of women entrepreneurs and supportive customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCESS POPUP MODAL */}
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
            <p className="text-xs text-[#2D3436]/50 mb-6 leading-relaxed">
              Your booking request has been submitted successfully! Click below to confirm and chat with our team on WhatsApp.
            </p>

            {/* Modal Detail Row */}
            <div className="bg-[#FFFDF7] border border-[#F0E6F6] rounded-2xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-[11px] font-bold text-[#2D3436]">
                <span className="text-[#2D3436]/40 uppercase tracking-wider text-[9px]">Service</span>
                <span>{SERVICE_OPTIONS.find(o => o.value === selectedService)?.label || selectedService}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-[#2D3436]">
                <span className="text-[#2D3436]/40 uppercase tracking-wider text-[9px]">Date & Time</span>
                <span>{form.date} @ {form.time}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePopupConfirm}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6BCB77] to-[#4CAF50] text-white font-bold text-xs shadow-lg shadow-[#6BCB77]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.858-1.859-4.339-2.88-6.979-2.88-5.437 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.415 1.32 4.933l-.994 3.635 3.731-.976z" />
                </svg>
                Confirm via WhatsApp
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="py-2.5 rounded-xl border border-[#F0E6F6] text-[#2D3436]/80 bg-white hover:bg-[#F0E6F6]/10 text-xs font-bold transition-all cursor-pointer"
                >
                  Go Back Home
                </button>
                <button
                  onClick={triggerTrackAlert}
                  className="py-2.5 rounded-xl border border-[#F0E6F6] text-[#2D3436]/80 bg-white hover:bg-[#F0E6F6]/10 text-xs font-bold transition-all cursor-pointer"
                >
                  Track Booking
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </PageContainer>
  );
}
