import UpdatePostForm from "@/components/update-post-form";
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
      tags: true, // Optional: Include tags if you're using relations
      categories: true,
    },
  });

  if (!post) {
    return <div></div>;
  }
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const tagsOptions = tags.map((tag) => {
    return {
      label: tag.name,
      value: tag.id,
    };
  });

  const categoriesOptions = categories.map((category) => {
    return { label: category.name, value: category.id };
  });
  return (
    <div>
      <UpdatePostForm
        categories={categoriesOptions}
        tags={tagsOptions}
        post={post}
      />
    </div>
  );
}
