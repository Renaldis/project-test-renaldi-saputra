import { useEffect, useState } from "react";
import { getPosts } from "../../api/postApi";

import type { Post } from "../../types/post";
import DropdownMenuWithIcon from "../../components/DropdownMenuWithIcon";
import IdeasList from "./IdeasList";

const Ideas = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState(10);
  const [typeImage, setTypeImage] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [published, setPublished] = useState<"-published_at" | "published_at">(
    "-published_at"
  );
  const [sortLabel, setSortLabel] = useState<"Newest" | "Oldest">("Newest");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await getPosts({
          number,
          size,
          typeImage,
          published,
        });

        setPosts(res?.data);
      } catch (error) {
        console.error("Gagal fetch data:", error);
        setError("Tidak dapat menampilkan data");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [number, size, typeImage, published]);

  const handlePublish = (value: "Newest" | "Oldest") => {
    setSortLabel(value);
    const publish =
      value.toLowerCase() === "newest" ? "-published_at" : "published_at";

    setPublished(publish);
  };

  return (
    <div className="mb-20">
      <div>
        {/* <img src="" alt="" /> */}
        <div className="p-20 bg-blue-300 h-[340px]"></div>
      </div>
      <div className="w-[80%] mx-auto mt-10">
        <div className="flex justify-between">
          <span>showing 1 - 10 of 100</span>
          <div className="flex gap-10">
            <DropdownMenuWithIcon
              label="Show per page:"
              options={[10, 20, 50]}
              selected={size}
              onSelect={(val) => setSize(Number(val))}
            />

            <DropdownMenuWithIcon
              label="Sort by:"
              options={["Newest", "Oldest"]}
              selected={sortLabel}
              onSelect={(val) => {
                setSortLabel(val);
                handlePublish(val);
              }}
            />
          </div>
        </div>
        <IdeasList posts={posts} />
      </div>
    </div>
  );
};

export default Ideas;
