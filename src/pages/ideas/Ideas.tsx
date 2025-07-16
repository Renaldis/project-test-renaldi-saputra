import { useEffect, useState } from "react";
import { getPosts } from "../../api/postApi";

import type { Post } from "../../types/post";
import DropdownMenuWithIcon from "../../components/DropdownMenuWithIcon";
import IdeasList from "./IdeasList";

import Loader from "../../components/Loader";
import type { Meta } from "../../types/meta";
import ParallaxBannerImage from "./ParallaxBannerImage";
import Pagination from "./Pagination";

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
        <ParallaxBannerImage />
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
          <Pagination number={number} setNumber={setNumber} meta={meta} />
        )}
      </div>
    </div>
  );
};

export default Ideas;
