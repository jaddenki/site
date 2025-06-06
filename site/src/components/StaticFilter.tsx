import { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface StaticFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function StaticFilter({ categories, activeCategory, onCategoryChange }: StaticFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-['PolySans-Neutral'] transition-all duration-300 ease-out
            border border-muted hover:border-accent
            ${activeCategory === category.id 
              ? 'bg-accent text-background border-accent' 
              : 'bg-background text-secondary hover:text-accent'
            }
          `}
          style={{
            transform: activeCategory === category.id ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
} 