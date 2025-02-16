import Image from "next/image";
import { Clock } from "lucide-react";
import { BLOG_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { BLOG_ID_QUERYResult } from "../../../../../sanity.types";
import NotFound from "@/app/not-found";
import { UserRound } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post | Cooksy",
  description:
    "Learn about Cooksy's mission to make cooking accessible and enjoyable for everyone.",
};

const components = {
  block: {
    // Ex. 1: customizing common block types
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold">{children}</h3>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-xl">{children}</ul>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ listStyleType: "disclosure-closed" }}>{children}</li>
    ),
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog: BLOG_ID_QUERYResult = await client.fetch(BLOG_ID_QUERY, { id });

  if (!blog) {
    return <NotFound />;
  }

  return (
    <article className="min-h-screen bg-main-background">
      {/* Hero Section */}
      <div className="relative w-full h-80">
        <div className=" w-full"></div>
        <div className="absolute inset-0">
          <div className="container mx-auto h-full max-w-4xl px-4 py-9">
            <div className="flex h-full flex-col justify-end text-main-btn">
              <div className="space-y-4 flex items-center justify-center flex-col">
                <h1 className="text-4xl font-bold justify-center align-middle">
                  {blog.title}
                </h1>
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <UserRound className="h-16 w-16 text-second-paragraph-text stroke-[1.5px]" />
                </div>
                <p className="font-bold text-main-paragraph-text">
                  {blog.author}
                </p>
                <div className="flex items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-10 mb-20">
        <div className="prose prose-gray mx-auto max-w-none">
          <p className="text-main-paragraph-text text-[40px] font-bold py-6">
            Introduction
          </p>
          <p className="text-second-paragraph-text">{blog.introduction}</p>

          <div className="relative aspect-video rounded-lg overflow-hidden my-10">
            <Image
              src={
                blog.mainImage
                  ? urlFor(blog.mainImage).url()
                  : "/placeholder.svg"
              }
              alt="Blog content image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {blog.mainContent &&
            blog.mainContent.map((component, index) => (
              <div className="pt-4" key={index}>
                <PortableText value={component} components={components} />
              </div>
            ))}

          <p className="text-[40px] font-bold pt-8 pb-4">Conclusion</p>
          <p className="text-second-paragraph-text">{blog.conclusion}</p>
        </div>
      </div>
    </article>
  );
}
