# 📬 ClicknContact

**ClicknContact** is an open-source tool that discovers business contact emails using website scraping, smart form submission, and intelligent agent workflows powered by [Model Context Protocol (MCP)](https://modelcontextprotocol.dev).

When businesses hide their emails behind contact forms or trade organization directories, ClicknContact steps in — using automation to **scrape**, **submit**, and **surface** real inboxes, even detecting autoresponder behavior to avoid `noreply@` traps.

---

## 🔍 Features

- 🔎 Crawl websites to extract `mailto:` links and structured contact info
- 🧠 Submit contact forms with traceable metadata to detect real responders
- 📬 Parse reply headers to detect valid inboxes vs. automated responses
- 🧰 Uses MCP-compatible agent tooling for modular, prompt-driven discovery
- 📚 Logs findings in structured formats for downstream use

---

## 🚀 Use Cases

- Lead enrichment and outreach automation
- Escalation workflows where a real inbox is required
- Research into contactability of businesses across sectors
- Competitive intelligence and contact mapping

---

## 🛠️ Getting Started

Clone the repo:

```bash
git clone https://github.com/fabianwilliams/ClicknContact.git
cd ClicknContact
npm install
npm start
```

☝️ This project will expose an MCP tool named discoverBusinessEmail for use in AI workflows like Claude, ChatGPT, or any agent client that supports the Model Context Protocol.

ClicknContact/
├── src/
│   ├── tools/                  # MCP tools (e.g., discoverBusinessEmail)
│   ├── utils/                  # Scrapers, form parsers, response analyzers
│   └── server.ts               # MCP server setup
├── test/                       # Unit and integration tests
├── README.md
├── LICENSE
├── .gitignore
└── package.json

## 📜 License

MIT — use it, fork it, improve it, PR it. Let's build together.

---

## 👥 Contributing

We welcome contributors! Coming soon:

- ✅ Issue templates  
- 🧪 Test harness  
- 💬 Discussions  

Open an issue or start a PR — and let’s make smart contact automation real.

> Project by [@fabianwilliams](https://github.com/fabianwilliams) 💡
