export type Image = {
  id: number;
  mime: string;
  file_name: string;
  url: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  small_image: Image[];
  medium_image: Image[];
};
