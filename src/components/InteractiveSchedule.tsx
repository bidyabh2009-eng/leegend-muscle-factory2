import { useState } from 'react';
import { Calendar, Clock, User, ArrowUpRight, Flame, Dumbbell, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_URL } from '../data';

interface ClassSlot {
  time: string;
  name: string;
  type: 'Strength' | 'Zumba' | 'Cardio' | 'Recovery';
  coach: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  capacity: string;
}

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Helper templates to keep data clean, compact, and DRY
const STRENGTH_RECOVERY_ZUMBA_CYCLE: ClassSlot[] = [
  { time: '06:00 AM - 07:00 AM', name: 'CrossFit Ignition', type: 'Strength', coach: 'Coach Rakesh', intensity: 'High', capacity: '15/20' },
  { time: '08:00 AM - 09:00 AM', name: 'Yoga Flow & Mindfulness', type: 'Recovery', coach: 'Coach Sushmita', intensity: 'Low', capacity: '18/25' },
  { time: '05:30 PM - 06:30 PM', name: 'Zumba Dance Rhythm', type: 'Zumba', coach: 'Coach Sushmita', intensity: 'High', capacity: '25/30' },
  { time: '07:00 PM - 08:00 PM', name: 'Heavy Lifting Club', type: 'Strength', coach: 'Coach Anirudh', intensity: 'Extreme', capacity: '12/15' },
];

const CARDIO_MOBILITY_HYPERTROPHY_CYCLE: ClassSlot[] = [
  { time: '06:30 AM - 07:30 AM', name: 'Cardio Burn & Core', type: 'Cardio', coach: 'Coach Rakesh', intensity: 'High', capacity: '18/20' },
  { time: '09:00 AM - 10:00 AM', name: 'Mobility & Foam Rolling', type: 'Recovery', coach: 'Coach Sushmita', intensity: 'Low', capacity: '12/20' },
  { time: '06:00 PM - 07:00 PM', name: 'Power Hypertrophy', type: 'Strength', coach: 'Coach Anirudh', intensity: 'High', capacity: '15/18' },
  { time: '07:30 PM - 08:30 PM', name: 'Aerobics Blast', type: 'Zumba', coach: 'Coach Sushmita', intensity: 'Medium', capacity: '20/30' },
];

const SCHEDULE_DATA: Record<string, ClassSlot[]> = {
  Monday: STRENGTH_RECOVERY_ZUMBA_CYCLE,
  Tuesday: CARDIO_MOBILITY_HYPERTROPHY_CYCLE,
  Wednesday: STRENGTH_RECOVERY_ZUMBA_CYCLE,
  Thursday: CARDIO_MOBILITY_HYPERTROPHY_CYCLE,
  Friday: STRENGTH_RECOVERY_ZUMBA_CYCLE,
  Saturday: [
    { time: '07:00 AM - 08:30 AM', name: 'Weekend Power Circuit', type: 'Strength', coach: 'Coaches Rakesh & Anirudh', intensity: 'Extreme', capacity: '19/25' },
    { time: '09:00 AM - 10:00 AM', name: 'Zumba Fiesta Weekend', type: 'Zumba', coach: 'Coach Sushmita', intensity: 'High', capacity: '26/30' },
    { time: '05:00 PM - 06:00 PM', name: 'Recovery Steam & Spa', type: 'Recovery', coach: 'In-House Staff', intensity: 'Low', capacity: '8/12' },
  ],
  Sunday: [
    { time: '07:00 AM - 08:30 AM', name: 'Sunday Morning Run & Strength', type: 'Cardio', coach: 'Coach Rakesh', intensity: 'Medium', capacity: '10/20' },
    { time: '09:00 AM - 10:30 AM', name: 'Active Recovery & Sauna', type: 'Recovery', coach: 'In-House Staff', intensity: 'Low', capacity: '6/15' },
  ],
};

const CATEGORIES = ['All', 'Strength', 'Zumba', 'Cardio', 'Recovery'];

