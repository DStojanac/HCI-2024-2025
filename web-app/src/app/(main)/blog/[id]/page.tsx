import { BlogRecipePost } from "../page";
import Image from "next/image";

async function getBlogPost(id: string): Promise<BlogRecipePost> {
  const response = await fetch(`${process.env.BASE_API_URL}/recipes/${id}`);
  const data = response.json();
  return data;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blogPost = await getBlogPost(id);
  // console.log(blogPost);
  return (
    <>
      <div className="flex pt-10 items-center justify-center w-full max-w-4xl mb-8">
        <div className="border p-4 rounded-lg shadow-lg max-w-xl w-full">
          <Image
            width={300}
            height={200}
            src={blogPost.image}
            alt={blogPost.name}
            className="w-full   rounded-t-lg"
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-center mt-4">
            {blogPost.name}
          </h1>
          <p className="text-sm text-gray-600 mt-4">
            {blogPost.ingredients.join(", ")}
          </p>
          <h2 className="text-2xl font-bold mt-4">Instructions</h2>
          <ol className="list-decimal list-inside mt-2">
            {blogPost.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
