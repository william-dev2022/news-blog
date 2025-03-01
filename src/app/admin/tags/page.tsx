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
import DeleteCategoryButton from "./partials/delete-tag-button";
import { CreateTagModal } from "./partials/create-tag-modal";
import { UpdateTagModal } from "./partials/edit-tag-modal";

export default async function page() {
  const tags = await prisma.tag.findMany();

  return (
    <div className="max-w-4xl  px-4 py-8">
      <h2 className="text-2xl font-semibold">Tags</h2>

      <div className="flex justify-end mb-4">
        <CreateTagModal />
      </div>
      <div className="border rounded-lg overflow-hidden ">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell>{tag.slug}</TableCell>
                <TableCell className="text-right flex justify-end space-x-2">
                  <UpdateTagModal name={tag.name} id={tag.id} />
                  <DeleteCategoryButton id={tag.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
