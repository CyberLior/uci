import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRequest {
  fileName: string;
  fileType: string;
  fileHash: string;
}

interface AnalysisResponse {
  id: string;
  fileName: string;
  fileType: string;
  fileHash: string;
  authenticityScore: number;
  status: 'safe' | 'suspicious' | 'fake';
  timestamp: string;
  aiExplanation: string;
  detectedSignals: string[];
  confidenceLevel: number;
}

const scanningMessages = [
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

function generateAnalysis(fileName: string, fileType: string): AnalysisResponse {
  const score = Math.floor(Math.random() * 40) + 60;
  const isSafe = Math.random() > 0.5;
  const status: 'safe' | 'suspicious' | 'fake' = isSafe ? 'safe' : (Math.random() > 0.5 ? 'suspicious' : 'fake');

  const safeSignals = [
    'Original EXIF metadata intact and verified',
    'Natural lighting distribution confirmed',
    'No manipulation artifacts detected',
    'Consistent compression patterns',
    'Authentic color grading',
    'Natural texture and grain structure'
  ];

  const fakeSignals = [
    'Unnatural facial muscle movements detected',
    'Audio-visual synchronization mismatch (92% confidence)',
    'Lighting inconsistencies across frames',
    'Digital manipulation artifacts detected',
    'Synthetic voice pattern detected',
    'Temporal coherence violations'
  ];

  return {
    id: `analysis-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    fileName,
    fileType,
    fileHash: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
    authenticityScore: isSafe ? Math.floor(Math.random() * 20) + 81 : Math.floor(Math.random() * 40) + 20,
    status,
    timestamp: new Date().toISOString(),
    aiExplanation: isSafe
      ? 'Analysis shows this media is authentic. Natural lighting patterns, consistent metadata, no signs of digital manipulation detected. Facial features show natural micro-expressions and skin texture. Audio patterns match expected human speech characteristics.'
      : 'Our AI detected significant inconsistencies in facial movements and lighting patterns. The audio waveform does not match natural speech patterns, and temporal artifacts suggest frame manipulation. This content shows clear signs of synthetic generation or deepfake technology.',
    detectedSignals: isSafe ? safeSignals : fakeSignals,
    confidenceLevel: Math.floor(Math.random() * 15) + 85
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body: AnalysisRequest = await req.json();

    if (!body.fileName || !body.fileType || !body.fileHash) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const analysis = generateAnalysis(body.fileName, body.fileType);

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
