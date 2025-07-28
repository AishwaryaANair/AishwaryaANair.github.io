// components/themed-resume/ThemeProgress.tsx

interface ThemeProgressProps {
  progress: number;
}

export default function ThemeProgress({ progress }: ThemeProgressProps) {
  const getProgressMessage = (progress: number): string => {
    if (progress < 25) return "🔍 Analyzing theme requirements...";
    if (progress < 50) return "🎨 Designing custom layout...";
    if (progress < 75) return "💻 Generating themed code...";
    if (progress < 100) return "✨ Applying final touches...";
    return "🎉 Theme generated successfully!";
  };

  const getProgressIcon = (progress: number): string => {
    if (progress < 25) return "🔍";
    if (progress < 50) return "🎨";
    if (progress < 75) return "💻";
    if (progress < 100) return "✨";
    return "🎉";
  };

  return (
    <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/20">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{getProgressIcon(progress)}</div>
        <h3 className="text-lg font-medium text-white mb-2">
          Generating Your Themed Resume
        </h3>
        <p className="text-blue-200 text-sm">{getProgressMessage(progress)}</p>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        <div className="text-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
      </div>

      {/* AI Process Visualization */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        <div
          className={`text-center p-3 rounded-lg transition-all ${
            progress >= 25
              ? "bg-green-500/20 border-green-400/50 text-green-300"
              : "bg-white/5 border-white/10 text-gray-400"
          } border`}
        >
          <div className="text-2xl mb-1">🧠</div>
          <div className="text-xs font-medium">Analyze</div>
        </div>

        <div
          className={`text-center p-3 rounded-lg transition-all ${
            progress >= 50
              ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
              : "bg-white/5 border-white/10 text-gray-400"
          } border`}
        >
          <div className="text-2xl mb-1">🎨</div>
          <div className="text-xs font-medium">Design</div>
        </div>

        <div
          className={`text-center p-3 rounded-lg transition-all ${
            progress >= 75
              ? "bg-purple-500/20 border-purple-400/50 text-purple-300"
              : "bg-white/5 border-white/10 text-gray-400"
          } border`}
        >
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs font-medium">Code</div>
        </div>

        <div
          className={`text-center p-3 rounded-lg transition-all ${
            progress >= 100
              ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
              : "bg-white/5 border-white/10 text-gray-400"
          } border`}
        >
          <div className="text-2xl mb-1">🚀</div>
          <div className="text-xs font-medium">Deploy</div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center mt-6 space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
