![npm](https://img.shields.io/npm/v/@fabianwilliams/clickncontact)
![build](https://img.shields.io/github/actions/workflow/status/fabianwilliams/ClicknContact/ci.yml)
![license](https://img.shields.io/npm/l/@fabianwilliams/clickncontact)

# 📬 ClicknContact

**ClicknContact** is an open-source tool that discovers business contact emails from websites using scraping, form detection, and metadata extraction — powered by the [Model Context Protocol (MCP)](https://modelcontextprotocol.dev).

When businesses hide their emails behind contact forms or directories, ClicknContact steps in — using automation to **scrape**, **detect**, and **surface** real inboxes, avoiding traps like \`noreply@\`.

---

## 🔍 Features

- 🔗 Extract emails from \`mailto:\` links and page content  
- 📄 Detect forms and identify field names for smart submission  
- 🤖 Fully compatible with AI assistants and agent frameworks using MCP  
- 🔁 Can be extended to simulate form submission and track responder behavior  
- 🧩 MCP-native tooling, modular and ready to compose in workflows  

---

## 🚀 Use Cases

- Lead enrichment and B2B outreach automation  
- Discover real contact channels for customer service escalation  
- Research contactability across business sectors  
- Intelligent email validation pipelines  

---

## ⚙️ Project Structure

```
ClicknContact/
├── src/
│   ├── tools/                  # MCP tool definitions (e.g., discoverBusinessEmail)
│   ├── utils/                  # Scraper logic, fetchers, processors
│   └── main.ts                 # MCP server setup and transport binding
├── test/                       # Tests (coming soon)
├── README.md
├── LICENSE
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🛠️ Getting Started

```bash
git clone https://github.com/fabianwilliams/ClicknContact.git
cd ClicknContact
npm install
npm run build
npx @modelcontextprotocol/inspector node ./build/main.js
```

☝️ This starts the MCP server and connects to [MCP Inspector](https://modelcontextprotocol.dev/tools/inspector), letting you test the \`discoverBusinessEmail\` tool interactively.

---

## ⚙️ Usage Modes

### ✅ Option 1: Global Install (for local dev or CLI use)

```bash
npm install -g @fabianwilliams/clickncontact
clickncontact
```
This makes the tool globally available via the \`clickncontact\` command.

### ✅ Option 2: Ephemeral (latest version every time)

```json
{
  "tools": [
    {
      "name": "ClicknContact",
      "command": "npx",
      "args": ["-y", "@fabianwilliams/clickncontact"],
      "transport": "stdio"
    }
  ]
}
```

Perfect for **Claude Desktop** or cloud-based agents that should always use the latest published version.

---

## 🧪 Tool: \`discoverBusinessEmail\`

This tool accepts a list of website URLs and returns:

```ts
{
  url: string;
  best: string | null;       // best candidate email
  all: string[];             // all discovered emails
  formDetected: boolean;
  formFields: string[];      // name/email/phone/etc.
}
```

---

## 🧾 Input Format Example

You can test the \`discoverBusinessEmail\` tool using either **JSON** or **Form** input in MCP Inspector.

### ✅ JSON Mode

```json
{
  "websiteUrls": [
    "https://macona.org",
    "https://openai.com"
  ]
}
```

This passes an array of strings to the tool, matching the expected \`inputSchema\`.

### 📝 Form Mode

Use the *Form* tab in MCP Inspector to enter each URL as a separate item in a repeating input field. The tool expects an array — so do **not** pass a single stringified object.

### 🖼 Visual Example

You can also view the difference here:

![Input Formats: JSON vs Form](./assets/mcp-inspector-json-vs-form.png)

---

## 📦 Publishing

The tool is also available on NPM:

```bash
npm install @fabianwilliams/clickncontact
```

---

## 📜 License

MIT — use it, fork it, improve it, PR it. Let’s make smart contact discovery real.

---

## 👥 Contributing

We welcome contributors! Coming soon:

- ✅ Issue templates  
- 🧪 Test harness  
- 🛠 Form submission engine  
- 💬 Discussions  

Open an issue or start a PR — and let’s build together.

> Built with ❤️ by [@fabianwilliams](https://github.com/fabianwilliams)