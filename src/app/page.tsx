"use client";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { TooltipProvider } from "@radix-ui/react-tooltip";


export default function Home() {
  return (
    <TooltipProvider>
      <div className="mt-10 px-10 font-[family-name:var(--font-geist-sans)]">
        <MinimalTiptapEditor
          // value={value}
          // onChange={(value) => form.setValue("category", value)}

          className="w-full " 
          editorContentClassName="p-5 border "
          output="html"
          placeholder="Enter your description..."
          autofocus={true}
          editable={true}
          editorClassName="focus:outline-transparent  focus-within:!border-none focus-visible:!border-none focus:!border-transparent"
        />
      </div>
    </TooltipProvider>
  );
}
