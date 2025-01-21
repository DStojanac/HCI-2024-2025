import { defineQuery } from "next-sanity";

export const RECIPE_QUERY = defineQuery(
`*[_type== "recipe" && status=="published" && defined(slug.current)]{
  _id,
  title,
  "mainImage": mainImage.asset->url,
  description,
  cookingTime,
  servings,
  difficulty,
  ingredients,
  instructions,
  nutrition,
  cuisine,
  mealType,
  author->{
  supabaseUserId,
  name,
  email
  }
}`
);

export const RECIPE_ID_QUERY = defineQuery(
  `*[_type == "recipe" && _id == $id][0]{
    title,
    mainImage,
    description,
    ingredients,
    instructions,
    nutrition,
    cookingTime,
    servings,
    difficulty,
    mealType,
    author->{ name }
  }`
)
