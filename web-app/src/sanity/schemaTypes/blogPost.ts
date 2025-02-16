import { defineField, defineType } from "sanity";


export const blogPost = defineType({
    name: "blogPost",
    title: "Blog Post",
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
            name: "backgroundImage",
            title: "Background image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Short Description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "introduction",
            title: "Introduction",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainContent",
            title: "Main Content",
            type: "array",
            of: [{ type: "block" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "conclusion",
            title: "Conclusion",
            type: "text",
            validation: (Rule) => Rule.required().min(10),
        }),
        defineField({
            name: "readingTime",
            title: "Reading Time (min)",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),
    ]
}
)