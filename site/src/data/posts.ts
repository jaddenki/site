export interface Post {
  title: string;
  description: string;
  date: string;
  link: string;
  published?: boolean;
}

export const posts: Post[] = [
  {
    title: "Recommendations",
    description: "A curated list of things I love — from software tools to music to snacks.",
    date: "2024-03",
    link: "/blog/recommendations",
    published: true
  },
  {
    title: "Coming soon...",
    description: "I'll be sharing my thoughts on tech, design, and creative coding here.",
    date: "2024",
    link: "#",
    published: false
  }
]; 