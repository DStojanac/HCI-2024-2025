import { defineType, defineField } from "sanity";

export const recipe = defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      validation: (Rule) => Rule.required().positive().min(1),
    }),
    defineField({
      name: "servings",
      title: "Servings",
      type: "number",
      validation: (Rule) => Rule.required().positive().min(1),
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
            },
            {
              name: "item",
              title: "Item",
              type: "string",
              validation: (Rule) => Rule.required().min(1),
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
          validation: (Rule) => Rule.required().positive().min(1),
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
    defineField({
      name: "cuisineType",
      title: "Cuisine Type",
      type: "string",
      options: {
        list: [
          { title: "Croatian", value: "croatian" },
          { title: "Italian", value: "italian" },
          { title: "Chinese", value: "chinese" },
          { title: "Mexican", value: "mexican" },
          { title: "Indian", value: "indian" },
          { title: "American", value: "american" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mealType",
      title: "Meal Type",
      type: "string",
      options: {
        list: [
          { title: "Dinner", value: "dinner" },
          { title: "Lunch", value: "lunch" },
          { title: "Snack", value: "snack" },
          { title: "Appetizer", value: "appetizer" },
          { title: "Breakfast", value: "breakfast" },
          { title: "Beverage", value: "beverage" },
          { title: "Dessert", value: "dessert" },
          { title: "Vegeterian", value: "vegeterian" },
          { title: "Salad", value: "salad" },
          { title: "Soup", value: "soup" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),

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
      title: "title",
      image: "mainImage",
      status: "status",
    },
    prepare(selection) {
      const { title, image, status } = selection;
      return {
        title,
        subtitle: status,
        media: image,
      };
    },
  },
});
