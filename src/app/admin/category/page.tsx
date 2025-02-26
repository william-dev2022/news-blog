import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateCategoryModal } from "@/components/category/create-category-modal";

export default function page() {
  return (
    <div className="max-w-4xl  px-4 py-8">
      <h2 className="text-2xl font-semibold">Invoices</h2>

      <div className="flex justify-end mb-4">
        <CreateCategoryModal />
      </div>
      <div className="border rounded-lg overflow-hidden ">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
