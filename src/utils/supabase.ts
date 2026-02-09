import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function callAnalyzeFunction(fileName: string, fileType: string, fileHash: string) {
  const apiUrl = `${supabaseUrl}/functions/v1/analyze`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName,
      fileType,
      fileHash,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze file');
  }

  return response.json();
}

export async function getReportByToken(token: string) {
  const apiUrl = `${supabaseUrl}/functions/v1/report?id=${encodeURIComponent(token)}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json();
}

export async function saveAnalysis(analysis: any) {
  const { data, error } = await supabase
    .from('analyses')
    .insert([
      {
        file_name: analysis.fileName,
        file_type: analysis.fileType,
        file_hash: analysis.fileHash,
        authenticity_score: analysis.authenticityScore,
        status: analysis.status,
        ai_explanation: analysis.aiExplanation,
        detected_signals: analysis.detectedSignals,
        confidence_level: analysis.confidenceLevel,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createPublicReport(analysisId: string) {
  const shareToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const { data, error } = await supabase
    .from('public_reports')
    .insert([
      {
        analysis_id: analysisId,
        share_token: shareToken,
      },
    ])
    .select()
    .maybeSingle();

  if (error) throw error;
  return { ...data, shareToken };
}
