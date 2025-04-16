// src/tools/discoverBusinessEmail.ts
import { z } from 'zod';
import { scrapeEmailFromWebsite } from '../utils/scraper.js';

export const inputSchema = z.object({
  websiteUrl: z.string().url()
});

export const discoverBusinessEmail = {
  name: 'discoverBusinessEmail',
  description: 'Attempts to discover a business email address from a given website URL.',
  inputSchema,
  handler: async (input: z.infer<typeof inputSchema>) => {
    const { websiteUrl } = input;
    const email = await scrapeEmailFromWebsite(websiteUrl);
    return {
      email,
      source: email ? 'website' : 'not found',
      validated: !!email
    };
  }
};
