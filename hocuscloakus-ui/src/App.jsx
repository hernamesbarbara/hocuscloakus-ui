import SplitDiffView from "./components/SplitDiffView";
import { useState } from "react";

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState("markdown");

  // Sample markdown files
  const markdownFiles = {
    original: {
      name: "README.md",
      type: "markdown",
      content: `# Project Title

A brief description of what this project does and who it's for.

## Installation

\`\`\`bash
npm install my-project
cd my-project
npm start
\`\`\`

## Features

- **Fast**: Built with performance in mind
- **Flexible**: Easily customizable
- **Modern**: Uses latest technologies

## API Reference

### \`getData()\`

Returns the current data state.

\`\`\`javascript
const data = await getData();
console.log(data);
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](https://choosealicense.com/licenses/mit/)`,
    },
    masked: {
      name: "README.md (masked)",
      type: "markdown",
      content: `# [REDACTED]

A brief description of what this project does and who it's for.

## Installation

\`\`\`bash
npm install [PACKAGE_NAME]
cd [PACKAGE_NAME]
npm start
\`\`\`

## Features

- **Fast**: Built with performance in mind
- **Flexible**: Easily customizable
- **Modern**: Uses latest technologies

## API Reference

### \`[FUNCTION_NAME]()\`

Returns the [REDACTED] data state.

\`\`\`javascript
const data = await [FUNCTION_NAME]();
console.log(data);
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](https://choosealicense.com/licenses/mit/)`,
    },
  };

  // Sample JSON files
  const jsonFiles = {
    original: {
      name: "config.json",
      type: "json",
      content: JSON.stringify(
        {
          name: "my-awesome-app",
          version: "1.2.3",
          description: "A production-ready application",
          main: "index.js",
          scripts: {
            start: "node index.js",
            dev: "nodemon index.js",
            test: "jest",
            build: "webpack --mode production",
          },
          dependencies: {
            express: "^4.18.2",
            mongoose: "^7.5.0",
            jsonwebtoken: "^9.0.2",
            bcrypt: "^5.1.0",
          },
          devDependencies: {
            nodemon: "^3.0.1",
            jest: "^29.6.4",
            webpack: "^5.88.2",
          },
          repository: {
            type: "git",
            url: "https://github.com/user/my-awesome-app.git",
          },
          author: "John Doe <john@example.com>",
          license: "MIT",
          keywords: ["node", "express", "api", "production"],
          engines: {
            node: ">=16.0.0",
            npm: ">=8.0.0",
          },
        },
        null,
        2,
      ),
    },
    masked: {
      name: "config.json (masked)",
      type: "json",
      content: JSON.stringify(
        {
          name: "[REDACTED]",
          version: "1.2.3",
          description: "[REDACTED]",
          main: "index.js",
          scripts: {
            start: "node index.js",
            dev: "nodemon index.js",
            test: "jest",
            build: "webpack --mode production",
          },
          dependencies: {
            express: "^4.18.2",
            mongoose: "^7.5.0",
            jsonwebtoken: "^9.0.2",
            bcrypt: "^5.1.0",
          },
          devDependencies: {
            nodemon: "^3.0.1",
            jest: "^29.6.4",
            webpack: "^5.88.2",
          },
          repository: {
            type: "git",
            url: "[REDACTED]",
          },
          author: "[REDACTED]",
          license: "MIT",
          keywords: ["node", "express", "api", "production"],
          engines: {
            node: ">=16.0.0",
            npm: ">=8.0.0",
          },
        },
        null,
        2,
      ),
    },
  };

  const currentFiles = selectedFiles === "markdown" ? markdownFiles : jsonFiles;

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2 font-sora">
            File Diff Viewer
          </h1>
          <p className="text-[#6F6F6F] dark:text-[#AAAAAA] font-inter mb-4">
            Compare original and masked file contents side by side
          </p>

          {/* File Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFiles("markdown")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                selectedFiles === "markdown"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-[#262626] text-[#6F6F6F] dark:text-[#AAAAAA] border border-[#E6E6E6] dark:border-[#333333] hover:bg-[#F8F8F8] dark:hover:bg-[#2A2A2A]"
              }`}
            >
              Markdown Example
            </button>
            <button
              onClick={() => setSelectedFiles("json")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                selectedFiles === "json"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-[#262626] text-[#6F6F6F] dark:text-[#AAAAAA] border border-[#E6E6E6] dark:border-[#333333] hover:bg-[#F8F8F8] dark:hover:bg-[#2A2A2A]"
              }`}
            >
              JSON Example
            </button>
          </div>
        </div>

        <SplitDiffView
          originalFile={currentFiles.original}
          maskedFile={currentFiles.masked}
        />
      </div>
    </div>
  );
}