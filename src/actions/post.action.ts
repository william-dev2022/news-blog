"use server";

import { prisma } from "@/lib/prisma";
import { createPostSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { z } from "zod";

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
  const validatedData = createPostSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Invalid Data",
      errors: validatedData.error.format(),
    };
  }

  try {
    const { title, extract, category, tags, content, isPublished } =
      validatedData.data;

    const postTags = tags;

    const post = await prisma.post.create({
      data: {
        title,
        extract,
        content,
        published: isPublished,
        slug: slugify(title, { lower: true }),
        author: {
          connect: { id: "f26a2cfb-2c2c-4ac3-89d4-52519b07c10c" },
        },
        categories: {
          create: category.map((id) => ({
            category: {
              connect: { id }, // Connect categories by ID
            },
          })),
        },
        tags: {
          create: postTags?.map((id) => ({
            tag: {
              connect: { id }, // Connect categories by ID
            },
          })),
        },
      },
    });

    revalidatePath("posts");

    return { success: true, data: post };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const UpdatePost = async (
  id: string,
  data: z.infer<typeof createPostSchema>
) => {
  const validatedData = createPostSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Invalid Data",
      errors: validatedData.error.format(),
    };
  }

  try {
    const { title, extract, category, tags, content, isPublished } =
      validatedData.data;

    const postTags = tags;

    const postExists = await prisma.post.findFirst({
      where: {
        title: title,
        id: { not: id }, // Ensure it's not the same category
      },
    });

    if (postExists) {
      return {
        success: false,
        message: "Post with provided title already exists",
      };
    }

    const slug = slugify(title, { lower: true });

    console.log(slug);
    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        extract,
        content,
        published: isPublished,
        slug,
        categories: {
          connectOrCreate: category.map((categoryId) => ({
            where: {
              postId_categoryId: {
                postId: id, // Post ID
                categoryId, // Category ID
              },
            },
            create: {
              category: {
                connect: { id: categoryId },
              },
            },
          })),
        },
        tags: {
          connectOrCreate: postTags?.map((tagId) => ({
            where: {
              postId_tagId: {
                postId: id,
                tagId,
              },
            },
            create: {
              tag: {
                connect: { id: tagId },
              },
            },
          })),
        },
      },
    });

    console.log(updatedPost);
    if (!updatedPost) {
      return { success: false, message: "Post not found" };
    }

    revalidatePath(`/posts/${id}`);

    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const togglePublishStatus = async (postId: string, status: boolean) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: status,
      },
    });

    if (!updatedPost) {
      return { success: false, message: "Something went wrong" };
    }

    revalidatePath(`/posts`);

    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const deletePost = async (postId: string) => {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!deletePost) {
      return { success: false, message: "Something went wrong" };
    }

    revalidatePath(`/posts`);

    return { success: true, data: deletePost };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
