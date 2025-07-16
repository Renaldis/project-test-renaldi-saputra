import type { Post } from "../../types/post";

import IdeasItem from "./IdeasItem";

const IdeasList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts?.map((item, idx) => (
          <IdeasItem key={idx} post={item} />
        ))}
      </div>
    </div>
  );
};

export default IdeasList;
