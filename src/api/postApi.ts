import axios from "axios";

const BASE_URL = "https://suitmedia-backend.suitdev.com/api/ideas";

export const getPosts = async ({
  number = 1,
  size = 10,
  typeImage = ["small_image", "medium_image"],
  published = "published_at",
}: {
  number?: number;
  size?: number;
  typeImage?: string[];
  published?: string;
}) => {
  const params = new URLSearchParams();

  params.append("page[number]", number.toString());
  params.append("page[size]", size.toString());
  typeImage.forEach((type) => params.append("append[]", type));
  params.append("sort", published);

  const res = await axios.get(`${BASE_URL}?${params.toString()}`);
  return res.data;
};
