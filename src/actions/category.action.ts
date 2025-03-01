"use server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string, description?: string) => {
  try {
    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return { success: false, message: "Category already exists" };
    }

    const slug = slugify(name, { lower: true });

    // Create the category if it doesn't exist
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });

    revalidatePath("/categories"); // Refresh cache after creation
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Failed to create category" };
  }
};

export async function updateCategory(
  id: string,
  name: string,
  description?: string
) {
  try {
    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name,
        id: { not: id }, // Ensure it's not the same category
      },
    });

    if (existingCategory) {
      return { success: false, message: "Category already exists" };
    }

    const slug = slugify(name, { lower: true });

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug, description },
    });

    revalidatePath("/categories"); // Refresh categories list
    return { success: true, category: updatedCategory };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
}

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({ where: { id } });

    revalidatePath("/categories"); // Refresh categories list
    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Failed to delete category" };
  }
};
