import { type SchemaTypeDefinition } from "sanity";
import { recipe } from "./recipe";
import { author } from "./author";
import { blogPost } from "./blogPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe, author, blogPost],
};
