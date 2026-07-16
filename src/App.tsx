import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Award,
  Clock,
  ChevronRight,
  Send,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import {
  DIRECTIONS_URL,
  MAPS_EMBED_URL,
  WHATSAPP_URL,
  PHONE_DISPLAY,
  INSTAGRAM_URL,
  NAV_LINKS,
  FACILITIES,
  TESTIMONIALS,
  GALLERY_IMAGES,
  HOURS,
} from './data';

import FitnessLab from './components/FitnessLab';
import InteractiveSchedule from './components/InteractiveSchedule';
import Lightbox from './components/Lightbox';

// Real-time "Is the gym open right now?" checking utility
const checkIsOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1-6 is Mon-Sat
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeInMins = hour * 60 + min;

  // Gym Open Hours:
  // Mon-Sat: 5:30 AM (330 min) – 10:00 PM (1320 min)
  // Sunday: 5:30 AM (330 min) – 12:30 PM (750 min)
  if (day === 0) {
    // Sunday
    return timeInMins >= 330 && timeInMins <= 750;
  } else {
    // Mon-Sat
    return timeInMins >= 330 && timeInMins <= 1320;
  }
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-charcoal-border/50 shadow-black/80' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <div className="relative p-0.5 bg-lime rounded-full shadow-[0_0_15px_rgba(163,230,53,0.35)] transition-transform group-hover:scale-105">
              <img
                src="/images/WhatsApp_Image_2026-07-12_at_1.59.20_AM.jpeg"
                alt="Leegend Muscle Factory logo"
                className="h-11 lg:h-13 w-auto rounded-full"
              />
            </div>
            <span className="ml-3 font-display font-black text-xl lg:text-2xl text-white tracking-wider uppercase hidden sm:inline-block">
              Leegend <span className="text-lime">Muscle Factory</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-display font-medium text-gray-300 hover:text-lime text-sm uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 bg-lime text-black font-display font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-md hover:bg-lime-300 transition-all hover:scale-[1.03] shadow-[0_0_12px_rgba(163,230,53,0.4)]"
            >
              <MapPin className="w-4 h-4" strokeWidth={2.5} />
              Get Directions
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 hover:text-lime transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[500px] bg-black/98 backdrop-blur-md border-b border-charcoal-border' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 px-3 font-display font-medium text-gray-300 hover:text-lime hover:bg-charcoal-light rounded-md text-base uppercase tracking-wider transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 bg-lime text-black font-display font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-md shadow-lg shadow-lime/20"
          >
            <MapPin className="w-4 h-4" strokeWidth={2.5} />
            Get Directions
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/55.jpg"
          alt="Dark gym weight room with barbells and equipment at Leegend Muscle Factory"
          className="w-full h-full object-cover scale-[1.03] filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-charcoal-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
      </div>

      {/* Floating Animated Ambient Blur Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/12 w-80 h-80 bg-lime/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-lime/5 rounded-full blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/30 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
            <span className="w-2.5 h-2.5 bg-lime rounded-full animate-ping" />
            <span className="font-display font-bold text-lime text-xs uppercase tracking-[0.25em]">
              Open 7 Days a Week in Satya Nagar
            </span>
          </div>

          <h1 className="font-display font-black text-white text-5xl sm:text-7xl lg:text-9xl leading-[0.9] uppercase tracking-normal">
            Where
            <br />
            <span className="text-lime text-shadow-glow-strong">Legends</span>
            <br />
            Are Made
          </h1>

          <p className="mt-6 text-lg sm:text-2xl text-gray-300 max-w-xl leading-relaxed">
            Bhubaneswar's premier training floor for strength, discipline & real transformations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#membership"
              className="inline-flex items-center justify-center gap-2 bg-lime text-black font-display font-black text-[15px] leading-[29px] uppercase tracking-widest px-8 py-4.5 rounded-md hover:bg-lime-300 transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
            >
              Enquire Membership
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 bg-black/30 backdrop-blur-sm text-white font-display font-bold text-base leading-[29px] uppercase tracking-widest px-8 py-4.5 rounded-md hover:border-lime hover:text-lime hover:bg-black/50 transition-all"
            >
              <MapPin className="w-5 h-5" strokeWidth={2.5} />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator with dynamic neon pulse */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <span className="text-[10px] font-display text-gray-500 uppercase tracking-[0.3em] group-hover:text-lime transition-colors">
            Scroll To Explore
          </span>
          <div className="w-6 h-10 border-2 border-charcoal-border rounded-full flex justify-center pt-2 group-hover:border-lime transition-colors">
            <div className="w-1.5 h-2.5 bg-lime rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-0.5 bg-lime" />
        <span className="font-display font-bold text-lime text-sm uppercase tracking-[0.3em]">
          {kicker}
        </span>
      </div>
      <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-charcoal-dark relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute -top-10 left-1/3 w-80 h-80 bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading kicker="About Our Gym" title="About Leegend Muscle Factory" />
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              Leegend Muscle Factory is a well-established fitness center on the 4th floor of
              Santosh Plaza, near Home Town, in Satya Nagar, Bhubaneswar. Known for its
              well-equipped training floor, motivating trainers, and welcoming atmosphere, it's
              a trusted choice for beginners and experienced lifters alike across the city.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you are looking to build strength, sculpt muscle, shred down fat, or join our explosive, rhythm-pounding Zumba fitness classes, our certified coaches guide you every step of the journey.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="border-l-4 border-lime pl-4 py-1 bg-charcoal-light/10">
                <div className="font-display font-black text-3xl lg:text-4xl text-white">7 Days</div>
                <div className="font-display text-xs text-gray-500 uppercase tracking-wider mt-0.5">Open Weekly</div>
              </div>
              <div className="border-l-4 border-lime pl-4 py-1 bg-charcoal-light/10">
                <div className="font-display font-black text-3xl lg:text-4xl text-white">16.5 Hrs</div>
                <div className="font-display text-xs text-gray-500 uppercase tracking-wider mt-0.5">Daily Access</div>
              </div>
              <div className="border-l-4 border-lime pl-4 py-1 bg-charcoal-light/10">
                <div className="font-display font-black text-3xl lg:text-4xl text-white">4th Floor</div>
                <div className="font-display text-xs text-gray-500 uppercase tracking-wider mt-0.5">Santosh Plaza</div>
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Ambient behind glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lime to-lime-600 rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition duration-700" />
            
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-charcoal-border bg-charcoal">
              <img
                src="/images/44.jpg"
                alt="Interior of Leegend Muscle Factory gym with weight racks and equipment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-lime text-black px-6 py-4 rounded-xl shadow-2xl hidden sm:block border border-black/10">
              <div className="font-display font-black text-3xl uppercase leading-none">Est.</div>
              <div className="font-display font-black text-sm uppercase tracking-widest text-black/80 mt-1">
                Satya Nagar, BBSR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-lime/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading kicker="Core Offerings" title="Premium Facilities & Services" />
        
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {FACILITIES.map((item, i) => (
            <div
              key={i}
              className="group glass-panel rounded-xl p-3 sm:p-6 hover:border-lime/40 transition-all duration-300 hover:-translate-y-1.5 neon-box-glow-hover hover:bg-charcoal-light/60 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-charcoal-dark border border-charcoal-border rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-6 group-hover:border-lime group-hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all">
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-lime" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-white text-[10px] sm:text-2xl uppercase tracking-wider sm:tracking-wide mb-1 sm:mb-3 group-hover:text-lime transition-colors leading-tight min-h-[1.5rem] sm:min-h-0 flex items-center sm:block">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed hidden sm:block">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-border/40 hidden sm:flex items-center gap-1.5 text-xs font-display font-bold text-gray-500 group-hover:text-lime transition-colors uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 text-lime" /> Elite standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="py-24 bg-charcoal-dark relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-lime" />
            <span className="font-display font-semibold text-lime text-xs uppercase tracking-[0.25em]">
              Real Member Reviews
            </span>
            <div className="w-8 h-0.5 bg-lime" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase text-white leading-none">
            Built On <span className="text-lime text-shadow-glow">Legends</span>
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="relative min-h-[220px] sm:min-h-[180px] flex flex-col justify-center bg-charcoal-light/40 border border-charcoal-border p-8 rounded-xl backdrop-blur-md neon-box-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center gap-1">
                {[...Array(current.rating || 5)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-lime drop-shadow-[0_0_4px_rgba(163,230,53,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed italic">
                "{current.quote}"
              </p>
              <div className="pt-4 border-t border-charcoal-border">
                <div className="font-display font-bold text-white text-base uppercase tracking-wide">
                  {current.name}
                </div>
                <div className="font-display text-lime text-xs uppercase tracking-widest mt-0.5">
                  {current.tag}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-12">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-charcoal-dark border border-charcoal-border text-white hover:text-lime hover:border-lime transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-12">
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-charcoal-dark border border-charcoal-border text-white hover:text-lime hover:border-lime transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bullet indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-350 ${
                activeIdx === i ? 'bg-lime w-6 shadow-[0_0_8px_rgba(163,230,53,0.8)]' : 'bg-charcoal-light hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Inside View" title="The Gym Floor Gallery" />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px] lg:auto-rows-[250px]">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer border border-charcoal-border/50 hover:border-lime/40 transition-all duration-500 shadow-lg hover:shadow-lime/5 ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white font-display text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-lime" />
                  <span>Expand Image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        index={selectedImageIndex}
        images={GALLERY_IMAGES}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </section>
  );
}

function HoursLocation() {
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  useEffect(() => {
    setIsOpenNow(checkIsOpenNow());
    // Auto refresh status every minute
    const interval = setInterval(() => {
      setIsOpenNow(checkIsOpenNow());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="location" className="py-24 lg:py-32 bg-charcoal-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading kicker="Where to Train" title="Hours & Location" />
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Hours Card */}
          <div className="bg-charcoal-light border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-charcoal-border">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-lime" />
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">Opening Hours</h3>
                </div>

                {/* Real-time Open/Closed indicator */}
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-3.5 w-3.5`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpenNow ? 'bg-lime' : 'bg-red-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOpenNow ? 'bg-lime' : 'bg-red-500'}`}></span>
                  </span>
                  <span className={`font-display font-black text-sm uppercase tracking-widest ${isOpenNow ? 'text-lime' : 'text-red-500'}`}>
                    {isOpenNow ? 'Open Now' : 'Closed Now'}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {HOURS.map((h, i) => {
                  const isToday = new Date().getDay() === (i === 6 ? 0 : i + 1);
                  return (
                    <div
                      key={i}
                      className={`flex justify-between items-center py-3.5 px-4 rounded-lg transition-colors ${
                        isToday ? 'bg-lime/10 border border-lime/30' : 'border border-transparent'
                      }`}
                    >
                      <span className={`font-display font-bold uppercase tracking-wider text-sm ${isToday ? 'text-lime' : 'text-gray-300'}`}>
                        {h.day}
                        {isToday && (
                          <span className="ml-2 text-[10px] bg-lime text-black px-2 py-0.5 rounded font-bold font-sans">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-gray-400'}`}>
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-charcoal-border text-center">
              <span className="text-lime font-display font-black uppercase tracking-wider text-sm">
                Open 7 Days a week for your grind
              </span>
            </div>
          </div>

          {/* Location details & Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-charcoal-light border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-lime" />
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">Find the Factory</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                4th Floor, Santosh Plaza, near Home Town, Satya Nagar, Bhubaneswar, Odisha 751007
              </p>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime text-black font-display font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-md hover:bg-lime-300 transition-all shadow-lg shadow-lime/20 hover:scale-[1.02]"
              >
                <MapPin className="w-4 h-4" strokeWidth={2.5} />
                Get Directions on Google Maps
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border-2 border-charcoal-border bg-charcoal shadow-xl relative group">
              <div className="absolute inset-0 bg-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <iframe
                title="Leegend Muscle Factory location map"
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section id="membership" className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-lime/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-lime" />
            <span className="font-display font-semibold text-lime text-xs uppercase tracking-[0.25em]">
              Limited Slots Remaining
            </span>
            <div className="w-8 h-0.5 bg-lime" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl uppercase text-white leading-none">
            Offer of the <span className="text-lime text-shadow-glow">Year</span>
          </h2>
          <p className="mt-4 text-xl text-gray-400 font-display uppercase tracking-widest">
            Hurry up — book your slot on WhatsApp now!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* 1 Year */}
          <div className="relative bg-gradient-to-br from-lime/15 to-charcoal-light border-2 border-lime rounded-xl p-8 flex flex-col justify-between neon-border-pulse shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-black font-display font-black text-xs uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
              Most Selected
            </div>

            <div className="text-center">
              <h3 className="font-display font-black text-4xl uppercase text-white mt-2">1 Year Plan</h3>
              <div className="mt-6 flex items-baseline justify-center gap-2">
                <span className="font-display font-black text-6xl text-lime text-shadow-glow">₹14,999</span>
                <span className="font-display text-gray-400 text-sm">Full package</span>
              </div>
              <div className="mt-4 inline-block bg-lime/20 border border-lime/30 rounded-full px-5 py-2">
                <span className="font-display font-extrabold text-lime text-sm uppercase tracking-wider">
                  Get 3 Months FREE Access
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal-border/50">
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>15 total months of complete floor access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Steam bath sessions included</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Custom diet & meal structure plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Zumba group classes included</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-lime text-black font-display font-black text-sm uppercase tracking-widest px-6 py-4 rounded-md hover:bg-lime-300 transition-all shadow-lg"
            >
              Enquire and book now
            </a>
          </div>

          {/* 6 Months */}
          <div className="bg-charcoal-light border-2 border-charcoal-border rounded-xl p-8 flex flex-col justify-between hover:border-gray-500 transition-all shadow-xl">
            <div className="text-center">
              <h3 className="font-display font-black text-4xl uppercase text-white">6 Months Plan</h3>
              <div className="mt-6 flex items-baseline justify-center gap-2">
                <span className="font-display font-black text-6xl text-white">₹8,999</span>
                <span className="font-display text-gray-400 text-sm">Full package</span>
              </div>
              <div className="mt-4 inline-block bg-white/5 border border-white/20 rounded-full px-5 py-2">
                <span className="font-display font-bold text-white text-sm uppercase tracking-wider">
                  Get 1 Month FREE Access
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal-border">
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>7 total months of complete floor access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Steam bath sessions included</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Custom diet & meal structure plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                  <span>Experienced trainer assistance</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-lime text-white hover:text-lime font-display font-black text-sm uppercase tracking-widest px-6 py-4 rounded-md hover:bg-charcoal-dark/50 transition-all"
            >
              Enquire and book now
            </a>
          </div>
        </div>

        <p className="text-center mt-12 text-gray-500 font-display text-sm uppercase tracking-widest">
          Both standard long-term packages include full steam bath access & dietician counseling.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi! I'm interested in joining Leegend Muscle Factory Satya Nagar.%0A%0AMy Name: ${encodeURIComponent(form.name)}%0AMy Phone: ${encodeURIComponent(form.phone)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`${WHATSAPP_URL}?text=${text}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-24 bg-charcoal-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Reserve Spot" title="Contact Us" />
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Details */}
          <div className="flex flex-col gap-6 justify-between">
            <div className="bg-charcoal-light border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow">
              <h3 className="font-display font-black text-2xl uppercase text-white mb-6">Reach Our Desk</h3>
              <div className="space-y-6">
                <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-charcoal-dark border border-charcoal-border rounded-xl flex items-center justify-center group-hover:border-lime transition-all flex-shrink-0">
                    <Phone className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <div className="font-display text-xs text-gray-500 uppercase tracking-widest">Phone Call</div>
                    <div className="font-display font-bold text-xl text-white group-hover:text-lime transition-colors mt-0.5">
                      {PHONE_DISPLAY}
                    </div>
                  </div>
                </a>

                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-charcoal-dark border border-charcoal-border rounded-xl flex items-center justify-center group-hover:border-lime transition-all flex-shrink-0">
                    <MapPin className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <div className="font-display text-xs text-gray-500 uppercase tracking-widest">Our Location</div>
                    <div className="text-gray-300 text-sm leading-relaxed mt-0.5">
                      4th Floor, Santosh Plaza, near Home Town, Satya Nagar, Bhubaneswar, Odisha 751007
                    </div>
                  </div>
                </a>

                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-charcoal-dark border border-charcoal-border rounded-xl flex items-center justify-center group-hover:border-lime transition-all flex-shrink-0">
                    <Send className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <div className="font-display text-xs text-gray-500 uppercase tracking-widest">Direct WhatsApp</div>
                    <div className="font-display font-bold text-xl text-white group-hover:text-lime transition-colors mt-0.5">
                      Chat with us instantly
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-lime text-black font-display font-black text-base uppercase tracking-widest px-6 py-4.5 rounded-md hover:bg-lime-300 transition-colors shadow-lg shadow-lime/10"
            >
              <Send className="w-5 h-5" strokeWidth={2.5} />
              Enquire Now on WhatsApp
            </a>
          </div>

          {/* Contact form panel */}
          <div className="bg-charcoal-light border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow">
            <h3 className="font-display font-black text-2xl uppercase text-white mb-6">Send Message</h3>
            
            {submitted && (
              <div className="mb-6 flex items-center gap-3 bg-lime/10 border border-lime/30 rounded-lg px-4 py-3.5">
                <CheckCircle2 className="w-5 h-5 text-lime flex-shrink-0" />
                <span className="text-sm text-lime font-medium">Opening WhatsApp application with details...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-display text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-charcoal-dark border border-charcoal-border rounded-lg px-4 py-3.5 text-white focus:border-lime focus:ring-1 focus:ring-lime focus:outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-display text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-charcoal-dark border border-charcoal-border rounded-lg px-4 py-3.5 text-white focus:border-lime focus:ring-1 focus:ring-lime focus:outline-none transition-all"
                  placeholder="Your mobile number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-display text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Message Details
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-charcoal-dark border border-charcoal-border rounded-lg px-4 py-3.5 text-white focus:border-lime focus:ring-1 focus:ring-lime focus:outline-none transition-all resize-none"
                  placeholder="Write your timing, goal or general fitness enquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-lime text-black font-display font-black text-sm uppercase tracking-widest px-6 py-4 rounded-md hover:bg-lime-300 transition-colors shadow-md"
              >
                <Send className="w-5 h-5" strokeWidth={2.5} />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-charcoal-border pt-20 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-charcoal-border">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/WhatsApp_Image_2026-07-12_at_1.59.20_AM.jpeg"
                alt="Leegend Muscle Factory logo"
                className="h-16 w-auto rounded-full border-2 border-lime shadow-[0_0_10px_rgba(163,230,53,0.3)]"
              />
              <span className="font-display font-black text-2xl text-white uppercase tracking-wider">
                Leegend <br/><span className="text-lime">Muscle Factory</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              4th Floor, Santosh Plaza, near Home Town, Satya Nagar, Bhubaneswar, Odisha 751007
            </p>
          </div>

          {/* Timings summary */}
          <div>
            <h4 className="font-display font-bold text-white text-base uppercase tracking-wider mb-4">Hours Overview</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Monday – Saturday: <span className="text-gray-300 font-semibold">5:30 AM – 10:00 PM</span><br />
              Sunday Floor Access: <span className="text-gray-300 font-semibold">5:30 AM – 12:30 PM</span><br />
              <span className="text-lime font-display font-semibold uppercase tracking-widest text-xs mt-3 block">
                Open 7 Days a Week
              </span>
            </p>
          </div>

          {/* Social connections */}
          <div>
            <h4 className="font-display font-bold text-white text-base uppercase tracking-wider mb-4">Join Community</h4>
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-lime transition-colors mb-4">
              <Phone className="w-4 h-4 text-lime" /> <span className="font-bold">{PHONE_DISPLAY}</span>
            </a>
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram link"
                className="w-11 h-11 bg-charcoal-light border border-charcoal-border rounded-lg flex items-center justify-center hover:bg-lime hover:border-lime transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </a>
              <a
                href="#"
                aria-label="Facebook link"
                className="w-11 h-11 bg-charcoal-light border border-charcoal-border rounded-lg flex items-center justify-center hover:bg-lime hover:border-lime transition-colors group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-600">@leegend_muscle_factory</p>
          </div>
        </div>

        <div className="pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Leegend Muscle Factory. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-display uppercase tracking-widest">
            Developed in Satellite Workspace Satya Nagar
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-charcoal-dark selection:bg-lime selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <FitnessLab />
      <InteractiveSchedule />
      <TestimonialsSection />
      <Gallery />
      <HoursLocation />
      <Membership />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
