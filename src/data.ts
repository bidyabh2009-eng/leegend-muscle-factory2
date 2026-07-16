import {
  Dumbbell,
  Users,
  Utensils,
  Flame,
  Activity,
  Trophy,
} from 'lucide-react';

export const DIRECTIONS_URL = 'https://maps.app.goo.gl/9y9rA4E4kYc8GvBf7';
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.062402377546!2d85.84365737583652!3d20.2977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a213e432a93%3A0x6b4fd4ef4d6a6b4a!2sLeegend%20Muscle%20Factory!5e0!3m2!1sen!2sin!4v1721100000000!5m2!1sen!2sin';
export const WHATSAPP_URL = 'https://wa.me/919437153123';
export const PHONE_DISPLAY = '+91 94371 53123';
export const INSTAGRAM_URL = 'https://instagram.com/leegend_muscle_factory';

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#fitness-lab', label: 'Fitness Lab' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#membership', label: 'Membership' },
  { href: '#contact', label: 'Contact' },
];

export const FACILITIES = [
  {
    icon: Dumbbell,
    title: 'Strength Training',
    desc: 'Top-tier loaded plates, pin-selected machines, and spacious turf fields for ultimate strength gains.',
  },
  {
    icon: Utensils,
    title: 'Custom Diet Plans',
    desc: 'Personalized macro-nutrition, dynamic calorie plans, and structural guidelines customized for your exact goal.',
  },
  {
    icon: Flame,
    title: 'Zumba & Cardio',
    desc: 'High-energy, rhythm-pounding aerobic group classes and fat-shredding cardiovascular setups.',
  },
  {
    icon: Users,
    title: 'Expert Coaches',
    desc: 'Certified personal trainers ready to guide you on safe form, progressive volume, and lifestyle tracking.',
  },
  {
    icon: Activity,
    title: 'Body Composition',
    desc: 'Analyze your visceral fat levels, muscle percentages, water ratio, and base metabolic rate weekly.',
  },
  {
    icon: Trophy,
    title: 'Steam & Recovery',
    desc: 'Unwind and recover with built-in clean steam bath facilities available weekly for all members.',
  },
];

export const TESTIMONIALS = [
  {
    rating: 5,
    quote: "Leegend Muscle Factory is Bhubaneswar's premier training floor. The equipment selection is top-notch, especially the heavy free weights section. The trainers are highly supportive and know exactly how to push your limits.",
    name: 'Anirudh Mohapatra',
    tag: 'Strength Athlete',
  },
  {
    rating: 5,
    quote: 'The Zumba sessions are energetic and fun! It has completely changed my fitness journey. I lost 8kgs in just 3 months while enjoying every single session. Highly recommend the annual plan!',
    name: 'Sushmita Patra',
    tag: 'Zumba Enthusiast',
  },
  {
    rating: 5,
    quote: 'Best gym in Satya Nagar area. The pricing is extremely reasonable given the facilities (steam bath, custom diet charts, premium equipment). Clean, motivating, and great crowd.',
    name: 'Rakesh Jena',
    tag: 'Bodybuilding Hobbyist',
  },
];

export const GALLERY_IMAGES = [
  {
    src: 'images/55.jpg',
    alt: 'Heavy duty leg press and squats section at Leegend Muscle Factory',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'images/33.jpg',
    alt: 'Dumbbell racks and benches area inside the gym floor',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'images/44.jpg',
    alt: 'Treadmills and cardio section with neon ambient lights',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'images/66.webp',
    alt: 'Cable crossovers and pull-down machine stations',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'images/77.jpg',
    alt: 'Functional training area with resistance bands and medicine balls',
    span: 'col-span-1 row-span-1',
  },
];

export const HOURS = [
  { day: 'Monday', time: '5:30 AM – 10:00 PM' },
  { day: 'Tuesday', time: '5:30 AM – 10:00 PM' },
  { day: 'Wednesday', time: '5:30 AM – 10:00 PM' },
  { day: 'Thursday', time: '5:30 AM – 10:00 PM' },
  { day: 'Friday', time: '5:30 AM – 10:00 PM' },
  { day: 'Saturday', time: '5:30 AM – 10:00 PM' },
  { day: 'Sunday', time: '5:30 AM – 12:30 PM' },
];
