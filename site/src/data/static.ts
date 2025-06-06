export interface StaticWork {
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

export const staticWorks: StaticWork[] = [
  {
    id: 'five-dynamics-branding',
    title: 'Five Dynamics Branding',
    description: 'Complete brand identity for suborbital rocket club including logo, style guide, and website design',
    image: 'https://i.imgur.com/waWitSQ.png',
    category: 'branding',
    tags: ['branding', 'aerospace', 'logo', 'style-guide'],
    year: '2024',
    client: 'Five Dynamics',
    size: 'wide',
  },
  {
    id: 'organization-promo',
    title: 'Organization Promotional Material',
    description: 'Series of promotional graphics created in Adobe Illustrator',
    image: 'https://i.imgur.com/0PioMBD.png',
    category: 'graphic-design',
    tags: ['illustrator', 'promotional', 'organization'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'circuits-design',
    title: 'Circuits',
    description: 'Circuit modeled in Blender, extruded and designed in Illustrator and Photoshop',
    image: 'https://i.imgur.com/U7a02ck.png',
    category: 'graphic-design',
    tags: ['blender', 'illustrator', 'photoshop', 'experimental'],
    year: '2024',
    size: 'portrait'
  },
  {
    id: 'chang-sweater',
    title: 'Chang Sweater Print',
    description: 'Neobrutalist birthday sweater design with sans serif fonts and hard drop shadows',
    image: 'https://i.imgur.com/M54uomw.png',
    category: 'graphic-design',
    tags: ['neobrutalist', 'apparel', 'birthday-gift'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'chang-sweater-sketch',
    title: 'Chang Sweater Sketch',
    description: 'Initial sketch and development process for the neobrutalist sweater design',
    image: 'https://i.imgur.com/3XqjDtx.png',
    category: 'graphic-design',
    tags: ['sketch', 'process', 'neobrutalist'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'chang-sweater-final',
    title: 'Chang Sweater Final',
    description: 'Final sweater with printed design showcasing neobrutalist aesthetic',
    image: 'https://i.imgur.com/3gC7JLX.jpeg',
    category: 'graphic-design',
    tags: ['apparel', 'final-product', 'neobrutalist'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'posterlad-inspired',
    title: 'Posterlad Inspiration',
    description: 'Poster exploration heavily inspired by Posterlad design principles',
    image: 'https://i.imgur.com/iNpueeH.jpeg',
    category: 'poster',
    tags: ['posterlad', 'inspiration', 'exploration'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'misc-exploration-1',
    title: 'Design Exploration',
    description: 'Experimental graphic design exploring typography and composition',
    image: 'https://i.imgur.com/hAgWXUt.png',
    category: 'graphic-design',
    tags: ['experimental', 'exploration', 'typography'],
    year: '2024',
    size: 'square'
  },
  {
    id: 'indigoclub-website',
    title: 'indigoclub.net',
    description: 'Website design and development for Indigo Club',
    image: 'https://i.imgur.com/fQRHoJr.png',
    category: 'web-design',
    tags: ['website', 'development', 'ui-design'],
    year: '2024',
    size: 'wide'
  },
  {
    id: 'c3atpurdue-website',
    title: 'c3atpurdue.org',
    description: 'Website design and development for C3 at Purdue',
    image: 'https://i.imgur.com/Apd6boO.jpeg',
    category: 'web-design',
    tags: ['website', 'development', 'organization'],
    year: '2024',
    size: 'wide'
  }
];

export const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'branding', name: 'Branding' },
  { id: 'graphic-design', name: 'Graphic Design' },
  { id: 'logo', name: 'Logos' },
  { id: 'poster', name: 'Posters' },
  { id: 'identity', name: 'Identity' },
  { id: 'web-design', name: 'Web Design' }
]; 