import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function InteractiveGrid({ children }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const createTile = (x: number, y: number) => {
      const tile = document.createElement('div');
      tile.className = 'absolute bg-accent/5 backdrop-blur-sm rounded-lg transform transition-all duration-500';
      tile.style.left = `${x}px`;
      tile.style.top = `${y}px`;
      tile.style.width = '120px';
      tile.style.height = '120px';
      
      // Add a subtle rotation based on position
      const rotation = Math.sin(x * 0.03) * 3;
      tile.style.transform = `rotate(${rotation}deg) scale(0.98)`;
      
      // Add hover effect
      tile.addEventListener('mouseenter', () => {
        tile.style.transform = `rotate(${rotation}deg) scale(1.05)`;
        tile.className = 'absolute bg-accent/10 backdrop-blur-sm rounded-lg transform transition-all duration-500';
      });
      
      tile.addEventListener('mouseleave', () => {
        tile.style.transform = `rotate(${rotation}deg) scale(0.98)`;
        tile.className = 'absolute bg-accent/5 backdrop-blur-sm rounded-lg transform transition-all duration-500';
      });

      return tile;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Remove old tiles
      const oldTiles = grid.querySelectorAll('[data-grid-tile]');
      oldTiles.forEach(tile => tile.remove());

      // Create new tiles in a 3x3 grid around mouse for subtler effect
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const tileX = Math.floor(x / 120) * 120 + i * 120;
          const tileY = Math.floor(y / 120) * 120 + j * 120;
          
          // Only create tile if it's within bounds
          if (tileX >= -120 && tileX <= rect.width && tileY >= -120 && tileY <= rect.height) {
            const tile = createTile(tileX, tileY);
            tile.setAttribute('data-grid-tile', '');
            grid.appendChild(tile);
          }
        }
      }
    };

    grid.addEventListener('mousemove', handleMouseMove);

    // Add initial tiles
    const width = grid.clientWidth;
    const height = grid.clientHeight;
    for (let x = 0; x < width; x += 120) {
      for (let y = 0; y < height; y += 120) {
        const tile = createTile(x, y);
        tile.setAttribute('data-grid-tile', '');
        grid.appendChild(tile);
      }
    }

    return () => grid.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={gridRef} className="relative min-h-[400px] overflow-hidden rounded-xl bg-muted/10">
      <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
} 