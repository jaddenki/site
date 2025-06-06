import { useState, useEffect } from 'react';
import StaticFilter from './StaticFilter';
import StaticImageCard from './StaticImageCard';
import ImageModal from './ImageModal';

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

interface Category {
  id: string;
  name: string;
}

interface StaticGalleryProps {
  works: StaticWork[];
  categories: Category[];
}

export default function StaticGallery({ works, categories }: StaticGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedWork, setSelectedWork] = useState<StaticWork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveCategory(categoryId);
      const filtered = categoryId === 'all' 
        ? works 
        : works.filter(work => work.category === categoryId);
      setFilteredWorks(filtered);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 200);
  };

  const handleImageClick = (work: StaticWork) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedWork(null);
    }, 300);
  };

  return (
    <div className="static-gallery">
      <StaticFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-min transition-all duration-300 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {filteredWorks.map((work, index) => (
          <div
            key={`${work.id}-${activeCategory}`}
            className={activeCategory !== 'all' ? 'animate-fade-in' : ''}
            style={{ 
              animationDelay: activeCategory !== 'all' ? `${index * 50}ms` : '0ms',
              animationFillMode: 'both'
            }}
          >
            <StaticImageCard 
              work={work} 
              index={index} 
              onImageClick={handleImageClick}
            />
          </div>
        ))}
      </div>

      {filteredWorks.length === 0 && (
        <div className="text-center py-16">
          <p className="text-secondary font-['PolySans-Neutral'] text-lg">
            No work found in this category.
          </p>
        </div>
      )}

      <ImageModal
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allWorks={works}
      />
    </div>
  );
} 