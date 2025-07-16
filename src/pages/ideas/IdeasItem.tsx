import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { Post } from "../../types/post";

const IdeasItem = ({ post }: { post: Post }) => {
  const formattedDate = new Date(post.updated_at.replace(" ", "T"))
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <Card className="rounded-sm p-0 overflow-hidden shadow-md gap-0">
      <CardHeader className="w-full p-0 m-0">
        <img src="https://dummyimage.com/600x400/f50031/ffffff" alt="" />
      </CardHeader>
      <CardContent className="p-4">
        <span className="text-slate-300 font-semibold">{formattedDate}</span>
        <CardTitle>{post.title}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default IdeasItem;
