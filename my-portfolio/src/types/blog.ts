export interface BlogPost {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
}

export interface BlogCardProps {
  post: BlogPost;
  index: number;
}