import { useState, useEffect } from 'react';

const themes = [
  { name: 'light', icon: '(^_^)' },
  { name: 'dark', icon: '(¬_¬)' },
  { name: 'blue', icon: '(0_0)' },
  { name: 'green', icon: '(>_<)' },
  { name: 'pink', icon: '(o//o)' },
  { name: 'orange', icon: '(3_3)' },
  { name: 'purple', icon: '(T_T)' }
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Get stored theme or check system preference
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get stored theme or check system preference
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      if (theme !== storedTheme) {
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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
        <div className="theme-dropdown absolute right-0 top-full mt-2 pt-2 pb-2 border border-accent rounded-md bg-background/60 backdrop-blur-md min-w-[60px] w-auto z-50">
          <div className="grid grid-cols-1">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => handleThemeChange(t.name)}
                className={`border-0 text-center py-1 px-2 pt-3 pb-3 transition-colors hover:bg-muted/30
                  ${theme === t.name ? 'text-accent' : 'text-secondary'}`}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 