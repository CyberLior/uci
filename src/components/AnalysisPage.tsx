import { useState, useEffect } from 'react';
import { ArrowLeft, FileCheck, AlertTriangle, Share2, RotateCcw } from 'lucide-react';
import ScanningAnimation from './ScanningAnimation';
import ScoreMeter from './ScoreMeter';
import { AnalysisResult } from '../types';
import { scanningMessages } from '../utils/demoData';

interface AnalysisPageProps {
  result: AnalysisResult;
  onBack: () => void;
  onGenerateReport: () => void;
  onAnalyzeAnother: () => void;
}

export default function AnalysisPage({ result, onBack, onGenerateReport, onAnalyzeAnother }: AnalysisPageProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setIsScanning(true);
    setShowResults(false);
  }, [result.id]);

  const handleScanComplete = () => {
    setIsScanning(false);
    setTimeout(() => setShowResults(true), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Upload</span>
        </button>

        {isScanning ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Analyzing Media
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm">
              <ScanningAnimation messages={scanningMessages} onComplete={handleScanComplete} />
            </div>
          </div>
        ) : (
          <div className={`max-w-5xl mx-auto transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Analysis Complete
            </h2>

            <div className="grid gap-8 mb-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                <ScoreMeter score={result.authenticityScore} status={result.status} />
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  {result.status === 'safe' ? (
                    <FileCheck className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  )}
                  <h3 className="text-2xl font-semibold text-white">
                    AI Analysis Summary
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {result.aiExplanation}
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Detected Signals
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.detectedSignals.map((signal, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        result.status === 'safe' ? 'bg-green-400' : result.status === 'suspicious' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <span className="text-gray-300 text-sm">{signal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">
                  File Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Filename:</span>
                    <span className="text-white ml-2 font-mono">{result.fileName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white ml-2 capitalize">{result.fileType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-cyan-400 ml-2 font-semibold">{result.confidenceLevel}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Analyzed:</span>
                    <span className="text-white ml-2">{new Date(result.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGenerateReport}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/50"
              >
                <Share2 className="w-5 h-5" />
                Generate Public Report
              </button>
              <button
                onClick={onAnalyzeAnother}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                Analyze Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
