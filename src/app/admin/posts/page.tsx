import { DataTable } from "@/components/datatable";
import React from "react";
import { columns } from "./column";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={posts} />
      </div>
    </div>
  );
}
