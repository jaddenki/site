import type { APIRoute } from 'astro';

// Map of theme names to accent colors
const themeColors = {
  light: '#0000ff',
  dark: '#a5f839',
  blue: '#FC6736',
  green: '#f5539e',
  pink: '#667BC6',
  orange: '#0C2D57',
  purple: '#8062D6'
};

export const GET: APIRoute = ({ request }) => {
  // Get the theme from the query parameter
  const url = new URL(request.url);
  const theme = url.searchParams.get('theme') || 'light';
  
  // Get the color for the theme
  const color = themeColors[theme as keyof typeof themeColors] || themeColors.light;
  
  // Generate the SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="4" fill="${color}" />
  </svg>`;
  
  // Return the SVG with appropriate headers
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}; 