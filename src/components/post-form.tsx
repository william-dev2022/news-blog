"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Tiptap from "./tiptap";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

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
});

export default function CreatePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      extract: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="max-w-3xl w-full mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-1 grid-cols-1 gap-4">
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
                    {/* <Input
                      className="focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-700"
                      placeholder="a short passage taken from the post"
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label htmlFor="category">Post category</Label>
            <MultiSelect
              name="category"
              options={frameworksList}
              onValueChange={(value) => form.setValue("category", value)}
              defaultValue={form.getValues("category")}
              placeholder="Select frameworks"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
          <div>
            <Label htmlFor="category">Post category</Label>
            <Tiptap />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
