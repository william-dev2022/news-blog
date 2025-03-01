import PostBody from "@/components/post-body";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      author: true, // Optional: Include related data like author
      tags: true, // Optional: Include tags if you're using relations
    },
  });

  if (!post) {
    return <div></div>;
  }
  return (
    <div className="max-w-4xl w-full mx-auto py-5">
     
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          By {post.author?.name ?? "Unknown Author"}
        </p>
        <p className="text-gray-500 text-sm">
          Published on {new Date(post.createdAt).toDateString()}
        </p>
      </div>
      <PostBody content={post.content} />
    </div>
  );
}
