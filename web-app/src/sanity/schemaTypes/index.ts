import { type SchemaTypeDefinition } from "sanity";
import { recipe } from "./recipe";
import { author } from "./author";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe, author],
};
