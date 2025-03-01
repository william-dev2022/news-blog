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
import { UpdatePost } from "@/actions/post.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { Post, PostCategory, PostTag } from "@prisma/client";

type MultiSelectOptions = {
  value: string;
  label: string;
};
type IPost = Post & {
  tags: PostTag[];
  categories: PostCategory[];
};
interface Props {
  tags: MultiSelectOptions[];
  categories: MultiSelectOptions[];
  post: IPost;
}

export default function UpdatePostForm({ tags, categories, post }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: post.title,
      extract: post.extract,
      content: post.content,
      category: post.categories.map((category) => category.categoryId),
      tags: post.tags.map((tag) => tag.tagId),
      isPublished: post.published,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    // console.log(values);

    const response = await UpdatePost(post.id, values);

    if (response.success) {
      form.reset();
      toast.success("Post updated successfully");
      router.push(`/admin/posts/${post.id}`);
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
                        defaultValue={field.value}
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
                        value={field.value}
                        options={tags}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("tags", value);
                        }}
                        placeholder="Select tags"
                        defaultValue={field.value}
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
