import { useEffect, useState } from "react";
import { getPosts } from "../../api/postApi";

import type { Post } from "../../types/post";
import DropdownMenuWithIcon from "../../components/DropdownMenuWithIcon";
import IdeasList from "./IdeasList";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Ideas = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<any>(null);

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
        setMeta(res.meta);
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

  console.log(meta);

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

        {meta && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              onClick={() => setNumber(1)}
              disabled={number === 1}
              className={`px-2 py-1 border rounded disabled:opacity-50 ${
                number !== 1 ? "font-extrabold" : ""
              }`}
            >
              <ChevronsLeft strokeWidth={3} />
            </button>

            <button
              onClick={() => setNumber((prev) => Math.max(1, prev - 1))}
              disabled={number === 1}
              className={`px-2 py-1 border rounded disabled:opacity-50 ${
                number !== 1 ? "font-extrabold" : ""
              }`}
            >
              <ChevronLeft strokeWidth={3} />
            </button>

            {Array.from({ length: 5 }, (_, i) => {
              const startPage = Math.max(1, number - 2);
              const page = startPage + i;

              if (page > meta.last_page) return null;

              return (
                <button
                  key={page}
                  onClick={() => setNumber(page)}
                  className={`px-3 py-1 border rounded ${
                    number === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setNumber((prev) => Math.min(meta.last_page, prev + 1))
              }
              disabled={number === meta.last_page}
              className={`px-2 py-1 border rounded disabled:opacity-50 ${
                number !== meta.last_page ? "font-extrabold" : ""
              }`}
            >
              <ChevronRight strokeWidth={3} />
            </button>

            <button
              onClick={() => setNumber(meta.last_page)}
              disabled={number === meta.last_page}
              className={`px-2 py-1 border rounded disabled:opacity-50 ${
                number !== meta.last_page ? "font-extrabold" : ""
              }`}
            >
              <ChevronsRight strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;
