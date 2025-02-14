import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { BLOG_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { BLOG_QUERYResult } from "../../../../sanity.types"

async function getBlogPosts() {
  const blogs = client.fetch(BLOG_QUERY)
  return blogs
}

export default async function BlogPage() {
  const posts: BLOG_QUERYResult = await getBlogPosts()
  return (
    <div className="min-h-screen bg-main-background">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Kitchen tips & Blog</h1>
          <p className="text-lg text-muted-foreground">Find all the tips & tricks of our best chefs.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={"/blog/" + post._id}
              className="group relative overflow-hidden rounded-lg border border-second-background bg-main-background transition-shadow shadow-sm hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full">
                <Image
                  src={post.mainImage ? urlFor(post.mainImage).url() : "/placeholder.svg"}
                  alt={post.title || "No title available"}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-xl text-main-paragraph-text font-semibold group-hover:underline">{post.title}</h2>
                <p className="mb-4 line-clamp-2 text-second-paragraph-text">{post.description}</p>
                <div className="items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src="/images/generic_avatar.png"
                        alt={post.author || "Unknown author"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-main-paragraph-text font-semibold">{post.author}</span>
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
      </div>
    </div>
  )
}

