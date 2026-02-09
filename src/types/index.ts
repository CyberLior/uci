export interface AnalysisResult {
  id: string;
  fileName: string;
  fileType: string;
  authenticityScore: number;
  status: 'safe' | 'suspicious' | 'fake';
  timestamp: string;
  fileHash: string;
  aiExplanation: string;
  detectedSignals: string[];
  confidenceLevel: number;
  previewUrl?: string;
}

export type MediaType = 'image' | 'audio' | 'video' | 'text' | 'url';

export type PageView = 'landing' | 'analysis' | 'report';
