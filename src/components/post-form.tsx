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
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { Label } from "./ui/label";
import { JSONContent } from "@tiptap/core";
// import { MinimalTiptapEditor } from "./minimal-tiptap";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    attrs: z.record(z.any()).optional(),
    content: z.array(z.lazy(() => JSONContentSchema)).optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.any()).optional(),
        })
      )
      .optional(),
    text: z.string().optional(),
  })
);

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Post title must be at least 2 characters.",
  }),
  extract: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string().array().min(1, {
    message: "category can't be empty.",
  }),
  tags: z.string().array().nullable(),
  content: z.union([
    z.string(), // HTMLContent (string)
    JSONContentSchema, // Single JSON object
    z.array(JSONContentSchema), // Array of JSON objects
    z.null(), // Allow null values
  ]),
});

export default function CreatePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      extract: "",
      category: ["react"],
      tags: ["react"]
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full max-w-6xl  mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="w-full  gap-6 flex flex-col-reverse md:flex-row flex-wrap">
            <div className="w-full md:w-8/12 space-y-3">
              <Label htmlFor="content">Contents</Label>
              <MinimalTiptapEditor
                value={form.getValues("content")}
                onChange={(value) => {
                  form.setValue("content", value);
                }}
                className="w-full "
                editorContentClassName="p-5 border "
                output="html"
                placeholder="Enter your description..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-transparent  focus-within:!border-none focus-visible:!border-none focus:!border-transparent"
              />
            </div>

            <div className="flex-1 space-y-6">
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

              <div className="space-y-3">
                <Label htmlFor="category">Post category</Label>

                <MultiSelect
                  name="category"
                  options={frameworksList}
                  onValueChange={(value) => form.setValue("category", value)}
                  defaultValue={form.getValues("category")}
                  placeholder="Select category"
                  variant="secondary"
                  animation={2}
                  maxCount={3}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="tags">Tags</Label>

                <MultiSelect
                  name="tags"
                  options={frameworksList}
                  onValueChange={(value) => form.setValue("tags", value)}
                  placeholder="Select tags"
                  variant="secondary"
                  animation={2}
                  maxCount={3}
                />
              </div>
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
