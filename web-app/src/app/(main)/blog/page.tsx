import { client } from "@/sanity/lib/client"
import { BLOG_QUERY } from "@/sanity/lib/queries"
import type { BLOG_QUERYResult } from "../../../../sanity.types"
import { BlogClient } from "@/components/blogsClient"

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
        <BlogClient posts={posts} />
      </div>
    </div>
  )
}
