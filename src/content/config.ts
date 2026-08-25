import { defineCollection, z } from "astro:content";

// Gallery pieces — one markdown file per work item, editable in the CMS.
const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string(),
    image: z.string(), // public path, e.g. /images/work/01.png
    order: z.number().default(0),
  }),
});

export const collections = { work };
