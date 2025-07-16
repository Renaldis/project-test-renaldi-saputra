import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

const images = "";

const Ideas = () => {
  const [posts, setPosts] = useState();
  const [number, setNumber] = useState();
  const [size, setSize] = useState();
  const [typeImage, setTypeImage] = useState();
  const [published, setPublished] = useState();

  useEffect(() => {
    getPosts({
      number,
      size,
      typeImage,
      published,
    }).then(setPosts);
  }, [number, size, typeImage, published]);

  console.log(posts);

  return (
    <div className="h-[1000px]">
      <div>
        {/* <img src="" alt="" /> */}
        <div className="p-20 bg-blue-300 h-[500px]"></div>
      </div>
    </div>
  );
};

export default Ideas;
