"use client";

import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import {
  ArrowUpDown,
  Edit,
  Eye,
  MoreHorizontal,
  NotepadTextDashed,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { deletePost, togglePublishStatus } from "@/actions/post.action";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-3">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "extract",
    header: "Body",
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <Button
          className="text-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.published;
      const statusText = status ? "Published" : "Draft";
      return (
        <div
          className={`px-1.5 mx-auto py-1 w-fit rounded-sm  text-center text-xs ${
            status ? "bg-green-600" : "bg-yellow-800"
          }`}
        >
          {statusText}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="text-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formatedDate = moment(date, moment.ISO_8601).format(
        "MMM D, YYYY h:mm A"
      );
      return (
        <div className={`px-2 py-1 rounded text-center text-xs #`}>
          {formatedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          className="text-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      const formatedDate = moment(date, moment.ISO_8601).format(
        "MMM D, YYYY h:mm A"
      );
      return (
        <div className={`px-2 py-1 rounded text-center text-xs #`}>
          {formatedDate}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                className="flex space-x-1 items-center"
                href={`/admin/posts/${post.id}`}
              >
                <Eye size={14} /> <span>Preview</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className="flex space-x-1 items-center"
                href={`/admin/posts/${post.id}/edit`}
              >
                <Edit size={14} /> <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const updateStatus = await togglePublishStatus(
                  post.id,
                  !post.published
                );
                if (updateStatus.success) {
                  toast.success("Status updated successfully");
                } else {
                  toast.error(updateStatus.message);
                }
              }}
            >
              <NotepadTextDashed size={14} />
              <span> {post.published ? "Draft" : "Publish"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex sitems-center"
              onClick={async () => {
                const deletedPost = await deletePost(post.id);
                if (deletedPost.success) {
                  toast.success("Post deleted successfully");
                } else {
                  toast.error(deletedPost.message);
                }
              }}
            >
              <Trash size={14} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
