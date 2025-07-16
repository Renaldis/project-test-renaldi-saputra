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
import Loader from "../../components/Loader";
import type { Meta } from "../../types/meta";
import { Parallax } from "react-parallax";

const Ideas = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<Meta>();

  const getInitialFilters = () => {
    const saved = localStorage.getItem("ideasFilters");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  };
  const initial = getInitialFilters();

  const [number, setNumber] = useState(initial.number || 1);
  const [size, setSize] = useState(initial.size || 10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [published, setPublished] = useState<"-published_at" | "published_at">(
    initial.published || "-published_at"
  );
  const [sortLabel, setSortLabel] = useState<"Newest" | "Oldest">(
    initial.sortLabel || "Newest"
  );

  useEffect(() => {
    localStorage.setItem(
      "ideasFilters",
      JSON.stringify({ number, size, published, sortLabel })
    );
  }, [number, size, published, sortLabel]);

  if (error) {
    alert(error || "Terjadi Kesalahan");
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await getPosts({
          number,
          size,
          published,
        });

        setPosts(res?.data);
        setMeta(res?.meta);
      } catch (error) {
        console.error("Gagal fetch data:", error);
        setError("Tidak dapat menampilkan data");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [number, size, published]);

  const handlePublish = (value: "Newest" | "Oldest") => {
    setSortLabel(value);
    const publish =
      value.toLowerCase() === "newest" ? "-published_at" : "published_at";

    setPublished(publish);
  };

  console.log(meta);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div>
        <div className="relative h-[400px] overflow-hidden">
          <div className="relative w-full h-full">
            <Parallax
              bgImage="/src/assets/doodle.jpg"
              strength={300}
              bgImageAlt="Background Image"
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-white text-center z-10">
                  <h1 className="text-4xl font-bold">Ideas</h1>
                  <p className="text-lg mt-2">
                    Where all our great things begin
                  </p>
                </div>

                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </Parallax>
          </div>

          <svg
            className="absolute top-40 bottom-0 left-0 w-full z-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,256L1440,128L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-10">
        <div className="flex justify-between">
          {meta && (
            <span>
              showing {(meta.current_page - 1) * +meta.per_page + 1} -{" "}
              {Math.min(meta.current_page * meta.per_page, meta.total)} of{" "}
              {meta.total}
            </span>
          )}
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
              className={`px-2 py-1 border rounded disabled:opacity-50`}
            >
              <ChevronsLeft strokeWidth={3} />
            </button>

            <button
              onClick={() => setNumber((prev: number) => Math.max(1, prev - 1))}
              disabled={number === 1}
              className={`px-2 py-1 border rounded disabled:opacity-50`}
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
                    number === page ? "bg-[#ff6600] text-white" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setNumber((prev: number) => Math.min(meta.last_page, prev + 1))
              }
              disabled={number === meta.last_page}
              className={`px-2 py-1 border rounded disabled:opacity-50`}
            >
              <ChevronRight strokeWidth={3} />
            </button>

            <button
              onClick={() => setNumber(meta.last_page)}
              disabled={number === meta.last_page}
              className={`px-2 py-1 border rounded disabled:opacity-50`}
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
