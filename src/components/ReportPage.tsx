import { ArrowLeft, CheckCircle2, Copy, Share2, Download, Shield } from 'lucide-react';
import { useState } from 'react';
import { AnalysisResult } from '../types';

interface ReportPageProps {
  result: AnalysisResult;
  shareToken: string | null;
  onBack: () => void;
  onHome: () => void;
}

export default function ReportPage({ result, shareToken, onBack, onHome }: ReportPageProps) {
  const [copied, setCopied] = useState(false);
  const reportUrl = shareToken
    ? `${window.location.origin}/report/${shareToken}`
    : `https://deepfake-detector.ai/report/${result.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (result.status === 'safe') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-full text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">Verified Authentic</span>
        </div>
      );
    }
    if (result.status === 'suspicious') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full text-yellow-400">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">Suspicious Content</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-400">
        <Shield className="w-5 h-5" />
        <span className="font-semibold">Likely Deepfake</span>
      </div>
    );
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
          <span>Back to Analysis</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-4 shadow-lg shadow-cyan-500/50">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Public Verification Report
            </h1>
            <p className="text-gray-400">
              Official authenticity certificate for media verification
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border-2 border-cyan-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl space-y-8">
            <div className="flex justify-center">
              {getStatusBadge()}
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                      Authenticity Score
                    </h3>
                    <div className="text-5xl font-bold text-white">
                      {result.authenticityScore}
                      <span className="text-2xl text-gray-500">/100</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                      Confidence Level
                    </h3>
                    <div className="text-2xl font-semibold text-cyan-400">
                      {result.confidenceLevel}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                      Report ID
                    </h3>
                    <div className="text-white font-mono text-sm break-all bg-gray-800/50 p-3 rounded">
                      {result.id}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                      Timestamp
                    </h3>
                    <div className="text-white">
                      {new Date(result.timestamp).toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'long'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                AI Analysis Summary
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {result.aiExplanation}
              </p>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                File Hash (SHA-256)
              </h3>
              <div className="bg-gray-800/50 p-4 rounded font-mono text-xs text-cyan-400 break-all">
                {result.fileHash}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                File Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Filename:</span>
                  <span className="text-white ml-2 font-mono">{result.fileName}</span>
                </div>
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2 capitalize">{result.fileType}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                Share This Report
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={reportUrl}
                  readOnly
                  className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share Report
              </button>
              <button
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onHome}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Analyze Another File →
            </button>
          </div>

          <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 text-sm">
              This report was generated by AI-powered deepfake detection technology.
              For official verification purposes, please reference the Report ID and SHA-256 hash.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
