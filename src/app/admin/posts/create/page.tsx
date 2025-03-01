import CreatePostForm from "@/components/post-form";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function page() {
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
    <section className="w-full">
      <CreatePostForm categories={categoriesOptions} tags={tagsOptions} />
    </section>
  );
}
