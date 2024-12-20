import Link from "next/link";

export type BlogRecipePost = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

async function getBlogPosts(): Promise<BlogRecipePost[]> {
  const response = await fetch(`${process.env.BASE_API_URL}/recipes`);
  const data = await response.json();
  return data.recipes;
}

export default async function BlogPostsPage() {
  const blogPosts: BlogRecipePost[] = await getBlogPosts();
  // console.log(blogPosts);

  return (
    <>
      <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5">
        <h1>Blog Page</h1>
      </div>
      <h1 className="flex justify-center text-4xl p-5">BLOG POSTS </h1>

      <div className="flex justify-center ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {blogPosts.map((post) => (
            <div key={post.id} className="border p-4 max-w-sm w-full">
              <img
                src={post.image}
                alt={post.name}
                className="w-full h-32 object-cover"
              />
              <h2 className="text-xl font-bold">{post.name}</h2>
              <p>{post.ingredients.join(", ")}</p>
              <Link
                href={`/blog/${post.id}`}
                className="mt-4 inline-block px-4 py-2 bg-main-btn text-white-text rounded hover:bg-second-btn transition duration-300"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
