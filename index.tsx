import { 
  Mic, 
  Users, 
  Video, 
  MessageSquare, 
  CheckCircle, 
  Menu, 
  X, 
  Award, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  BookOpen,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for class names */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

const COURSES = [
  {
    id: 1,
    title: 'Dasar Public Speaking & Kepercayaan Diri',
    category: 'Dasar',
    price: 'Gratis',
    description: 'Pelajari fondasi utama untuk berbicara di depan umum dan cara mengatasi demam panggung dengan teknik pernapasan yang tepat.',
    materials: ['Teknik Mengatasi Demam Panggung', 'Dasar Vokal & Bahasa Tubuh'],
    instructor: 'Team Mahir Bicara'
  },
  {
    id: 2,
    title: 'Seni Storytelling dalam Presentasi',
    category: 'Spesialis',
    price: 'Rp 499.000',
    description: 'Ubah presentasi membosankan menjadi cerita yang menginspirasi. Teknik yang digunakan oleh para pembicara kelas dunia.',
    materials: ['The Art of Storytelling', 'Struktur Narasi yang Kuat'],
    instructor: 'Pandji Pragiwaksono'
  },
  {
    id: 3,
    title: 'Public Speaking untuk Pemimpin & Manajer',
    category: 'Profesional',
    price: 'Rp 750.000',
    description: 'Tingkatkan karisma dan otoritas Anda. Cara memotivasi tim melalui kata-kata yang strategis dan penuh empati.',
    materials: ['Public Speaking for Leaders', 'Manajemen Krisis Komunikasi'],
    instructor: 'Esther Lubis'
  },
  {
    id: 4,
    title: 'Menjadi Moderator & MC Profesional',
    category: 'Profesional',
    price: 'Rp 550.000',
    description: 'Kuasai panggung formal maupun informal. Teknik mengarahkan audiens dan menjaga energi acara tetap stabil.',
    materials: ['Professional Moderator & MC', 'Handling Unpredicted Situations'],
    instructor: 'Sadam Permana Wiyana'
  },
  {
    id: 5,
    title: 'Presentasi Bisnis Persuasif',
    category: 'Profesional',
    price: 'Rp 600.000',
    description: 'Cara meyakinkan klien dan investor. Fokus pada data visualization, pitch deck, dan teknik persuasi psikologis.',
    materials: ['Persuasive Business Presentations', 'Handling Q&A Like a Pro'],
    instructor: 'Esther Lubis'
  }
];

const MENTORS = [
  {
    name: 'Esther Lubis',
    role: 'Leadership & Personal Branding Expert',
    bio: 'Seorang komunikator ulung yang telah melatih ribuan manajer untuk berkomunikasi dengan visi dan dampak.',
    avatar: 'https://images.unsplash.com/photo-1715610237622-748477adf2e4?',
  },
  {
    name: 'Sadam Permana Wiyana',
    role: 'Professional Speaker',
    bio: 'Pemenang lomba debat hukum nasional dan konten kreator yang berpengalaman di event nasional.',
    avatar: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?',
  },
  {
    name: 'Pandji Pragiwaksono',
    role: 'Storyteller & Public Figure',
    bio: 'Dikenal karena kemampuannya menyiksa tawa dan air mata audiens melalui kekuatan narasi dan humor.',
    avatar: 'https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?',
  }
];

// --- Components ---

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    <h2 className={cn("text-4xl md:text-5xl font-bold mb-4", light ? "text-warm-white" : "text-royal-purple")}>
      {children}
    </h2>
    {subtitle && (
      <p className={cn("text-lg max-w-2xl mx-auto opacity-70", light ? "text-warm-white" : "text-royal-purple")}>
        {subtitle}
      </p>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Beranda', href: '#' },
    { title: 'Kelas', href: '#classes' },
    { title: 'Mentor', href: '#mentors' },
    { title: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 purple-gradient rounded-lg flex items-center justify-center shadow-lg">
            <Mic className="text-prestige-gold w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight">MahirBicara</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href}
              className="text-sm font-medium hover:text-prestige-gold transition-colors tracking-wide uppercase"
            >
              {link.title}
            </a>
          ))}
          <button className="bg-royal-purple text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-md active:scale-95">
            Daftar Sekarang
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href}
                className="text-lg font-medium p-2"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <button className="bg-royal-purple text-white w-full py-4 rounded-xl font-bold mt-4">
              Daftar Sekarang
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-royal-purple/5 -skew-x-12 -z-10 translate-x-20" />
    <div className="absolute bottom-20 left-20 w-64 h-64 bg-prestige-gold/10 rounded-full blur-3xl -z-10" />

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-prestige-gold/20 text-royal-purple px-4 py-1 rounded-full text-sm font-bold mb-6 border border-prestige-gold/30">
          <Award className="w-4 h-4" />
          <span>Kursus No.1 di Indonesia</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] mb-8">
          Kuasai Panggung, <span className="text-prestige-gold italic">Ubah Dunia</span> Melalui Kata-kata.
        </h1>
        <p className="text-xl opacity-80 mb-10 leading-relaxed max-w-lg">
          Jangan biarkan rasa takut membungkam potensi Anda. Belajar teknik public speaking profesional langsung dari para masternya.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-royal-purple text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-2xl shadow-royal-purple/30 hover:-translate-y-1 transition-all">
            Mulai Belajar <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-white border-2 border-royal-purple/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
            Lihat Kurikulum
          </button>
        </div>
        
        <div className="mt-12 flex items-center gap-6">
          <div className="flex -space-x-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-12 h-12 rounded-full border-4 border-warm-white overflow-hidden bg-gray-200">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
               </div>
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-warm-white bg-prestige-gold flex items-center justify-center text-xs font-bold text-white">
               +2k
             </div>
          </div>
          <p className="text-sm font-medium opacity-60">Bergabung dengan 2,000+ alumni sukses</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
            alt="Public Speaking in Action" 
            className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700" 
          />
        </div>
        {/* Floating Card */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs border border-gray-100"
        >
          <div className="bg-green-100 p-3 rounded-xl">
             <Video className="text-green-600" />
          </div>
          <div>
            <p className="font-bold text-sm">Sesi Live Spesial</p>
            <p className="text-xs opacity-60 italic">Bersama Pandji Pragiwaksono</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Classes = () => {
  const [filter, setFilter] = useState('Semua');
  const categories = ['Semua', 'Dasar', 'Profesional', 'Spesialis'];

  const filteredCourses = filter === 'Semua' 
    ? COURSES 
    : COURSES.filter(c => c.category === filter);

  return (
    <section id="classes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Kurikulum yang dirancang untuk segala tingkatan, dari nol hingga ahli.">
          Kelas Unggulan Kami
        </SectionTitle>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                filter === cat 
                  ? "bg-royal-purple text-white border-royal-purple shadow-lg" 
                  : "bg-transparent text-royal-purple border-royal-purple/10 hover:border-royal-purple/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group p-8 rounded-3xl bg-warm-white/50 border border-royal-purple/5 hover:border-prestige-gold/30 transition-all hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Mic className="w-24 h-24" />
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-prestige-gold">{course.category}</span>
                  <span className="text-lg font-serif font-bold italic">{course.price}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-prestige-gold transition-colors">{course.title}</h3>
                <p className="text-sm opacity-70 mb-6 line-clamp-3 leading-relaxed">{course.description}</p>
                
                <div className="space-y-3 mb-8">
                  {course.materials.map(m => (
                    <div key={m} className="flex items-center gap-2 text-xs font-medium">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-royal-purple/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-royal-purple/10 flex items-center justify-center text-[10px] font-bold">
                      {course.instructor.charAt(0)}
                    </div>
                    <span className="text-xs italic font-medium opacity-60">{course.instructor}</span>
                  </div>
                  <button className="p-2 rounded-full hover:bg-royal-purple hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Mentors = () => (
  <section id="mentors" className="py-24 bg-royal-purple text-warm-white overflow-hidden relative">
    {/* Decorative background text */}
    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
      MASTER THE STAGE
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionTitle light subtitle="Belajar langsung dari mereka yang telah membuktikan kemampuannya di panggung nyata.">
        Temui Mentor Anda
      </SectionTitle>

      <div className="grid md:grid-cols-3 gap-12">
        {MENTORS.map((mentor, i) => (
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative mb-8 rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-purple via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="h-1 w-12 bg-prestige-gold mb-4 rounded-full group-hover:w-24 transition-all duration-500" />
                <p className="text-sm font-bold uppercase tracking-widest text-prestige-gold mb-1">{mentor.role}</p>
                <h4 className="text-3xl font-serif font-bold">{mentor.name}</h4>
              </div>
            </div>
            <p className="italic text-center opacity-70 px-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
              "{mentor.bio}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-20 border-y border-royal-purple/5">
     <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Alumni', val: '2,500+' },
          { label: 'Materi Kelas', val: '50+' },
          { label: 'Kepuasan', val: '99%' },
          { label: 'Kerja Sama', val: '30+' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <h5 className="text-4xl font-bold text-prestige-gold mb-2">{s.val}</h5>
            <p className="text-xs uppercase tracking-widest font-black opacity-40">{s.label}</p>
          </div>
        ))}
     </div>
  </section>
);

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5 border border-gray-100">
          <div className="lg:col-span-2 purple-gradient p-12 text-warm-white flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-bold mb-6">Mulai Perjalanan Anda</h3>
              <p className="opacity-80 mb-12">Konsultasikan kebutuhan public speaking Anda dengan tim ahli kami secara gratis.</p>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, text: 'hello@mahirbicara.com' },
                  { icon: Phone, text: '+62 812-3456-7890' },
                  { icon: MapPin, text: 'Jakarta Selatan, Indonesia' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-prestige-gold" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 flex gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-prestige-gold transition-colors cursor-pointer" />
               ))}
            </div>
          </div>

          <form className="lg:col-span-3 p-12" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-40 pl-1">Nama Lengkap</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-royal-purple focus:bg-white outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-40 pl-1">Email</label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-royal-purple focus:bg-white outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <label className="text-xs font-black uppercase tracking-widest opacity-40 pl-1">Pilihan Kelas</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none">
                <option>Dasar Public Speaking</option>
                <option>Profesional MC/Moderator</option>
                <option>Leadership Speaking</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-xs font-black uppercase tracking-widest opacity-40 pl-1">Pesan / Pertanyaan</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-royal-purple focus:bg-white outline-none transition-all" placeholder="Bagaimana saya bisa mulai..." />
            </div>

            <button 
              disabled={formState !== 'idle'}
              className={cn(
                "w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
                formState === 'sent' ? "bg-green-500 text-white" : "bg-royal-purple text-white shadow-xl shadow-royal-purple/20 hover:scale-[1.01] active:scale-95"
              )}
            >
              {formState === 'idle' && <><Send className="w-5 h-5" /> Kirim Pesan</>}
              {formState === 'sending' && "Mengirim..."}
              {formState === 'sent' && "Pesan Terkirim!"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-white border-t border-royal-purple/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 purple-gradient rounded-lg flex items-center justify-center text-white">
            <Mic className="text-prestige-gold w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-2xl">MahirBicara</span>
        </div>
        <p className="max-w-sm opacity-60 leading-relaxed italic">
          "Karena setiap ide layak disampaikan dengan cara yang luar biasa."
        </p>
      </div>

      <div>
        <h6 className="font-bold mb-6 uppercase text-xs tracking-widest text-royal-purple/40">Tautan Cepat</h6>
        <ul className="space-y-4 text-sm font-medium opacity-60">
          <li><a href="#" className="hover:text-prestige-gold transition-colors">Tentang Kami</a></li>
          <li><a href="#classes" className="hover:text-prestige-gold transition-colors">Semua Kelas</a></li>
          <li><a href="#mentors" className="hover:text-prestige-gold transition-colors">Mentor Kami</a></li>
          <li><a href="#" className="hover:text-prestige-gold transition-colors">Blog Edukasi</a></li>
        </ul>
      </div>

      <div>
        <h6 className="font-bold mb-6 uppercase text-xs tracking-widest text-royal-purple/40">Legal</h6>
        <ul className="space-y-4 text-sm font-medium opacity-60">
          <li><a href="#" className="hover:text-prestige-gold transition-colors">Syarat & Ketentuan</a></li>
          <li><a href="#" className="hover:text-prestige-gold transition-colors">Kebijakan Privasi</a></li>
          <li><a href="#" className="hover:text-prestige-gold transition-colors">Pusat Bantuan</a></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-royal-purple/5 opacity-40 text-xs font-bold uppercase tracking-tighter">
      <p>© 2026 Mahir Bicara Academy. All rights reserved.</p>
      <div className="flex gap-8">
        <span>Made with ❤️ in Jakarta</span>
        <span className="text-prestige-gold">Designed by Prestige Studio</span>
      </div>
    </div>
  </footer>
);

const InspirationGallery = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle subtitle="Visualisasi kesuksesan Anda di berbagai skenario komunikasi.">
        Inspirasi Panggung Anda
      </SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { url: 'https://images.unsplash.com/photo-1582192732881-23d324f162f1?auto=format&fit=crop&q=80&w=500', title: 'Konferensi Besar' },
          { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500', title: 'Presentasi Bisnis' },
          { url: 'https://images.unsplash.com/photo-1591115765373-520b7a21769b?auto=format&fit=crop&q=80&w=500', title: 'Webinar Digital' },
          { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500', title: 'Rapat Kreatif' },
        ].map((img, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="relative group h-80 rounded-2xl overflow-hidden shadow-lg"
          >
            <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-purple/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-bold text-lg">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <InspirationGallery />
      <Classes />
      <ImpactSection />
      <Mentors />
      <Contact />
      <Footer />
    </main>
  );
}

/** New Component: ImpactSection */
const ImpactSection = () => (
  <section className="py-24 relative overflow-hidden bg-royal-purple">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000" 
        alt="Public Speaker on Stage" 
        className="w-full h-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-royal-purple via-royal-purple/80 to-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-warm-white leading-tight mb-8">
          Saatnya Suara Anda <br />
          <span className="text-prestige-gold italic text-5xl md:text-7xl">Didengar Dunia.</span>
        </h2>
        <p className="text-xl text-warm-white/80 leading-relaxed mb-10 max-w-xl">
          Kami tidak hanya mengajarkan cara bicara, kami membantu Anda menemukan keberanian untuk menyampaikan inspirasi kepada ribuan orang.
        </p>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <p className="text-3xl font-bold text-prestige-gold mb-1">100%</p>
            <p className="text-xs uppercase tracking-widest text-warm-white/60">Kurikulum Praktis</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <p className="text-3xl font-bold text-prestige-gold mb-1">Live</p>
            <p className="text-xs uppercase tracking-widest text-warm-white/60">Mentoring Sesi</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800" 
            alt="Confident Speaker" 
            className="w-full aspect-video object-cover"
          />
        </div>
        <div className="absolute -top-6 -right-6 w-24 h-24 gold-gradient rounded-full blur-2xl opacity-50" />
      </motion.div>
    </div>
  </section>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
