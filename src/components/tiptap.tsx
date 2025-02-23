"use client";
import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello, Tiptap!</p>",
  });

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  return (
    <div>
      <button onClick={toggleBold}>Toggle Bold</button>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
