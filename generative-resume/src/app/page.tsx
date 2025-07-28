// app/page.tsx
"use client";

import { useState } from "react";
import {
  ResumeContent,
  ThemeRequest,
  ThemeState,
  ThemedResumeResult,
} from "./types/resume";
import ThemePromptForm from "./components/ThemePromptForm";
import ThemedResumePreview from "./components/ThemedResumePreview";
import ThemeProgress from "./components/ThemeProgress";

export default function ThemedResumePage() {
  const [themeState, setThemeState] = useState<ThemeState>({
    status: "idle",
  });

  // My actual resume content (replace with your own!)
  const resumeContent: ResumeContent = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Full Stack Developer & AI Enthusiast",
      email: "alex.johnson@email.com",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
    },
    summary:
      "Passionate full-stack developer with 3+ years of experience building scalable web applications using React, TypeScript, and Node.js. Strong problem-solving skills and experience working in agile environments. Currently exploring AI integration in web development and building innovative user experiences.",
    experience: [
      {
        company: "TechCorp Solutions",
        position: "Senior Software Developer",
        duration: "2022 - Present",
        location: "San Francisco, CA",
        achievements: [
          "Led development of React applications serving 50,000+ daily users",
          "Implemented AI-powered features that increased user engagement by 40%",
          "Mentored 3 junior developers and established code review processes",
          "Architected microservices infrastructure reducing load times by 60%",
        ],
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "AWS",
          "Docker",
        ],
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        duration: "2021 - 2022",
        location: "Remote",
        achievements: [
          "Built responsive web interfaces using React and modern CSS",
          "Integrated RESTful APIs and GraphQL endpoints",
          "Collaborated with design team to implement pixel-perfect UIs",
          "Improved application performance by 35% through optimization",
        ],
        technologies: ["React", "JavaScript", "CSS3", "GraphQL", "Git"],
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        year: "2021",
        gpa: "3.8",
        honors: [
          "Dean's List",
          "Computer Science Honor Society",
          "Outstanding Senior Project",
        ],
      },
    ],
    projects: [
      {
        name: "AI Website Generator",
        description:
          "Full-stack application that generates complete websites from text descriptions using AI",
        technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
        highlights: [
          "Real-time AI-powered website generation",
          "Interactive code preview and editing",
          "Download functionality for generated sites",
          "Built with type-safe TypeScript architecture",
        ],
        githubUrl: "github.com/alexjohnson/ai-website-generator",
        liveUrl: "ai-generator.alexjohnson.dev",
      },
      {
        name: "Themed Resume Generator",
        description: "Dynamic resume website with AI-powered theme generation",
        technologies: ["Next.js", "TypeScript", "AI Integration", "CSS-in-JS"],
        highlights: [
          "AI-powered theme generation from user prompts",
          "Security measures against prompt injection",
          "Real-time preview and theme switching",
          "Downloadable themed resume versions",
        ],
        githubUrl: "github.com/alexjohnson/themed-resume",
      },
    ],
    skills: [
      {
        category: "Frontend",
        items: [
          "React",
          "TypeScript",
          "JavaScript",
          "Next.js",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Responsive Design",
        ],
      },
      {
        category: "Backend",
        items: [
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "MongoDB",
          "RESTful APIs",
          "GraphQL",
          "Microservices",
        ],
      },
      {
        category: "DevOps & Tools",
        items: [
          "Git",
          "Docker",
          "AWS",
          "Vercel",
          "VS Code",
          "Webpack",
          "Jest",
          "CI/CD",
        ],
      },
      {
        category: "AI & Emerging Tech",
        items: [
          "OpenAI API",
          "Prompt Engineering",
          "AI Integration",
          "Machine Learning Basics",
          "Web3 Fundamentals",
        ],
      },
    ],
  };

  // Security function to check for prompt injection
  const checkPromptSecurity = (prompt: string): boolean => {
    const dangerousPatterns = [
      /ignore.{0,20}previous.{0,20}instruction/i,
      /forget.{0,20}system.{0,20}prompt/i,
      /override.{0,20}security/i,
      /admin.{0,20}mode/i,
      /developer.{0,20}mode/i,
      /system.{0,20}prompt/i,
      /jailbreak/i,
      /bypass.{0,20}filter/i,
    ];

    return !dangerousPatterns.some((pattern) => pattern.test(prompt));
  };

  // Generate themed resume
  const generateThemedResume = async (request: ThemeRequest): Promise<void> => {
    setThemeState({ status: "generating", progress: 0 });

    try {
      // Security check
      if (!checkPromptSecurity(request.userPrompt)) {
        setThemeState({
          status: "security_violation",
          error:
            "Security violation detected. Please enter a normal theme request.",
        });
        return;
      }

      // Simulate AI generation with progress
      for (let i = 0; i <= 100; i += 25) {
        setThemeState((prev: any) => ({ ...prev, progress: i }));
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Generate themed resume based on prompt
      const themedResume = generateThemedContent(
        request.userPrompt,
        resumeContent,
      );

      setThemeState({
        status: "success",
        result: themedResume,
      });
    } catch (error) {
      setThemeState({
        status: "error",
        error: "Failed to generate themed resume. Please try again.",
      });
    }
  };

  // Mock AI content generation
  const generateThemedContent = (
    userPrompt: string,
    content: ResumeContent,
  ): ThemedResumeResult => {
    // Determine theme based on prompt keywords
    let selectedTheme = "minimal"; // default
    const prompt = userPrompt.toLowerCase();

    if (
      prompt.includes("terminal") ||
      prompt.includes("vi") ||
      prompt.includes("vim") ||
      prompt.includes("console")
    ) {
      selectedTheme = "terminal";
    } else if (prompt.includes("dark") || prompt.includes("night")) {
      selectedTheme = "dark";
    } else if (
      prompt.includes("retro") ||
      prompt.includes("vintage") ||
      prompt.includes("80s")
    ) {
      selectedTheme = "retro";
    } else if (
      prompt.includes("neon") ||
      prompt.includes("glow") ||
      prompt.includes("electric")
    ) {
      selectedTheme = "neon";
    } else if (
      prompt.includes("cyberpunk") ||
      prompt.includes("futuristic") ||
      prompt.includes("matrix")
    ) {
      selectedTheme = "cyberpunk";
    }

    const themeContent = generateThemeContent(selectedTheme, content);

    return {
      id: Date.now().toString(),
      theme: selectedTheme,
      htmlContent: themeContent.html,
      cssContent: themeContent.css,
      jsContent: themeContent.js,
      userPrompt: userPrompt,
      createdAt: new Date(),
      isSecure: true,
    };
  };

  // Generate theme content based on selected theme
  const generateThemeContent = (theme: string, content: ResumeContent) => {
    if (theme === "terminal") {
      return generateTerminalTheme(content);
    }

    // For other themes, return a simple version
    return {
      html: `
<div class="${theme}-resume">
  <header class="header">
    <h1>${content.personalInfo.name}</h1>
    <h2>${content.personalInfo.title}</h2>
    <div class="contact">
      <p>📧 ${content.personalInfo.email}</p>
      <p>📍 ${content.personalInfo.location}</p>
    </div>
  </header>

  <section class="summary">
    <h3>Summary</h3>
    <p>${content.summary}</p>
  </section>

  <section class="experience">
    <h3>Experience</h3>
    ${content.experience
      .map(
        (exp: any) => `
      <div class="job">
        <h4>${exp.position} @ ${exp.company}</h4>
        <p class="duration">${exp.duration} | ${exp.location}</p>
        <ul>
          ${exp.achievements.map((achievement: string) => `<li>${achievement}</li>`).join("")}
        </ul>
        <p class="tech">Technologies: ${exp.technologies.join(", ")}</p>
      </div>
    `,
      )
      .join("")}
  </section>

  <section class="skills">
    <h3>Skills</h3>
    ${content.skills
      .map(
        (skillGroup: any) => `
      <div class="skill-group">
        <h4>${skillGroup.category}</h4>
        <p>${skillGroup.items.join(" • ")}</p>
      </div>
    `,
      )
      .join("")}
  </section>
</div>`,
      css: getThemeCSS(theme),
      js: `console.log('${theme} theme loaded');`,
    };
  };

  // Terminal theme generator with full implementation
  const generateTerminalTheme = (content: ResumeContent) => {
    const html = `
<div class="terminal-container">
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span class="btn close"></span>
      <span class="btn minimize"></span>
      <span class="btn maximize"></span>
    </div>
    <div class="terminal-title">alex@resume:~$</div>
  </div>
  <div class="terminal-body">
    <div class="terminal-line">
      <span class="prompt">alex@resume:~$</span> <span class="command">cat personal_info.txt</span>
    </div>
    <div class="output">
      <div class="ascii-art">
 █████╗ ██╗     ███████╗██╗  ██╗
██╔══██╗██║     ██╔════╝╚██╗██╔╝
███████║██║     █████╗   ╚███╔╝
██╔══██║██║     ██╔══╝   ██╔██╗
██║  ██║███████╗███████╗██╔╝ ██╗
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
      </div>
      <div class="info-block">
        <div class="field">NAME: ${content.personalInfo.name}</div>
        <div class="field">TITLE: ${content.personalInfo.title}</div>
        <div class="field">EMAIL: ${content.personalInfo.email}</div>

        <div class="field">LOCATION: ${content.personalInfo.location}</div>
        ${content.personalInfo.github ? `<div class="field">GITHUB: ${content.personalInfo.github}</div>` : ""}
      </div>
    </div>

    <div class="terminal-line">
      <span class="prompt">alex@resume:~$</span> <span class="command">cat summary.txt</span>
    </div>
    <div class="output">
      <div class="text-content">${content.summary}</div>
    </div>

    ${content.experience
      .map(
        (exp) => `
      <div class="terminal-line">
        <span class="prompt">alex@resume:~$</span> <span class="command">cat experience/${exp.company.toLowerCase().replace(/\s+/g, "_")}.exp</span>
      </div>
      <div class="output">
        <div class="exp-header">${exp.position} @ ${exp.company}</div>
        <div class="exp-duration">${exp.duration} | ${exp.location}</div>
        <div class="achievements">
          ${exp.achievements.map((achievement) => `<div class="achievement">• ${achievement}</div>`).join("")}
        </div>
        <div class="tech-stack">Tech: [${exp.technologies.join(", ")}]</div>
      </div>
    `,
      )
      .join("")}

    <div class="terminal-line cursor-line">
      <span class="prompt">alex@resume:~$</span> <span class="cursor">█</span>
    </div>
  </div>
</div>`;

    const css = `
body {
  margin: 0;
  padding: 20px;
  background: #000;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  overflow-x: auto;
}

.terminal-container {
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,255,0,0.3);
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}

.terminal-header {
  background: #2d2d2d;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
  margin-right: 15px;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn.close { background: #ff5f57; }
.btn.minimize { background: #ffbd2e; }
.btn.maximize { background: #28ca42; }

.terminal-title {
  color: #ccc;
  font-size: 14px;
}

.terminal-body {
  padding: 20px;
  background: #000;
  min-height: 500px;
  line-height: 1.6;
}

.terminal-line {
  margin: 10px 0;
}

.prompt {
  color: #00ff00;
  font-weight: bold;
}

.command {
  color: #fff;
  margin-left: 5px;
}

.output {
  margin: 10px 0 20px 0;
  color: #ccc;
}

.ascii-art {
  color: #00ff00;
  font-family: monospace;
  font-size: 12px;
  margin: 15px 0;
  text-align: center;
}

.info-block, .text-content {
  background: #111;
  padding: 15px;
  border-left: 3px solid #00ff00;
  margin: 15px 0;
  color: #ccc;
}

.field {
  margin: 5px 0;
  color: #fff;
}

.exp-header {
  color: #00ff00;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.exp-duration {
  color: #ffff00;
  margin-bottom: 10px;
}

.achievements {
  margin: 10px 0;
}

.achievement {
  color: #ccc;
  margin: 3px 0;
  padding-left: 20px;
}

.tech-stack {
  color: #ff00ff;
  margin-top: 10px;
  font-style: italic;
}

.cursor {
  background: #00ff00;
  color: #000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  body { padding: 10px; }
  .terminal-body { padding: 15px; }
}`;

    const js = `
document.addEventListener('DOMContentLoaded', function() {
  console.log('Terminal theme resume loaded!');
});`;

    return { html, css, js };
  };

  // Get CSS for different themes
  const getThemeCSS = (theme: string): string => {
    const themes: Record<string, string> = {
      dark: `
        body { background: #0a0a0a; color: #e0e0e0; font-family: 'Segoe UI', sans-serif; }
        .header { background: #1a1a1a; padding: 2rem; text-align: center; }
        .header h1 { color: #fff; font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header h2 { color: #888; font-size: 1.2rem; margin-bottom: 1rem; }
        .contact p { color: #ccc; margin: 0.5rem 0; }
        section { padding: 2rem; border-bottom: 1px solid #333; }
        h3 { color: #fff; font-size: 1.8rem; margin-bottom: 1rem; }
        .job { margin-bottom: 2rem; }
        .job h4 { color: #4a9eff; font-size: 1.2rem; }
        .duration { color: #888; font-size: 0.9rem; }
        .tech { color: #888; font-style: italic; }
      `,
      retro: `
        body { background: #f4f4e6; color: #333; font-family: 'Courier New', monospace; }
        .header { background: #8B4513; color: #fff; padding: 2rem; text-align: center; }
        .header h1 { font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        section { padding: 2rem; background: #fff; margin: 1rem; border: 3px solid #8B4513; }
        h3 { color: #8B4513; font-size: 1.8rem; text-decoration: underline; }
      `,
      neon: `
        body { background: #000; color: #ff00ff; font-family: 'Courier New', monospace; }
        .header { background: #1a0033; padding: 2rem; text-align: center; border: 2px solid #ff00ff; }
        .header h1 { color: #00ffff; font-size: 2.5rem; text-shadow: 0 0 10px #00ffff; }
        section { padding: 2rem; border: 1px solid #ff00ff; margin: 1rem; }
        h3 { color: #00ffff; text-shadow: 0 0 5px #00ffff; }
      `,
      minimal: `
        body { background: #fff; color: #333; font-family: 'Helvetica', sans-serif; line-height: 1.6; }
        .header { padding: 3rem 2rem; text-align: center; border-bottom: 1px solid #eee; }
        .header h1 { font-size: 2.5rem; font-weight: 300; margin-bottom: 0.5rem; }
        .header h2 { font-size: 1.1rem; color: #666; font-weight: 400; }
        section { padding: 2rem; max-width: 800px; margin: 0 auto; }
        h3 { font-size: 1.5rem; font-weight: 400; margin-bottom: 1.5rem; color: #2c3e50; }
      `,
      cyberpunk: `
        body { background: linear-gradient(45deg, #000, #1a0033); color: #00ffff; font-family: 'Courier New', monospace; }
        .header { background: rgba(0,255,255,0.1); padding: 2rem; text-align: center; border: 2px solid #00ffff; }
        .header h1 { color: #ff0080; font-size: 2.5rem; text-shadow: 0 0 20px #ff0080; }
        section { padding: 2rem; border: 1px solid #00ffff; margin: 1rem; background: rgba(0,0,0,0.5); }
        h3 { color: #ff0080; text-shadow: 0 0 10px #ff0080; }
      `,
    };

    return themes[theme] || themes.minimal;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎨 AI-Themed Resume Generator
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Hello! Enter your preferences to see my resume website. You can
            enter anything like &ldquo;dark themed&rdquo;, &ldquo;ice cream
            themed&rdquo;, &ldquo;android phone themed&rdquo; - anything your
            imagination can create!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theme Request Form */}
          <div>
            <ThemePromptForm
              onGenerate={generateThemedResume}
              isGenerating={themeState.status === "generating"}
            />

            {themeState.status === "generating" && (
              <ThemeProgress progress={themeState.progress || 0} />
            )}

            {themeState.status === "security_violation" && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-400 text-red-200 rounded-lg">
                <h3 className="font-bold">🚨 Security Alert</h3>
                <p>{themeState.error}</p>
                <p className="text-sm mt-2">
                  Please enter a normal theme request like &ldquo;dark
                  mode&rdquo; or &ldquo;retro style&rdquo;.
                </p>
              </div>
            )}

            {themeState.status === "error" && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-400 text-red-200 rounded-lg">
                <h3 className="font-bold">Generation Failed</h3>
                <p>{themeState.error}</p>
              </div>
            )}
          </div>

          {/* Themed Resume Preview */}
          <div>
            {themeState.result && (
              <ThemedResumePreview themedResume={themeState.result} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
