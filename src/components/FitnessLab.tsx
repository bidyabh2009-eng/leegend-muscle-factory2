import { useState } from 'react';
import { Calculator, Sparkles, Send, Dumbbell, Utensils, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_URL } from '../data';

export default function FitnessLab() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'plan'>('bmi');

  // BMI Calculator States
  const [weight, setWeight] = useState<string>('72');
  const [height, setHeight] = useState<string>('176');
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    idealWeightRange: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    color: string;
  } | null>({
    bmi: 23.2,
    category: 'Normal Weight',
    idealWeightRange: '57.3 kg - 77.1 kg',
    calories: 2376,
    protein: 144,
    carbs: 275,
    fats: 66,
    color: 'text-lime',
  });

  // Planner States
  const [goal, setGoal] = useState<string>('Bulk Up');
  const [level, setLevel] = useState<string>('Intermediate');
  const [generatedPlan, setGeneratedPlan] = useState<{
    diet: string[];
    workout: string[];
    tips: string[];
  } | null>({
    diet: [
      'Breakfast: 4 whole eggs, 100g oats with almonds & banana',
      'Mid-Day: Chicken breast (150g) with white rice & broccoli',
      'Pre-Workout: Sweet potato (150g) and black coffee / whey protein',
      'Post-Workout: Whey protein shake, rice cakes with honey',
      'Dinner: Grilled fish or Paneer, boiled brown rice, mixed green salad'
    ],
    workout: [
      'Day 1: Heavy Chest & Triceps (Bench Press, Incline Dumbbell, Dips)',
      'Day 2: Back & Biceps hypertrophy (Pull-ups, Deadlifts, Barbell Curls)',
      'Day 3: Quad & Calf Dominant Leg Day (Squats, Leg Press, Extensions)',
      'Day 4: Shoulder & Core Sculpt (Military Press, Lateral Raises, Planks)',
      'Day 5: Full Body Power & Muscle pump sessions'
    ],
    tips: [
      'Focus on progressive overload: increase weights weekly.',
      'Sleep 7-8 hours daily for muscle tissue repair.',
      'Stay in a clean calorie surplus of 300-500 kcal.'
    ]
  });

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';
      if (bmi < 18.5) {
        category = 'Underweight (Need Surplus)';
        color = 'text-cyan-400';
      } else if (bmi < 25) {
        category = 'Optimal Fitness Range';
        color = 'text-lime';
      } else if (bmi < 30) {
        category = 'Overweight (Need Shred)';
        color = 'text-orange-400';
      } else {
        category = 'Obese (Need Lifestyle Change)';
        color = 'text-red-500';
      }

      const minIdeal = (18.5 * h * h).toFixed(1);
      const maxIdeal = (24.9 * h * h).toFixed(1);
      const idealWeightRange = `${minIdeal} kg - ${maxIdeal} kg`;

      const calories = Math.round(w * 33);
      const protein = Math.round(w * 2);
      const fats = Math.round((calories * 0.25) / 9);
      const carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);

      setBmiResult({ bmi, category, idealWeightRange, calories, protein, carbs, fats, color });
    }
  };

  const handleGeneratePlan = () => {
    let diet: string[] = [];
    let workout: string[] = [];
    let tips: string[] = [];

    if (goal === 'Bulk Up') {
      diet = [
        'Breakfast: 4 whole eggs, 100g oats with almonds & banana',
        'Mid-Day: Chicken breast (150g) with white rice & broccoli',
        'Pre-Workout: Sweet potato (150g) and black coffee / whey protein',
        'Post-Workout: Whey protein shake, rice cakes with honey',
        'Dinner: Grilled fish or Paneer, boiled brown rice, mixed green salad'
      ];
      workout = [
        'Day 1: Heavy Chest & Triceps (Bench Press, Incline Dumbbell, Dips)',
        'Day 2: Back & Biceps hypertrophy (Pull-ups, Deadlifts, Barbell Curls)',
        'Day 3: Quad & Calf Dominant Leg Day (Squats, Leg Press, Extensions)',
        'Day 4: Shoulder & Core Sculpt (Military Press, Lateral Raises, Planks)',
        'Day 5: Full Body Power & Muscle pump sessions'
      ];
      tips = [
        'Focus on progressive overload: increase weights weekly.',
        'Sleep 7-8 hours daily for muscle tissue repair.',
        'Stay in a clean calorie surplus of 300-500 kcal.'
      ];
    } else if (goal === 'Shred & Lean') {
      diet = [
        'Breakfast: 5 egg whites, 1 whole egg, spinach & handful of berries',
        'Mid-Day: Grilled chicken breast (150g) with leafy greens & olive oil',
        'Pre-Workout: 1 apple with 1 tbsp peanut butter',
        'Post-Workout: Whey protein isolate in water, handful of walnuts',
        'Dinner: Salmon or baked Tofu, asparagus, sweet potato (50g)'
      ];
      workout = [
        'Day 1: Upper Body Push & Cardio HIIT (Incline press, lateral raises, 15m sprints)',
        'Day 2: Lower Body Hypertrophy (Deadlifts, lunges, leg curls)',
        'Day 3: Active Recovery: 45 min fast-paced walking or low-intensity cardio',
        'Day 4: Back & Arms Endurance (Pull-downs, rows, facepulls, hammer curls)',
        'Day 5: Intense Zumba Dance session or high-intensity circuits'
      ];
      tips = [
        'Maintain a moderate calorie deficit (200-400 kcal).',
        'Keep protein intake high to preserve muscle mass.',
        'Drink 4-5 liters of water daily to boost metabolism.'
      ];
    } else if (goal === 'Endurance & Zumba') {
      diet = [
        'Breakfast: Whole wheat toast with avocado and 3 poached eggs',
        'Mid-Day: Quinoa salad with mixed beans, tomatoes & cucumber',
        'Pre-Workout: 1 banana and beetroot juice for natural stamina',
        'Post-Workout: Fruit smoothie with Greek yogurt and flaxseeds',
        'Dinner: Sautéed paneer/chicken with seasonal roasted vegetables'
      ];
      workout = [
        'Day 1: High-energy Zumba Class (cardio & rhythm)',
        'Day 2: Full Body functional training (Kettlebell swings, clean & press)',
        'Day 3: Core, Stability & Flexibility (Planks, Russian twists, stretching)',
        'Day 4: Zumba Cardio Blast (Zumba choreography with resistance bands)',
        'Day 5: Bodyweight endurance circuits (Burpees, mountain climbers, jump squats)'
      ];
      tips = [
        'Eat complex carbs before classes to power up endurance.',
        'Electrolyte hydration is key: drink during intense cardio sessions.',
        'Incorporate active stretching to avoid stiffness.'
      ];
    } else {
      // Strength Build
      diet = [
        'Breakfast: 4 whole eggs, peanut butter sandwich, bowl of oatmeal',
        'Mid-Day: Lean beef or soya chunks curry with brown rice and lentils',
        'Pre-Workout: Rice with pre-workout meal or black coffee',
        'Post-Workout: Creatine with protein shake and banana',
        'Dinner: Grilled chicken breast or grilled Paneer with mixed sautéed greens'
      ];
      workout = [
        'Day 1: Squat strength focus (3x5 Squats, Leg extensions, Hamstring curls)',
        'Day 2: Bench press strength focus (3x5 Bench press, Overhead press, Tricep pushdowns)',
        'Day 3: Deadlift power focus (3x5 Deadlifts, Lat pull-downs, Dumbbell rows)',
        'Day 4: Overhead Press focus (3x5 Military Press, pull-ups, lateral raises)',
        'Day 5: Accessory training & explosive core movements'
      ];
      tips = [
        'Track your 1-Rep Max progress carefully.',
        'Rest 3-4 minutes between heavy compound sets.',
        'Stay consistent with creatine and sodium intake.'
      ];
    }

    setGeneratedPlan({ diet, workout, tips });
  };

  const handleSharePlan = () => {
    if (!generatedPlan) return;
    const shareText = `Hi Leegend Muscle Factory! I generated a custom planner on your website.%0A%0A*My Fitness Goal:* ${goal}%0A*My Experience Level:* ${level}%0A%0A*Requesting a session to consult with a trainer.*`;
    window.open(`${WHATSAPP_URL}?text=${shareText}`, '_blank');
  };

  return (
    <section id="fitness-lab" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-lime animate-pulse" />
            <span className="font-display font-semibold text-lime text-xs uppercase tracking-widest">
              Leegend Gym Laboratory
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase text-white leading-none tracking-tight">
            Interactive <span className="text-lime text-shadow-glow">Fitness Lab</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Test your stats, get your personalized fitness metrics, and preview customized workout & diet roadmaps.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-charcoal-dark border border-charcoal-border p-1 rounded-lg flex items-center">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`px-6 py-2.5 rounded-md font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'bmi'
                  ? 'bg-lime text-black shadow-lg shadow-lime/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 inline-block mr-2" />
              BMI & Macros
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2.5 rounded-md font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'plan'
                  ? 'bg-lime text-black shadow-lg shadow-lime/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Dumbbell className="w-4 h-4 inline-block mr-2" />
              Workout & Diet Planner
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'bmi' ? (
            <motion.div
              key="bmi-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Form Input */}
              <div className="lg:col-span-5 bg-charcoal-light/60 backdrop-blur-md border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow">
                <h3 className="font-display font-bold text-white text-2xl uppercase tracking-wide mb-6 flex items-center gap-2">
                  <Calculator className="text-lime" />
                  Measure Your Physique
                </h3>
                <form onSubmit={calculateBMI} className="space-y-5">
                  <div>
                    <label className="block font-display text-xs text-gray-400 uppercase tracking-wider mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="150"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full h-2 bg-charcoal-dark rounded-lg appearance-none cursor-pointer accent-lime"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">40 kg</span>
                      <span className="text-lg font-display font-black text-lime">{weight} kg</span>
                      <span className="text-xs text-gray-500">150 kg</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-display text-xs text-gray-400 uppercase tracking-wider mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="range"
                      min="130"
                      max="220"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full h-2 bg-charcoal-dark rounded-lg appearance-none cursor-pointer accent-lime"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">130 cm</span>
                      <span className="text-lg font-display font-black text-lime">{height} cm</span>
                      <span className="text-xs text-gray-500">220 cm</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-lime hover:bg-lime-300 text-black font-display font-black uppercase text-sm tracking-widest rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    Calculate Targets
                  </button>
                </form>
              </div>

              {/* Output / Results */}
              <div className="lg:col-span-7 space-y-6">
                {bmiResult && (
                  <div className="bg-charcoal-dark/40 backdrop-blur-md border border-lime/20 rounded-xl p-6 lg:p-8 neon-border-pulse">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <div className="text-xs font-display text-gray-400 uppercase tracking-widest mb-1">
                          Body Mass Index (BMI)
                        </div>
                        <div className="font-display font-black text-6xl text-white flex items-baseline gap-2">
                          {bmiResult.bmi}
                          <span className={`text-sm font-bold uppercase tracking-wider ${bmiResult.color}`}>
                            {bmiResult.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Ideal weight for your height is <span className="text-lime font-bold">{bmiResult.idealWeightRange}</span>.
                        </p>
                      </div>

                      <div className="border-t md:border-t-0 md:border-l border-charcoal-border pt-6 md:pt-0 md:pl-6">
                        <div className="text-xs font-display text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-lime" /> Daily Maintenance Calories
                        </div>
                        <div className="font-display font-black text-4xl text-lime">
                          {bmiResult.calories} <span className="text-sm font-bold text-white uppercase">kcal / day</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Estimated calories to sustain current weight at moderate training.
                        </p>
                      </div>
                    </div>

                    {/* Macronutrients display */}
                    <div className="mt-8 pt-6 border-t border-charcoal-border">
                      <h4 className="font-display font-bold text-white text-base uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-lime" /> Muscle-Building Macro Distribution
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-charcoal-light/50 p-4 rounded-lg border border-charcoal-border">
                          <div className="text-xs text-gray-400 uppercase font-semibold">Protein</div>
                          <div className="font-display font-black text-2xl text-white mt-1">
                            {bmiResult.protein}g
                          </div>
                          <div className="w-full bg-charcoal-dark h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-lime h-full" style={{ width: '30%' }} />
                          </div>
                          <span className="text-[10px] text-gray-500">Tissue Repair</span>
                        </div>

                        <div className="bg-charcoal-light/50 p-4 rounded-lg border border-charcoal-border">
                          <div className="text-xs text-gray-400 uppercase font-semibold">Carbohydrates</div>
                          <div className="font-display font-black text-2xl text-white mt-1">
                            {bmiResult.carbs}g
                          </div>
                          <div className="w-full bg-charcoal-dark h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-lime h-full" style={{ width: '50%' }} />
                          </div>
                          <span className="text-[10px] text-gray-500">Pure Energy</span>
                        </div>

                        <div className="bg-charcoal-light/50 p-4 rounded-lg border border-charcoal-border">
                          <div className="text-xs text-gray-400 uppercase font-semibold">Fats</div>
                          <div className="font-display font-black text-2xl text-white mt-1">
                            {bmiResult.fats}g
                          </div>
                          <div className="w-full bg-charcoal-dark h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-lime h-full" style={{ width: '20%' }} />
                          </div>
                          <span className="text-[10px] text-gray-500">Hormonal Balance</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <a
                        href="#membership"
                        className="inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase text-lime hover:text-white transition-colors"
                      >
                        Enquire custom diet plan <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="bg-charcoal-light/30 border border-charcoal-border rounded-xl p-5 flex gap-4 items-start">
                  <Info className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Disclaimer: These values are generated as estimates using mathematical metrics (Harris-Benedict formula). For fully medical or diagnostic nutritional prescription, always schedule one-on-one sessions with Leegend Muscle Factory experienced personal dieticians.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plan-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Selector Panel */}
              <div className="lg:col-span-4 bg-charcoal-light/60 backdrop-blur-md border border-charcoal-border rounded-xl p-6 neon-box-glow">
                <h3 className="font-display font-bold text-white text-2xl uppercase tracking-wide mb-6 flex items-center gap-2">
                  <Dumbbell className="text-lime" />
                  Choose Target
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block font-display text-xs text-gray-400 uppercase tracking-wider mb-2">
                      Primary Fitness Goal
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Bulk Up', 'Shred & Lean', 'Endurance & Zumba', 'Strength Build'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGoal(g)}
                          className={`py-3 px-2 rounded font-['Verdana'] font-bold text-[15px] leading-[18px] uppercase text-center border transition-all ${
                            goal === g
                              ? 'bg-lime border-lime text-[#000000] shadow-lg shadow-lime/10'
                              : 'bg-charcoal-dark border-charcoal-border text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-display text-xs text-gray-400 uppercase tracking-wider mb-2">
                      Fitness Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLevel(l)}
                          className={`py-2.5 px-1 rounded font-bold uppercase text-center border transition-all ${
                            l === 'Intermediate'
                              ? "font-['Arial'] text-[11px]"
                              : "font-['Verdana'] text-[12px] leading-[17.5px]"
                          } ${
                            level === l
                              ? 'bg-lime border-lime text-black'
                              : 'bg-charcoal-dark border-charcoal-border text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGeneratePlan}
                    className="w-full mt-4 py-3.5 bg-lime hover:bg-lime-300 text-black font-['Times_New_Roman'] font-black uppercase text-[19px] tracking-widest rounded-md transition-all duration-300"
                  >
                    Build Dynamic Blueprint
                  </button>
                </div>
              </div>

              {/* Blueprint Results Panel */}
              <div className="lg:col-span-8">
                {generatedPlan ? (
                  <div className="bg-charcoal-light/40 backdrop-blur-md border border-charcoal-border rounded-xl p-6 lg:p-8 neon-box-glow-hover transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-charcoal-border">
                      <div>
                        <span className="text-xs bg-lime/10 border border-lime/30 text-lime px-2.5 py-1 rounded font-display font-bold uppercase tracking-wider">
                          Goal: {goal}
                        </span>
                        <h4 className="font-display font-black text-2xl uppercase text-white mt-2">
                          Your Athletic Blueprint Outline
                        </h4>
                      </div>
                      <button
                        onClick={handleSharePlan}
                        className="inline-flex items-center gap-2 bg-lime/10 border border-lime/30 hover:bg-lime hover:text-black text-lime font-display font-bold text-xs uppercase px-4 py-2.5 rounded transition-all"
                      >
                        <Send className="w-3.5 h-3.5" /> Speak to Coach
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Diet Block */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Utensils className="w-4 h-4 text-lime" />
                          <h5 className="font-display font-bold text-white text-base uppercase tracking-wider">
                            Nutritional Schedule
                          </h5>
                        </div>
                        <ul className="space-y-3">
                          {generatedPlan.diet.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-300 bg-charcoal-dark/50 p-2.5 rounded border border-charcoal-border/50 flex gap-2">
                              <span className="text-lime font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Workout Block */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Dumbbell className="w-4 h-4 text-lime" />
                          <h5 className="font-display font-bold text-white text-base uppercase tracking-wider">
                            Weekly Gym Split
                          </h5>
                        </div>
                        <ul className="space-y-3">
                          {generatedPlan.workout.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-300 bg-charcoal-dark/50 p-2.5 rounded border border-charcoal-border/50 flex gap-2">
                              <span className="text-lime font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="mt-6 pt-5 border-t border-charcoal-border bg-lime/5 p-4 rounded-lg border border-lime/20">
                      <h5 className="font-display font-bold text-lime text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Elite Coaching Tips ({level})
                      </h5>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {generatedPlan.tips.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-lime flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 bg-charcoal-light/30 border border-charcoal-border rounded-xl flex items-center justify-center text-gray-400">
                    Click Generate to build your customized athletic path blueprint...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
