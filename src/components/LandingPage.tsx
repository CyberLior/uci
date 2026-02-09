import { Shield, Sparkles, Lock } from 'lucide-react';
import UploadZone from './UploadZone';

interface LandingPageProps {
  onFileUpload: (file: File) => void;
  onDemoClick: (type: 'fake' | 'real') => void;
}

export default function LandingPage({ onFileUpload, onDemoClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full" />
            <Shield className="w-10 h-10 text-cyan-400 relative z-10" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Deepfake Detector
          </h1>
        </div>

        <div className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Verify Media Authenticity
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                in Seconds
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced AI technology detects deepfakes, manipulated content, and misinformation across images, videos, audio, and text
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">Secure & Private</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <UploadZone onFileSelect={onFileUpload} />
        </div>

        <div className="text-center space-y-4 mb-16">
          <p className="text-gray-400 text-sm">
            Don't have a file? Try our demo examples:
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onDemoClick('fake')}
              className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 hover:border-red-500 rounded-lg text-red-400 font-medium transition-all duration-300 hover:scale-105"
            >
              Try Fake Example
            </button>
            <button
              onClick={() => onDemoClick('real')}
              className="px-8 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/50 hover:border-green-500 rounded-lg text-green-400 font-medium transition-all duration-300 hover:scale-105"
            >
              Try Real Example
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">
              Powered by Advanced AI Technology
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-cyan-400 font-semibold">Multi-Modal Detection</div>
              <p className="text-gray-400 text-sm">
                Analyzes visual, audio, and textual patterns simultaneously
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-cyan-400 font-semibold">Real-Time Analysis</div>
              <p className="text-gray-400 text-sm">
                Get results in seconds with edge AI infrastructure
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-cyan-400 font-semibold">Forensic Reports</div>
              <p className="text-gray-400 text-sm">
                Generate shareable verification certificates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
