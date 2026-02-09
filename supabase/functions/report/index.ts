import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ReportResponse {
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "GET") {
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

    const url = new URL(req.url);
    const reportId = url.searchParams.get("id");

    if (!reportId) {
      return new Response(
        JSON.stringify({ error: "Report ID is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: report, error: reportError } = await supabase
      .from("public_reports")
      .select("analysis_id")
      .eq("share_token", reportId)
      .maybeSingle();

    if (reportError || !report) {
      return new Response(
        JSON.stringify({ error: "Report not found" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data: analysis, error: analysisError } = await supabase
      .from("analyses")
      .select("*")
      .eq("id", report.analysis_id)
      .maybeSingle();

    if (analysisError || !analysis) {
      return new Response(
        JSON.stringify({ error: "Analysis not found" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await supabase
      .from("public_reports")
      .update({ view_count: (report as any).view_count + 1 })
      .eq("share_token", reportId);

    const response: ReportResponse = {
      id: analysis.id,
      fileName: analysis.file_name,
      fileType: analysis.file_type,
      fileHash: analysis.file_hash,
      authenticityScore: analysis.authenticity_score,
      status: analysis.status,
      timestamp: analysis.created_at,
      aiExplanation: analysis.ai_explanation,
      detectedSignals: analysis.detected_signals,
      confidenceLevel: analysis.confidence_level,
    };

    return new Response(JSON.stringify(response), {
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
