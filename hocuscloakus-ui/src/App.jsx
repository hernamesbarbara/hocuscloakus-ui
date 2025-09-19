import SplitDiffView from "./components/SplitDiffView";
import { useState, useEffect } from "react";

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState("markdown");
  const [markdownFiles, setMarkdownFiles] = useState(null);
  const [jsonFiles, setJsonFiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all files in parallel
        const [mdOriginal, mdMasked, jsonOriginal, jsonMasked] = await Promise.all([
          fetch('/data/md/email.original.md').then(r => r.text()),
          fetch('/data/md/email.masked.md').then(r => r.text()),
          fetch('/data/json/email.original.json').then(r => r.text()),
          fetch('/data/json/email.masked.json').then(r => r.text()),
        ]);

        setMarkdownFiles({
          original: {
            name: "email.original.md",
            type: "markdown",
            content: mdOriginal
          },
          masked: {
            name: "email.masked.md",
            type: "markdown",
            content: mdMasked
          }
        });

        setJsonFiles({
          original: {
            name: "email.original.json",
            type: "json",
            content: jsonOriginal
          },
          masked: {
            name: "email.masked.json",
            type: "json",
            content: jsonMasked
          }
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []); // Load once on mount

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-black dark:text-white">Loading sample data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

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