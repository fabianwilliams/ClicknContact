import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function scrapeEmailFromWebsite(
  url: string
): Promise<{ best: string | null; all: string[]; formDetected: boolean; formFields: string[] }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    const html = await res.text();
    const $ = cheerio.load(html);

    // 1. Extract all emails from mailto: links
    const mailtoEmails = $('a[href^="mailto:"]')
      .map((_, el) => $(el).attr('href')?.replace('mailto:', '').trim())
      .get();

    // 2. Extract all emails from page text
    const textEmails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];

    // 3. Combine, dedupe, and clean
    const allEmails = Array.from(new Set([...mailtoEmails, ...textEmails]))
      .map(e => e.toLowerCase())
      .filter(e =>
        e &&
        /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(e) && // basic email format
        !e.includes('example') &&
        !e.includes('abc@xyz.com') &&
        !e.includes('test@') &&
        !e.startsWith('noreply') &&
        !e.endsWith('.png') &&
        !e.endsWith('.jpg') &&
        !e.endsWith('.jpeg') &&
        !e.endsWith('.svg') &&
        !e.endsWith('.gif') &&
        !e.endsWith('.webp') &&
        !e.endsWith('.invalid')
      );

    const best = allEmails[0] ?? null;

    //return { best, all: allEmails };
    // Scan for forms and field names
    const form = $('form').first();
    const formFields: string[] = [];

    if (form.length) {
      form.find('input, textarea, select').each((_, el) => {
        const nameAttr = $(el).attr('name');
        if (nameAttr) formFields.push(nameAttr.toLowerCase());
      });
    }

    return {
      best,
      all: allEmails,
      formDetected: form.length > 0,
      formFields
    };

  } catch (err) {
    console.warn(`❌ Error scraping ${url}:`, err);
    return {
      best: null,
      all: [],
      formDetected: false,
      formFields: []
    };
    
  }
}
