import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';
import ReportPage from './components/ReportPage';
import { PageView, AnalysisResult } from './types';
import { DEMO_FAKE, DEMO_REAL } from './utils/demoData';
import { callAnalyzeFunction } from './utils/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const generateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `sha256:${hashHex}`;
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      const fileType = file.type.split('/')[0] || 'unknown';
      const fileHash = await generateFileHash(file);

      const analysis = await callAnalyzeFunction(file.name, fileType, fileHash);

      setCurrentResult(analysis);
      setShareToken(null);
      setCurrentPage('analysis');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze file. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDemoClick = (type: 'fake' | 'real') => {
    setCurrentResult(type === 'fake' ? DEMO_FAKE : DEMO_REAL);
    setCurrentPage('analysis');
  };

  const handleGenerateReport = async () => {
    try {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setShareToken(token);
      setCurrentPage('report');
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  const handleBackToAnalysis = () => {
    setCurrentPage('analysis');
  };

  const handleAnalyzeAnother = () => {
    setCurrentResult(null);
    setCurrentPage('landing');
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage
          onFileUpload={handleFileUpload}
          onDemoClick={handleDemoClick}
        />
      )}

      {currentPage === 'analysis' && currentResult && (
        <AnalysisPage
          result={currentResult}
          onBack={handleBack}
          onGenerateReport={handleGenerateReport}
          onAnalyzeAnother={handleAnalyzeAnother}
        />
      )}

      {currentPage === 'report' && currentResult && (
        <ReportPage
          result={currentResult}
          shareToken={shareToken}
          onBack={handleBackToAnalysis}
          onHome={handleAnalyzeAnother}
        />
      )}
    </>
  );
}

export default App;
