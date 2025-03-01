import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { CreateCategoryModal } from "./partials/create-category-modal";
import DeleteCategoryButton from "./partials/delete-category-button";
import { UpdateCategoryModal } from "./partials/edit-category-modal";

export default async function page() {
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-4xl  px-4 py-8">
      <h2 className="text-2xl font-semibold">Categories</h2>

      <div className="flex justify-end mb-4">
        <CreateCategoryModal />
      </div>
      <div className="border rounded-lg overflow-hidden ">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description?.slice(0, 50)}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell className="text-right flex space-x-2">
                  <UpdateCategoryModal
                    name={category.name}
                    description={category.description ?? ""}
                    id={category.id}
                  />
                  <DeleteCategoryButton id={category.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
