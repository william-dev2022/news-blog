import DOMPurify from "isomorphic-dompurify";

interface Props {
  content: string; // HTML content from Tiptap
}

export const tiptapStyles = `
  .heading-node {
    @apply font-bold text-xl mb-4 text-white;
  }

  h1.heading-node {
    @apply text-3xl md:text-4xl mb-6;
  }

  h2.heading-node {
    @apply text-2xl md:text-3xl mb-5;
  }

  h3.heading-node {
    @apply text-xl md:text-2xl mb-4;
  }

  .text-node {
    @apply text-base leading-7 text-white mb-4;
  }

  ul.list-node {
    @apply list-disc list-inside mb-4;
  }

  ol.list-node {
    @apply list-decimal list-inside mb-4;
  }

  ul.list-node li, ol.list-node li {
    @apply mb-2;
  }

  a {
    @apply text-blue-400 underline hover:text-blue-500;
  }

  strong {
    @apply font-bold;
  }

  em {
    @apply italic;
  }

  blockquote {
    @apply border-l-4 border-purple-600 pl-4 italic text-white mb-4;
  }

  code {
    @apply bg-purple-900 text-purple-400 px-1 rounded;
  }

  pre {
    @apply bg-black text-white p-4 rounded-md overflow-x-auto mb-4;
  }
`;


export default function PostBody({ content }: Props) {
  const cleanContent = DOMPurify.sanitize(content); // Sanitize content

  return (
    <div
      id="post-body"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
    //   <div>{cleanContent}</div>
  );
}
