import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export async function scrapeEmailFromWebsite(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    // 1. Look for all mailto links and return the first valid one
    const mailtoLinks = $('a[href^="mailto:"]')
      .map((_, el) => $(el).attr('href')?.replace('mailto:', '').trim())
      .get()
      .filter(email =>
        email &&
        !email.toLowerCase().startsWith('noreply') &&
        !email.toLowerCase().includes('example') &&
        !email.toLowerCase().includes('abc@xyz.com') &&
        !email.toLowerCase().includes('test@') &&
        !email.toLowerCase().endsWith('.invalid')
      );

    if (mailtoLinks.length > 0) {
      return mailtoLinks[0];
    }

    // 2. Fallback: search raw text for any email-looking pattern
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    const cleaned = (emailMatch || []).find(e =>
      !e.toLowerCase().startsWith('noreply') &&
      !e.toLowerCase().includes('example') &&
      !e.toLowerCase().includes('abc@xyz.com') &&
      !e.toLowerCase().includes('test@') &&
      !e.toLowerCase().endsWith('.invalid')
    );

    return cleaned ?? null;
  } catch (err) {
    console.warn(`❌ Error scraping ${url}:`, err);
    return null;
  }
}
