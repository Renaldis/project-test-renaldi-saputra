import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

// const images = "";

const Ideas = () => {
  const [posts, setPosts] = useState();
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState(10);
  const [typeImage, setTypeImage] = useState();
  const [published, setPublished] = useState<"-published_at" | "published_at">(
    "-published_at"
  );
  const [sortLabel, setSortLabel] = useState<"Newest" | "Oldest">("Newest");

  useEffect(() => {
    getPosts({
      number,
      size,
      typeImage,
      published,
    }).then(setPosts);
  }, [number, size, typeImage, published]);

  console.log(posts);
  const handlePublish = (value: "Newest" | "Oldest") => {
    setSortLabel(value);
    const publish =
      value.toLowerCase() === "newest" ? "published_at" : "-published_at";

    setPublished(publish);
  };

  return (
    <div className="h-[1000px] ">
      <div>
        {/* <img src="" alt="" /> */}
        <div className="p-20 bg-blue-300 h-[340px]"></div>
      </div>
      <div className="w-[80%] mx-auto mt-10">
        <div className="flex justify-between">
          <span>showing 1 - 10 of 100</span>
          <div className="flex gap-10">
            <div className="flex gap-2 items-center">
              <span>Show per page:</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-10 items-center border rounded-xl p-1 px-2">
                  {size} <GoTriangleDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[10, 20, 50].map((value, index) => (
                    <DropdownMenuItem
                      key={index}
                      onSelect={() => setSize(value)}
                    >
                      {value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 items-center">
              <span>Sort by:</span>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex gap-10 items-center border rounded-xl p-1 px-2">
                    {sortLabel} <GoTriangleDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-0">
                    {["Newest", "Oldest"].map((value, index) => (
                      <DropdownMenuItem
                        key={index}
                        onSelect={() =>
                          handlePublish(value as "Newest" | "Oldest")
                        }
                      >
                        {value}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
