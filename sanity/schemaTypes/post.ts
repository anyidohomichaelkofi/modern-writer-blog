import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      {
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Opportunities', value: 'Opportunities' },
      { title: 'Career & Skills', value: 'Career & Skills' },
      { title: 'Money & Online Income', value: 'Money & Online Income' },
      { title: 'Life & Personal Growth', value: 'Life & Personal Growth' },
      { title: 'Education & Learning', value: 'Education & Learning' },
    ],
  },
}
    })
  ],
  
})