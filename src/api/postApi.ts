import axios from "axios";

const BASE_URL = "https://suitmedia-backend.suitdev.com/api/ideas";

export const getPosts = async ({
  number,
  size,
  typeImage,
  published,
}: {
  number?: number;
  size?: number;
  typeImage?: "small_image" | "medium_image";
  published?: "published_at" | "-published_at";
}) => {
  const res = await axios.get(
    `${BASE_URL}?page[number]=${number}&page[size]=${size}&append[]=${typeImage}&sort=${published}`
  );
  return res.data;
};

// export const getPostById = async (id) => {
//   const res = await axios.get(`${BASE_URL}/posts/${id}`);
//   return res.data;
// };
