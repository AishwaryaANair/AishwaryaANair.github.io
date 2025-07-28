// components/themed-resume/ThemedResumePreview.tsx
"use client";

import { useState } from "react";
import { ThemedResumeResult } from "../types/resume";

interface ThemedResumePreviewProps {
  themedResume: ThemedResumeResult;
}

export default function ThemedResumePreview({
  themedResume,
}: ThemedResumePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "css" | "js">(
    "preview",
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const downloadResume = () => {
    // Create a complete HTML file with embedded CSS and JS
    const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Johnson - ${themedResume.theme} Theme Resume</title>
    <style>
${themedResume.cssContent}
    </style>
</head>
<body>
${themedResume.htmlContent}

    <script>
${themedResume.jsContent || ""}
    </script>
</body>
</html>`;

    // Create and download the file
    const blob = new Blob([completeHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alex-johnson-resume-${themedResume.theme}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content).then(() => {
      alert(`${type} code copied to clipboard!`);
    });
  };

  const shareResume = () => {
    if (navigator.share) {
      navigator.share({
        title: `Alex Johnson - ${themedResume.theme} Theme Resume`,
        text: `Check out this ${themedResume.theme} themed resume!`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Resume URL copied to clipboard!");
      });
    }
  };

  const tabs = [
    { id: "preview", label: "Live Preview", icon: "👁️" },
    { id: "html", label: "HTML", icon: "📄" },
    { id: "css", label: "CSS", icon: "🎨" },
    { id: "js", label: "JavaScript", icon: "⚡" },
  ] as const;

  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 ${
        isFullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div>
          <h3 className="text-lg font-semibold text-white">
            🎨{" "}
            {themedResume.theme.charAt(0).toUpperCase() +
              themedResume.theme.slice(1)}{" "}
            Theme Resume
          </h3>
          <p className="text-sm text-blue-200">
            Generated from: &ldquo;{themedResume.userPrompt}&rdquo;
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors text-sm"
          >
            {isFullscreen ? "📤 Exit" : "📺 Fullscreen"}
          </button>
          <button
            onClick={shareResume}
            className="px-3 py-1 bg-blue-500/50 text-white rounded hover:bg-blue-500/70 transition-colors text-sm"
          >
            📤 Share
          </button>
          <button
            onClick={downloadResume}
            className="px-3 py-1 bg-green-500/50 text-white rounded hover:bg-green-500/70 transition-colors text-sm"
          >
            📥 Download
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/20 bg-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-blue-400 text-blue-300 bg-white/10"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={`${isFullscreen ? "h-full" : "h-96"} overflow-hidden`}>
        {activeTab === "preview" && (
          <div className="h-full relative">
            <iframe
              srcDoc={
                themedResume.htmlContent +
                "<style>" +
                themedResume.cssContent +
                "</style>" +
                (themedResume.jsContent
                  ? "<script>" + themedResume.jsContent + "</script>"
                  : "")
              }
              className="w-full h-full border-0 bg-white"
              title="Themed Resume Preview"
              sandbox="allow-scripts"
            />
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              Live Preview
            </div>
          </div>
        )}

        {activeTab === "html" && (
          <div className="h-full">
            <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/10">
              <span className="text-sm font-medium text-white">
                HTML Structure
              </span>
              <button
                onClick={() =>
                  copyToClipboard(themedResume.htmlContent, "HTML")
                }
                className="px-3 py-1 bg-blue-500/50 text-white text-xs rounded hover:bg-blue-500/70 transition-colors"
              >
                📋 Copy HTML
              </button>
            </div>
            <pre className="h-full overflow-auto p-4 text-xs bg-gray-900 text-green-400 font-mono">
              <code>{themedResume.htmlContent}</code>
            </pre>
          </div>
        )}

        {activeTab === "css" && (
          <div className="h-full">
            <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/10">
              <span className="text-sm font-medium text-white">
                Styling & Theme
              </span>
              <button
                onClick={() => copyToClipboard(themedResume.cssContent, "CSS")}
                className="px-3 py-1 bg-blue-500/50 text-white text-xs rounded hover:bg-blue-500/70 transition-colors"
              >
                📋 Copy CSS
              </button>
            </div>
            <pre className="h-full overflow-auto p-4 text-xs bg-gray-900 text-blue-400 font-mono">
              <code>{themedResume.cssContent}</code>
            </pre>
          </div>
        )}

        {activeTab === "js" && (
          <div className="h-full">
            <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/10">
              <span className="text-sm font-medium text-white">
                Interactive Features
              </span>
              <button
                onClick={() =>
                  copyToClipboard(themedResume.jsContent || "", "JavaScript")
                }
                className="px-3 py-1 bg-blue-500/50 text-white text-xs rounded hover:bg-blue-500/70 transition-colors"
              >
                📋 Copy JS
              </button>
            </div>
            <pre className="h-full overflow-auto p-4 text-xs bg-gray-900 text-yellow-400 font-mono">
              <code>
                {themedResume.jsContent ||
                  '// No JavaScript generated for this theme\nconsole.log("Static resume - no interactivity needed");'}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-white/5 border-t border-white/20">
        <div className="flex justify-between items-center text-sm">
          <div className="text-blue-200">
            <span className="font-medium">Theme:</span> {themedResume.theme} |
            <span className="font-medium ml-2">Generated:</span>{" "}
            {themedResume.createdAt.toLocaleString()}
          </div>
          <div className="flex items-center text-green-300">
            <span className="mr-1">🔒</span>
            <span className="text-xs">Secure Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
