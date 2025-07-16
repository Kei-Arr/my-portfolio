import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      description: 'The greeting text',
      initialValue: 'Hi! I\'m'
    }),
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      description: 'Your full name',
      initialValue: 'Khaylle Rosario',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'Your role/title',
      initialValue: 'Full Stack Developer',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      description: 'The main description text about what you do',
      initialValue: 'brings ideas to life and crafts end-to-end solutions that make a meaningful impact.',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'highlightedWords',
      title: 'Highlighted Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words/phrases to highlight in the description',
      initialValue: ['ideas to life', 'crafts end-to-end solutions', 'meaningful impact']
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Hero section background image'
    }),
    defineField({
      name: 'cvFile',
      title: 'CV/Resume File',
      type: 'file',
      description: 'Upload your CV/Resume file for download'
    }),
    defineField({
      name: 'downloadButtonText',
      title: 'Download Button Text',
      type: 'string',
      initialValue: 'Download CV'
    }),
    defineField({
      name: 'aboutButtonText',
      title: 'About Button Text',
      type: 'string',
      initialValue: 'Get to know me'
    }),
    defineField({
      name: 'scrollIndicatorText',
      title: 'Scroll Indicator Text',
      type: 'string',
      initialValue: 'Scroll down'
    })
  ]
});