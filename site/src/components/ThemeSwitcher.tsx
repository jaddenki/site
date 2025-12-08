import { useState, useEffect } from 'react';

const themes = [
  { name: 'light', icon: '(n_n)' },
  { name: 'dark', icon: '(T_T)' },
  { name: 'blue', icon: '(0_0)' },
  { name: 'green', icon: '(>_<)' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
      const idx = themes.findIndex(t => t.name === storedTheme);
      if (idx !== -1) setCurrentIndex(idx);
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const cycleTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex].name;
    setCurrentIndex(nextIndex);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const currentTheme = themes.find(t => t.name === theme) || themes[0];

  return (
      <button
      onClick={cycleTheme}
      className="nav-item flex flex-col items-center text-secondary hover:text-accent transition-all duration-200 cursor-pointer"
      aria-label={`Current theme: ${theme}. Click to change.`}
      style={{ border: 'none', outline: 'none', background: 'transparent' }}
    >
      <span className="nav-icon">
        {currentTheme.icon}
      </span>
      <span className="nav-label">{theme}</span>
              </button>
  );
}