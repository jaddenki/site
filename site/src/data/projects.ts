interface Project {
  title: string;
  description: string;
  date: string;
  link: string;
  image?: string;
  tags: string[];
  published: boolean;
}

export const projects: Project[] = [
  {
    title: 'procedural leaf venation',
    description: 'a visualization of leaf venation patterns using various cellular automata algorithms.',
    date: '2025-05-05',
    tags: ['p5js', 'generative-art', 'graphics'],
    link: '/projects/leaf-venation',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1747590036/2025-05-18_10-39-00_od4bz6.mp4',
    published: true
  },

  {
    title: 'BURST ✷',
    description: 'a showcase of student-made creative technical projects by purdue hackers.',
    date: '2024-12-06',
    tags: ['people', 'design', 'javascript'],
    link: '/projects/burst',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1743790359/ScreenRecording_04-04-2025_14-09-09_1_pcvdpj.mov',
    published: true
  },
  {
    title: 'etea',
    description: 'a video game where you\'re an alien bobarista pretending to be human.',
    date: '2024-06-20',
    tags: ['unity', 'game-dev', 'c#'],
    link: '/projects/etea',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1743719918/ETea_-_Reveal_Teaser_1080_ihqygh.mp4',
    published: true
  },
  {
    title: 'crowd-aware multi-agent ai',
    description: 'simulating NPC behavior with RVO and behavior trees to model realistic crowd interactions in virtual environments.',
    date: '2024-02-15',
    tags: ['unreal', 'game-dev', 'ai'],
    link: 'https://www.youtube.com/watch?v=6aNsE8aDWFE',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1743735503/2025-04-03_22-52-27_ojdghr_8c6d24.mp4',
    published: true
  },
  {
    title: 'venture n vision',
    description: 'meta quest 3 vr app where you pitch to robot investors.',
    date: '2024-02-01',
    tags: ['unity', 'vr', 'ai', 'blender'],
    link: '#',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1743789735/asdfasdfsdfffdsadf_qadqin.mp4',
    published: true
  },
  {
    title: 'c3 game jam',
    description: 'a game jam focused on translating academic research into playable experiences.',
    date: '2025-03-15',
    tags: ['people', 'game-dev'],
    link: '/projects/game-jam',
    image: 'https://i.imgur.com/EgjmE20.jpeg',
    published: true
  },
  {
    title: 'computing for community collaboratory',
    description: 'a website for the past and future of computing for community collaboratory.',
    date: '2025-03-15',
    tags: ['web-dev', 'react', 'astro', 'people'],
    link: 'https://honors.purdue.edu/research/generators/c3.php',
    image: 'https://res.cloudinary.com/dghjime6m/video/upload/v1747588913/2025-05-17_22-30-57_d5rwif.mp4',
    published: true
  }

]; 
