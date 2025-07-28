// components/themed-resume/ThemePromptForm.tsx
"use client";

import { useState } from "react";
import { ThemeRequest } from "../types/resume";

interface ThemePromptFormProps {
  onGenerate: (request: ThemeRequest) => Promise<void>;
  isGenerating: boolean;
}

export default function ThemePromptForm({
  onGenerate,
  isGenerating,
}: ThemePromptFormProps) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a theme description");
      return;
    }

    if (prompt.trim().length < 3) {
      setError("Please provide a more detailed theme description");
      return;
    }

    setError("");
    await onGenerate({
      userPrompt: prompt.trim(),
      timestamp: new Date(),
    });
  };

  const exampleThemes = [
    "I want to see the website in a terminal theme like vi editor",
    "Make it look like a retro 80s arcade game",
    "Design it like a dark cyberpunk interface",
    "Create a neon-glowing futuristic theme",
    "Make it look like an old-school gameboy screen",
    "Design it like a space station control panel",
    "Create a minimalist Scandinavian design",
    "Make it look like a vintage typewriter document",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    setError("");
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">
        🎨 Choose Your Theme
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="themePrompt"
            className="block text-sm font-medium text-blue-200 mb-2"
          >
            Describe how you want the resume to look
          </label>
          <textarea
            id="themePrompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError("");
            }}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-300 resize-none backdrop-blur-sm"
            placeholder="e.g., I want to see the website in a terminal theme like vi editor, or make it look like a retro 80s video game..."
            disabled={isGenerating}
            maxLength={200}
          />
          {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          <p className="text-blue-300 text-sm mt-2">
            Characters: {prompt.length}/200
          </p>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all transform ${
            isGenerating
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl"
          } text-white`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Themed Resume...
            </span>
          ) : (
            "✨ Generate My Themed Resume"
          )}
        </button>
      </form>

      {/* Example Themes */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white mb-4">
          💡 Try these theme ideas:
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {exampleThemes.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              disabled={isGenerating}
              className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-white/20"
            >
              &ldquo;{example}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
        <div className="flex items-start">
          <span className="text-green-400 mr-2">🔒</span>
          <div>
            <h4 className="text-green-300 font-medium text-sm">
              Security Protection
            </h4>
            <p className="text-green-200 text-xs mt-1">
              This system has built-in security measures to prevent prompt
              injection attacks. Only legitimate theme requests will be
              processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
