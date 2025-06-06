import { useState } from 'react';

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

interface StaticImageCardProps {
  work: StaticWork;
  index: number;
  onImageClick: (work: StaticWork) => void;
}

export default function StaticImageCard({ work, index, onImageClick }: StaticImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getGridClasses = (size: string) => {
    switch (size) {
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      case 'portrait':
        return 'md:row-span-2';
      case 'square':
      default:
        return '';
    }
  };

  const getAspectRatio = (size: string) => {
    switch (size) {
      case 'wide':
        return 'aspect-[2/1]';
      case 'tall':
        return 'aspect-[4/5]';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'square':
      default:
        return 'aspect-square';
    }
  };

  return (
    <article 
      className={`group transition-all duration-500 ease-out ${getGridClasses(work.size)}`}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className={`${getAspectRatio(work.size)} relative overflow-hidden rounded-2xl bg-muted mb-4 cursor-pointer`}
        onClick={() => onImageClick(work)}
      >
        <img
          src={work.image}
          alt={work.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Click to View Overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-['PolySans-Neutral'] text-black">
            Click to view full size
          </div>
        </div>

        {/* Featured Badge */}
        {work.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-accent text-background px-3 py-1 rounded-full text-xs font-['PolySans-Neutral'] font-medium">
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div className="space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-muted text-secondary font-['PolySans-Neutral'] transition-colors duration-200 group-hover:bg-accent group-hover:text-background"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-foreground font-['Redaction-35'] text-xl group-hover:text-accent transition-colors duration-200">
          {work.title}
        </h3>
        
        {/* Description */}
        <p className="text-secondary text-sm font-['PolySans-Neutral'] leading-relaxed">
          {work.description}
        </p>
        
        {/* Year and Client */}
        <div className="flex items-center justify-between text-secondary text-xs font-['PolySans-Neutral']">
          <span>{work.year}</span>
          {work.client && <span className="text-accent">{work.client}</span>}
        </div>
      </div>
    </article>
  );
} 