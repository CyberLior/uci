import { AnalysisResult } from '../types';

export const DEMO_FAKE: AnalysisResult = {
  id: 'demo-fake-001',
  fileName: 'suspicious_video.mp4',
  fileType: 'video',
  authenticityScore: 23,
  status: 'fake',
  timestamp: new Date().toISOString(),
  fileHash: 'sha256:a3f4b2c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6',
  aiExplanation: 'Our AI detected significant inconsistencies in facial movements and lighting patterns. The audio waveform does not match natural speech patterns, and temporal artifacts suggest frame manipulation. This content shows clear signs of synthetic generation or deepfake technology.',
  detectedSignals: [
    'Unnatural facial muscle movements detected',
    'Audio-visual synchronization mismatch (92% confidence)',
    'Lighting inconsistencies across frames',
    'Digital manipulation artifacts in frame 47-203',
    'Synthetic voice pattern detected',
    'Temporal coherence violations'
  ],
  confidenceLevel: 94
};

export const DEMO_REAL: AnalysisResult = {
  id: 'demo-real-001',
  fileName: 'authentic_image.jpg',
  fileType: 'image',
  authenticityScore: 96,
  status: 'safe',
  timestamp: new Date().toISOString(),
  fileHash: 'sha256:z6y7x8w9v0u1t2s3r4q5p6o7n8m9l0k1j2i3h4g5f6e7d8c9b2a3f4',
  aiExplanation: 'Analysis shows this media is authentic. Natural lighting patterns, consistent EXIF metadata, no signs of digital manipulation detected. Facial features show natural micro-expressions and skin texture. Audio patterns match expected human speech characteristics.',
  detectedSignals: [
    'Original EXIF metadata intact and verified',
    'Natural lighting distribution confirmed',
    'No manipulation artifacts detected',
    'Consistent compression patterns',
    'Authentic color grading',
    'Natural texture and grain structure'
  ],
  confidenceLevel: 96
};

export const scanningMessages = [
  'Initializing AI models...',
  'Checking facial consistency...',
  'Analyzing audio patterns...',
  'Detecting manipulation artifacts...',
  'Comparing with verified sources...',
  'Examining metadata integrity...',
  'Analyzing temporal coherence...',
  'Verifying lighting patterns...',
  'Scanning for synthetic markers...',
  'Finalizing authenticity report...'
];
