import { useEffect, useState } from 'react';

export default function Tooltip() {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const article = target.closest('article');
      
      if (article) {
        const title = article.getAttribute('data-title');
        if (title) {
          setTooltip({
            show: true,
            text: title,
            x: e.clientX,
            y: e.clientY
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const article = target.closest('article');
      
      if (article && tooltip.show) {
        setTooltip(prev => ({
          ...prev,
          x: e.clientX,
          y: e.clientY
        }));
      } else if (!article && tooltip.show) {
        // Hide tooltip if mouse is not over any article
        setTooltip(prev => ({ ...prev, show: false }));
      }
    };

    const handleMouseLeave = () => {
      setTooltip(prev => ({ ...prev, show: false }));
    };

    const handleScroll = () => {
      setTooltip(prev => ({ ...prev, show: false }));
    };

    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
      article.addEventListener('mouseenter', handleMouseEnter);
      article.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      articles.forEach(article => {
        article.removeEventListener('mouseenter', handleMouseEnter);
        article.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tooltip.show]);

  if (!tooltip.show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        left: tooltip.x,
        top: tooltip.y - 50,
        transform: `translateX(-50%) scale(${tooltip.show ? 1 : 0.8})`,
        transformOrigin: 'center bottom',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--accent)',
        padding: '0.75rem 1.25rem',
        borderRadius: '2rem',
        border: '1px solid var(--accent)',
        fontSize: '0.875rem',
        pointerEvents: 'none',
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        fontFamily: 'PolySans-Neutral',
        whiteSpace: 'nowrap',
        width: 'auto',
        minWidth: '80px',
        maxWidth: '400px',
        opacity: tooltip.show ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {tooltip.text}
    </div>
  );
}