// test/manualTest.ts
import { discoverBusinessEmail, inputSchema } from '../src/tools/discoverBusinessEmail.js';

const run = async () => {
  const input = inputSchema.parse({
    websiteUrl: 'https://macona.org'
  });

  const result = await discoverBusinessEmail.handler(input);
  console.log('🧪 Result:', result);
};

run().catch(console.error);
