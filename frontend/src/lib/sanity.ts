import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const isDevelopment = import.meta.env.DEV

export const client = createClient({
  projectId: 'scy8mmow', 
  dataset: 'production',
  useCdn: !isDevelopment,
  apiVersion: '2025-07-06'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)