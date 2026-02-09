/*
  # Create Analysis and Reports Tables
  
  1. New Tables
    - `analyses` - Stores analysis results for uploaded media
      - `id` (uuid, primary key)
      - `file_name` (text)
      - `file_type` (text: image, video, audio, text, url)
      - `file_hash` (text, SHA-256)
      - `authenticity_score` (integer, 0-100)
      - `status` (text: safe, suspicious, fake)
      - `ai_explanation` (text)
      - `detected_signals` (jsonb, array of strings)
      - `confidence_level` (integer, 0-100)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `public_reports` - Shareable verification reports
      - `id` (uuid, primary key)
      - `analysis_id` (uuid, foreign key)
      - `share_token` (text, unique)
      - `view_count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only view their own analyses
    - Public reports are accessible via share token
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_hash text NOT NULL,
  authenticity_score integer NOT NULL CHECK (authenticity_score >= 0 AND authenticity_score <= 100),
  status text NOT NULL CHECK (status IN ('safe', 'suspicious', 'fake')),
  ai_explanation text NOT NULL,
  detected_signals jsonb NOT NULL DEFAULT '[]',
  confidence_level integer NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 100),
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  share_token text UNIQUE NOT NULL,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_public_reports_share_token ON public_reports(share_token);
CREATE INDEX IF NOT EXISTS idx_public_reports_analysis_id ON public_reports(analysis_id);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses"
  ON analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create analyses"
  ON analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public reports are viewable by share token"
  ON public_reports FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view public reports"
  ON public_reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reports for their analyses"
  ON public_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = analysis_id
      AND analyses.user_id = auth.uid()
    )
  );
