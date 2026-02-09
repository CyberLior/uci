import { useEffect, useState } from 'react';
import { Cpu, Zap } from 'lucide-react';

interface ScanningAnimationProps {
  messages: string[];
  onComplete: () => void;
}

export default function ScanningAnimation({ messages, onComplete }: ScanningAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full animate-pulse" />
        <div className="relative bg-gray-900 rounded-full p-8 border-2 border-cyan-500/50">
          <Cpu className="w-24 h-24 text-cyan-400 animate-pulse" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-2 animate-bounce">
          <Zap className="w-6 h-6 text-white" fill="currentColor" />
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-white mb-2">
            {progress}%
          </p>
          <p className="text-cyan-400 text-lg animate-pulse">
            {messages[currentMessageIndex]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-cyan-500/50 rounded-full"
            style={{
              animation: `pulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
