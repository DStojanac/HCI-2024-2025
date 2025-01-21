import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "supabaseUserId",
      title: "Supabase User ID",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});