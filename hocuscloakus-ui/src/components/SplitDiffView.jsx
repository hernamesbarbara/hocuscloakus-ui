import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import ReactMarkdown from 'react-markdown';
import { Copy, FileText } from 'lucide-react';

export default function SplitDiffView({ originalFile, maskedFile }) {
  const [copiedSide, setCopiedSide] = useState(null);

  const handleCopy = async (content, side) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSide(side);
      setTimeout(() => setCopiedSide(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const JsonHighlighter = ({ content }) => {
    try {
      const parsed = JSON.parse(content);
      const formatted = JSON.stringify(parsed, null, 2);

      return (
        <pre className="font-jetbrains text-sm whitespace-pre-wrap break-words overflow-x-auto bg-[#F8F9FA] dark:bg-[#1F2937] p-4 rounded-lg">
          <code className="text-[#2B2B2B] dark:text-[#E5E5E5]">
            {formatted}
          </code>
        </pre>
      );
    } catch (e) {
      return (
        <pre className="font-jetbrains text-sm text-red-500 whitespace-pre-wrap break-words">
          Error parsing JSON: {e.message}
          {'\n\n'}
          {content}
        </pre>
      );
    }
  };

  const FilePane = ({ file, side }) => (
    <div className="h-full flex flex-col bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] dark:bg-[#262626] border-b border-[#E6E6E6] dark:border-[#333333]">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#6B7280] dark:text-[#9CA3AF]" />
          <span className="font-medium text-sm text-[#374151] dark:text-[#D1D5DB] font-inter">
            {file.name}
          </span>
        </div>
        
        <button
          onClick={() => handleCopy(file.content, side)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] bg-white dark:bg-[#1E1E1E] border border-[#D1D5DB] dark:border-[#404040] rounded-md transition-all duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] hover:text-[#374151] dark:hover:text-[#E5E7EB] active:scale-95"
        >
          <Copy size={12} />
          {copiedSide === side ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {file.type === 'markdown' ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-[#F3F4F6] dark:bg-[#374151] text-[#E11D48] dark:text-[#F87171] px-1 py-0.5 rounded text-sm font-jetbrains"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className="bg-[#F8F9FA] dark:bg-[#1F2937] p-4 rounded-lg overflow-x-auto">
                      <code className="font-jetbrains text-sm text-[#2B2B2B] dark:text-[#E5E5E5]" {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-[#111827] dark:text-white mb-4 font-sora">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-[#111827] dark:text-white mb-3 mt-6 font-sora">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-[#111827] dark:text-white mb-2 mt-4 font-sora">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#374151] dark:text-[#D1D5DB] mb-4 leading-relaxed font-inter">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 text-[#374151] dark:text-[#D1D5DB] font-inter">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="mb-1">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#111827] dark:text-white">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#2563EB] dark:text-[#60A5FA] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {file.content}
            </ReactMarkdown>
          </div>
        ) : file.type === 'json' ? (
          <JsonHighlighter content={file.content} />
        ) : (
          <pre className="font-jetbrains text-sm text-[#2B2B2B] dark:text-[#E5E5E5] whitespace-pre-wrap break-words">
            {file.content}
          </pre>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-[80vh] bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <PanelGroup direction="horizontal" autoSaveId="diff-view-layout">
        <Panel defaultSize={50} minSize={30}>
          <FilePane file={originalFile} side="original" />
        </Panel>
        
        <PanelResizeHandle className="w-1 bg-[#E5E7EB] dark:bg-[#374151] hover:bg-[#D1D5DB] dark:hover:bg-[#4B5563] transition-colors duration-150 cursor-col-resize" />
        
        <Panel defaultSize={50} minSize={30}>
          <FilePane file={maskedFile} side="masked" />
        </Panel>
      </PanelGroup>
    </div>
  );
}