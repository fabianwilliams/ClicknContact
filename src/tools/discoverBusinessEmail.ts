import { z } from 'zod';
import { scrapeEmailFromWebsite } from '../utils/scraper.js';

export const inputSchema = z.object({
  websiteUrls: z.array(z.string().url())
});

export const discoverBusinessEmail = {
  name: 'discoverBusinessEmail',
  description: 'Find email addresses and form fields from a list of websites',
  inputSchema,
  outputSchema: z.object({
    content: z.array(
      z.object({
        type: z.literal("text"),
        text: z.string()
      })
    )
  }),
  handler: async ({ websiteUrls }: z.infer<typeof inputSchema>) => {
    const results = await Promise.all(
      websiteUrls.map(async (url) => {
        const result = await scrapeEmailFromWebsite(url);
        return {
          type: "text" as const,
          text: JSON.stringify({ url, ...result })
        };
      })
    );

    return {
      content: results
    };
  }
};
