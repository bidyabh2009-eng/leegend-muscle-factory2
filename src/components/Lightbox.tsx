import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  index: number | null;
  images: Array<{ src: string; alt: string; span?: string }>;
  onClose: () => void;
  onNavigate: (newIdx: number) => void;
}

export default function Lightbox({ index, images, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || index === null) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((index + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-charcoal-dark border border-charcoal-border text-white hover:text-lime hover:border-lime transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation - Prev */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal-dark/80 border border-charcoal-border/50 text-white hover:text-lime hover:border-lime transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Container with scale animation */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        >
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl border border-charcoal-border/40 select-none"
          />
          {images[index].alt && (
            <p className="mt-4 text-center text-sm font-display text-gray-400 max-w-2xl px-4">
              {images[index].alt}
            </p>
          )}
        </motion.div>

        {/* Navigation - Next */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal-dark/80 border border-charcoal-border/50 text-white hover:text-lime hover:border-lime transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnail Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-55 flex gap-2 overflow-x-auto max-w-[90vw] py-2 px-4 bg-black/60 backdrop-blur-md rounded-full border border-charcoal-border/40">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                index === i ? 'bg-lime w-6 shadow-[0_0_8px_rgba(163,230,53,0.8)]' : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
