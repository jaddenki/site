import { useState, useEffect } from 'react';

const themes = [
  { name: 'light', icon: '(^_^)' },
  { name: 'dark', icon: '(¬_¬)' },
  { name: 'blue', icon: '(0_0)' },
  { name: 'green', icon: '(>_<)' },
  { name: 'pink', icon: '(♥//♥)' },
  { name: 'orange', icon: '(3_3)' },
  { name: 'purple', icon: '(T_T)' }
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (theme !== savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-button p-2 text-secondary hover:text-accent transition-colors"
        aria-label="Theme switcher"
      >
        {themes.find(t => t.name === theme)?.icon}
      </button>
      
      {isOpen && (
        <div className="theme-dropdown absolute right-0 mt-1 rounded-lg bg-muted/20 backdrop-blur-sm min-w-[100px] z-50">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => handleThemeChange(t.name)}
              className={`w-full text-center py-2 transition-colors hover:bg-muted/30
                ${theme === t.name ? 'text-accent' : 'text-secondary'}`}
            >
              {t.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 