import { type SchemaTypeDefinition } from "sanity";
import { recipes } from "./recipes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipes],
};
