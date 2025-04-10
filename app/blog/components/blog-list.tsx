import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PostListProps {
  post: any;
  aspect?: "landscape" | "custom" | "square";
  minimal?: boolean;
  preloadImage?: boolean;
  fontSize?: "large" | "normal";
  fontWeight?: "normal" | "bold";
}

export default function PostList({
  post,
  aspect = "square",
  minimal = false,
  preloadImage = false,
  fontSize = "normal",
  fontWeight = "bold",
}: PostListProps) {
  return (
    <div className={cn("group cursor-pointer", minimal && "grid gap-10 md:grid-cols-2")}>
      <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
        <Link
          className={cn(
            "relative block",
            aspect === "landscape" ? "aspect-video" : aspect === "custom" ? "aspect-[5/4]" : "aspect-square"
          )}
          href={`/blog/${post.slug}`}
        >
          <Image
            src={`http://localhost:8080${post.imageUrl}`}
            alt={post.title || "Thumbnail"}
            priority={preloadImage}
            className="object-cover w-auto h-auto transition-all"
            fill
            sizes="(max-width: 768px) 30vw, 33vw"
          />
        </Link>
      </div>
      <div className={cn(minimal && "flex items-center")}>
        <Link href={`/blog/${post.slug}`}>
          <h2
            className={cn(
              fontSize === "large" ? "text-2xl" : minimal ? "text-3xl" : "text-lg",
              fontWeight === "normal"
                ? "line-clamp-2 font-medium tracking-normal text-black"
                : "font-semibold leading-snug tracking-tight",
              "mt-2"
            )}
          >
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
              {post.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
