import { useEffect, useState } from 'react';

interface ScoreMeterProps {
  score: number;
  status: 'safe' | 'suspicious' | 'fake';
}

export default function ScoreMeter({ score, status }: ScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = () => {
    if (status === 'safe') return 'text-green-400';
    if (status === 'suspicious') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrokeColor = () => {
    if (status === 'safe') return '#4ade80';
    if (status === 'suspicious') return '#facc15';
    return '#f87171';
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="#1f2937"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke={getStrokeColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getStrokeColor()})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-6xl font-bold ${getColor()}`}>
            {displayScore}
          </span>
          <span className="text-gray-400 text-lg">/ 100</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-2xl font-semibold text-white mb-1">
          Authenticity Score
        </p>
        <p className={`text-lg font-medium ${getColor()}`}>
          {status === 'safe' && 'Authentic Content'}
          {status === 'suspicious' && 'Suspicious Content'}
          {status === 'fake' && 'Likely Deepfake'}
        </p>
      </div>
    </div>
  );
}
