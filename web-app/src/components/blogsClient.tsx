"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, UserRound } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { BLOG_QUERYResult } from "../../sanity.types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogListProps {
  posts: BLOG_QUERYResult;
}

export function BlogClient({ posts }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <Link
            key={post._id}
            href={"/blog/" + post._id}
            className="group relative overflow-hidden rounded-lg border border-second-background bg-main-background transition-shadow shadow-sm hover:shadow-md"
          >
            <div className="aspect-[4/3] w-full">
              <Image
                src={
                  post.mainImage
                    ? urlFor(post.mainImage).url()
                    : "/placeholder.svg"
                }
                alt={post.title || "No title available"}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="mb-2 text-xl text-main-paragraph-text font-semibold group-hover:underline">
                {post.title}
              </h2>
              <p className="mb-4 line-clamp-2 text-second-paragraph-text">
                {post.description}
              </p>
              <div className="items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <UserRound className="h-8 w-8 text-second-paragraph-text stroke-[1.5px]" />
                  </div>
                  <span className="text-sm text-main-paragraph-text font-semibold">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-second-paragraph-text">
                  <div className="ml-10 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                className={`transition-all duration-200 border border-transparent hover:border-primary ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-second-background"
                }`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                  className={`transition-all duration-200 border ${
                    currentPage === page
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-transparent hover:border-primary hover:bg-second-background"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={`transition-all duration-200 border border-transparent hover:border-primary ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-second-background"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
