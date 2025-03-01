"use client";
import { deleteCategory } from "@/actions/category.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface props {
  id: string;
}
export default function DeleteCategoryButton({ id }: props) {
  const submit = async () => {
    console.log("delete", id);
    const res = await deleteCategory(id);

    if (res.success) {
      console.log("Category deleted successfully");
      toast.success("Category deleted successfully");
    } else {
      console.log(res.message);
      toast.error(res.message);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="text-white bg-red-700 rounded px-2 py-2">
          <Trash size={14} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
