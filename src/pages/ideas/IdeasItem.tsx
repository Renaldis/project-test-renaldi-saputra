import { Loader2, LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { Post } from "../../types/post";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};

const IdeasItem = ({ post }: { post: Post }) => {
  const formattedDate = new Date(post.updated_at.replace(" ", "T"))
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
  console.log("Gambar:", post.medium_image?.[0]?.url);
  return (
    <Card className="rounded-sm p-0 overflow-hidden shadow-md gap-0">
      <CardHeader className="w-full p-0 m-0">
        <LazyLoadImage
          src={
            post.medium_image?.[0]?.url ??
            "https://dummyimage.com/600x400/530fff/fff"
          }
          alt={post.title}
          className="aspect-[3/2] w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <span className="text-slate-400 text-sm font-medium">
          {formattedDate}
        </span>
        <CardTitle className="text-base font-semibold line-clamp-3">
          {post.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
};

export default IdeasItem;
