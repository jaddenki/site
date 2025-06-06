import { useEffect, useState } from 'react';

interface StaticWork {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'branding' | 'graphic-design' | 'logo' | 'poster' | 'identity' | 'web-design';
  tags: string[];
  year: string;
  client?: string;
  size: 'square' | 'wide' | 'tall' | 'portrait';
  featured?: boolean;
}

interface ImageModalProps {
  work: StaticWork | null;
  isOpen: boolean;
  onClose: () => void;
  allWorks: StaticWork[];
}

export default function ImageModal({ work, isOpen, onClose, allWorks }: ImageModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !work) return null;

  // Check if this is a project with multiple images
  const isMultiImageProject = work.id === 'five-dynamics-branding' || work.id === 'indigoclub-website' || work.id === 'c3atpurdue-website';
  
  // Get project images
  let projectImages: string[] = [work.image];
  
  if (work.id === 'five-dynamics-branding') {
    projectImages = [
      'https://i.imgur.com/VCrGftT.png', // Style guide 1
      'https://i.imgur.com/lElhqG6.png', // Style guide 2
      'https://i.imgur.com/waWitSQ.png', // Main logo
      'https://i.imgur.com/K8TtE7P.png', // Logo variations
      'https://i.imgur.com/ux86Va2.png', // More logo variations
      'https://i.imgur.com/k85Vk9E.gif'  // Website mockup
    ];
  } else if (work.id === 'indigoclub-website') {
    projectImages = [
      'https://i.imgur.com/fQRHoJr.png',
      'https://i.imgur.com/4SfZun6.png'
    ];
  } else if (work.id === 'c3atpurdue-website') {
    projectImages = [
      'https://i.imgur.com/Apd6boO.jpeg',
      'https://i.imgur.com/ExulWX4.jpeg'
    ];
  }

  const currentImage = isMultiImageProject ? projectImages[activeImageIndex] : work.image;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
      onClick={onClose}
    >
      <div 
        className="relative flex flex-col items-center"
        style={{
          animation: 'modalFadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors duration-200 z-10 text-2xl"
        >
          ✕
        </button>

        {/* Navigation dots for multi-image projects */}
        {isMultiImageProject && projectImages.length > 1 && (
          <div className="absolute -top-12 left-0 flex gap-2 z-10">
            {projectImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === activeImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Fixed Height Image Container */}
        <div className="flex items-center justify-center w-[90vw] h-[70vh]">
          <img
            src={currentImage}
            alt={work.title}
            className="max-w-full max-h-full object-contain"
            style={{
              animation: 'imageZoomIn 0.3s ease-out',
            }}
          />
        </div>
        
        {/* Navigation Arrows Below Image - Fixed Position */}
        {isMultiImageProject && projectImages.length > 1 && (
          <div className="flex items-center justify-center gap-8 mt-6">
            <button
              onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : projectImages.length - 1)}
              className="text-white/70 hover:text-white transition-colors duration-200 text-2xl px-4 py-2"
            >
              ← Previous
            </button>
            <span className="text-white/50 text-sm font-['PolySans-Neutral']">
              {activeImageIndex + 1} of {projectImages.length}
            </span>
            <button
              onClick={() => setActiveImageIndex(prev => prev < projectImages.length - 1 ? prev + 1 : 0)}
              className="text-white/70 hover:text-white transition-colors duration-200 text-2xl px-4 py-2"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes imageZoomIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
} 