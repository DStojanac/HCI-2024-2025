import { defineType, defineField } from "sanity";

export const recipes = defineType({
  name: "recipes",
  title: "Recipes",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Recipe Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Recipe Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "cookingTime",
      title: "Cooking Time",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "servings",
      title: "Servings",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Medium", value: "medium" },
          { title: "Hard", value: "hard" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "amount",
              title: "Amount",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "item",
              title: "Item",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "nutrition",
      title: "Nutrition Information",
      type: "object",
      fields: [
        {
          name: "calories",
          title: "Calories",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "protein",
          title: "Protein (g)",
          type: "number",
        },
        {
          name: "carbs",
          title: "Carbs (g)",
          type: "number",
        },
        {
          name: "fat",
          title: "Fat (g)",
          type: "number",
        },
        {
          name: "fiber",
          title: "Fiber (g)",
          type: "number",
        },
      ],
    }),
    // defineField({
    //   name: "author",
    //   title: "Author",
    //   type: "reference",
    //   to: [{ type: "author" }],
    //   validation: (Rule) => Rule.required(),
    // }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
