#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { discoverBusinessEmail } from './tools/discoverBusinessEmail.js';

const server = new McpServer({
  name: 'ClicknContact',
  version: '1.0.0',
  description: 'Discovers contact emails and form data from websites using MCP',
});

server.tool(
  discoverBusinessEmail.name,
  discoverBusinessEmail.description,
  discoverBusinessEmail.inputSchema.shape, // ✅ must use `.shape`
  discoverBusinessEmail.handler
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('❌ MCP Server failed to start:', err);
  process.exit(1);
});