export default function InteractiveSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredClasses = SCHEDULE_DATA[selectedDay].filter(
    (cls) => selectedCategory === 'All' || cls.type === selectedCategory
  );

  const handleBookSlot = (className: string, time: string) => {
    const text = `Hi Leegend Muscle Factory! I'd like to book a spot for the "${className}" class on ${selectedDay} at ${time}. Please confirm my slot.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="schedule" className="py-24 bg-charcoal-dark relative overflow-hidden">
      {/* Background Glowing Orb */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-lime/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-lime/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-lime" />
            <span className="font-display font-bold text-lime text-sm uppercase tracking-[0.3em]">
              Daily Timings
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white">
              Weekly Class Schedule
            </h2>
            <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
              Find and pre-book your favourite workouts, expert training groups, and explosive Zumba sessions.
            </p>
          </div>
        </div>

        {/* Day Selectors */}
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar border-b border-charcoal-border/50">
          {WEEK_DAYS.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-3 px-6 rounded-lg font-display font-bold text-xs uppercase tracking-wider text-center border transition-all duration-300 flex-shrink-0 ${
                  isSelected
                    ? 'bg-lime border-lime text-black shadow-lg shadow-lime/20 scale-102'
                    : 'bg-charcoal border-charcoal-border text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-4 rounded-full font-display font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-lime/25 text-lime border border-lime/40 shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                    : 'bg-charcoal-light/40 text-gray-400 border border-transparent hover:border-charcoal-border hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Schedule Slots */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls, idx) => {
                let intensityColor = 'text-lime';
                if (cls.intensity === 'High') intensityColor = 'text-orange-400';
                if (cls.intensity === 'Extreme') intensityColor = 'text-red-500';

                return (
                  <motion.div
                    key={`${selectedDay}-${cls.name}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group relative bg-charcoal border border-charcoal-border rounded-xl p-6 hover:border-lime/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top meta tags */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-charcoal-light border border-charcoal-border/80 px-2.5 py-1 rounded text-[10px] font-display font-black uppercase text-gray-400 tracking-wider">
                          {cls.type === 'Strength' && <Dumbbell className="w-3 h-3 text-lime" />}
                          {cls.type === 'Zumba' && <Flame className="w-3 h-3 text-lime" />}
                          {cls.type === 'Cardio' && <Flame className="w-3 h-3 text-lime" />}
                          {cls.type === 'Recovery' && <Sparkles className="w-3 h-3 text-lime" />}
                          {cls.type}
                        </span>
                        <span className="text-[10px] font-display font-bold uppercase text-gray-500 tracking-widest flex items-center gap-1">
                          Intensity:{' '}
                          <span className={`font-black uppercase ${intensityColor}`}>
                            {cls.intensity}
                          </span>
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2 text-lime mb-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="font-display font-black uppercase tracking-wider text-sm">
                          {cls.time}
                        </span>
                      </div>

                      {/* Class Name */}
                      <h3 className="font-display font-black text-white text-xl sm:text-2xl uppercase tracking-wide group-hover:text-lime transition-colors">
                        {cls.name}
                      </h3>
                    </div>

                    {/* Bottom stats and action */}
                    <div className="mt-6 pt-4 border-t border-charcoal-border/50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4 text-lime" />
                        <span className="font-semibold text-gray-300">{cls.coach}</span>
                      </div>

                      <button
                        onClick={() => handleBookSlot(cls.name, cls.time)}
                        className="inline-flex items-center gap-1 bg-lime text-black font-display font-black text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-lime-300 transition-all shadow shadow-lime/10 group-hover:scale-102"
                      >
                        Book Class
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="no-classes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 text-center border border-dashed border-charcoal-border rounded-xl"
              >
                <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-display font-bold uppercase tracking-wider">
                  No classes listed under this category for {selectedDay}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Check our active standard floor hours open 7 days a week for open training.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
