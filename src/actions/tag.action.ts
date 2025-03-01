"use server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createTag = async (name: string) => {
  try {
    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name },
    });

    if (existingTag) {
      return { success: false, message: "Tag already exists" };
    }

    const slug = slugify(name, { lower: true });

    // Create the tags if it doesn't exist
    const tags = await prisma.tag.create({
      data: {
        name,
        slug,
      },
    });

    revalidatePath("/tags"); // Refresh cache after creation
    return { success: true, tags };
  } catch (error) {
    console.error("Error creating tag:", error);
    return { success: false, message: "Failed to create tag" };
  }
};

export async function updateTag(id: string, name: string) {
  try {
    // Check if tag already exists
    const existingTag = await prisma.tag.findFirst({
      where: {
        name: name,
        id: { not: id }, // Ensure it's not the same tag
      },
    });

    if (existingTag) {
      return { success: false, message: "Tag already exists" };
    }

    const slug = slugify(name, { lower: true });

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name, slug },
    });

    revalidatePath("/tags"); // Refresh tags list
    return { success: true, tag: updatedTag };
  } catch (error) {
    console.error("Error updating tag:", error);
    return { success: false, message: "Failed to update tag" };
  }
}

export const deleteTag = async (id: string) => {
  try {
    await prisma.tag.delete({ where: { id } });

    revalidatePath("/tags"); // Refresh tag list
    return { success: true };
  } catch (error) {
    console.error("Error creating tag:", error);
    return { success: false, message: "Failed to delete tag" };
  }
};
