"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

const MinimalTiptapEditor = dynamic(
  () => import("./minimal-tiptap").then((mod) => mod.MinimalTiptapEditor),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MultiSelect } from "./multi-select";
import { createPostSchema } from "@/lib/zodSchemas";
import { createPost } from "@/actions/post.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

type MultiSelectOptions = {
  value: string;
  label: string;
};
interface Props {
  tags: MultiSelectOptions[];
  categories: MultiSelectOptions[];
}

export default function CreatePostForm({ tags, categories }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      extract: "",
      content: "lorem ipsum",
      category: [],
      tags: [],
      isPublished: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    // console.log(values);

    const response = await createPost(values);
    console.log(response);

    if (response.success) {
      form.reset();
      router.refresh();
      toast.success("Post created successfully");
    } else {
      toast.error(response.message + " " + (response.errors?.toString() ?? ""));
    }
  }

  return (
    <div className="w-full max-w-6xl  mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="w-full  gap-6 flex flex-col-reverse lg:flex-row flex-wrap">
            <div className="w-full lg:w-8/12 space-y-3 dark:bg-[#18181B] p-4 rounded-md">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Body</FormLabel>
                    <FormControl className="w-full">
                      <MinimalTiptapEditor
                        value={field.value}
                        immediatelyRender={false}
                        onChange={(value) => {
                          field.onChange(value);
                          form.setValue("content", value as string);
                        }}
                        className="w-full  "
                        editorContentClassName="p-5 border "
                        output="html"
                        placeholder="Enter your description..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-transparent focus-within:!border-none focus-visible:!border-none focus:!border-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 space-y-6 dark:bg-zinc-900 p-4 rounded-md">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="extract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extract</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Category</FormLabel>
                    <FormControl>
                      <MultiSelect
                        name="category"
                        options={categories}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("category", value);
                        }}
                        value={field.value}
                        placeholder="Select category"
                        variant="secondary"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiSelect
                        name="tags"
                        options={tags}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("tags", value);
                        }}
                        placeholder="Select tags"
                        variant="secondary"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Publish</FormLabel>
                      {/* <FormDescription>
                        Receive emails about new products, features, and more.
                      </FormDescription> */}
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
