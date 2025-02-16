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
  cuisineType,
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
);

export const USER_RECIPES_QUERY = defineQuery(
  `*[_type == "recipe" && author->supabaseUserId == $userId]{
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
    cuisineType,
    mealType,
    author->{
      supabaseUserId,
      name,
      email
    }
  }`
);

export const BLOG_QUERY=defineQuery(
  `*[_type=="blogPost"]{
  _id,
  title,
  mainImage,
  description,
  readingTime,
  "author":author->name
}`
)

export const BLOG_ID_QUERY=defineQuery(
  `*[_type=="blogPost"&&_id==$id][0]{
  title,
  mainImage,
  backgroundImage,
  readingTime,
  introduction,
  mainImage,
  mainContent,
  conclusion,
  "author":author->name
}`
)