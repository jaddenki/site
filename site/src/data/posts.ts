export interface Post {
  title: string;
  description: string;
  date: string;
  link: string;
  published?: boolean;
}

export const posts: Post[] = [
  {
    title: "art and love are unglamorous",
    description: "my review of the movie look back, adapted from my personal letterboxd",
    date: "2024-10",
    link: "/blog/look-back",
    published: true
  },
  {
    title: "recommendations",
    description: "things i love",
    date: "2024-03",
    link: "/blog/recommendations",
    published: false
  },
  {
    title: "why i rationalize play",
    description: "i'm thinking through what it means to build things that serve no purpose except joy",
    date: "2023-11",
    link: "/blog/why-i-rationalize-play",
    published: true
  },
  {
    title: "the barefoot child",
    description: "thoughts on growing up between two worlds",
    date: "2022-08",
    link: "/blog/the-barefoot-child",
    published: true
  }
]; 