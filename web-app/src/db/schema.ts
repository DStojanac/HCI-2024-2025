import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const recipe = pgTable("recipe", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  instructions: text("instructions").notNull(),
  ingredients: text("ingredients").notNull(),
  difficulty: text("difficulty").notNull(),
});
