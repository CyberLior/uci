import { Upload, FileVideo, FileAudio, FileImage, FileText, Link } from 'lucide-react';
import { useState, useCallback } from 'react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300
          ${isDragging
            ? 'border-cyan-400 bg-cyan-950/30 scale-105'
            : 'border-gray-700 bg-gray-900/50 hover:border-cyan-500/50 hover:bg-gray-900/70'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileInput}
          accept="image/*,video/*,audio/*,.txt"
        />

        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
              <Upload className="w-16 h-16 text-cyan-400 relative z-10" strokeWidth={1.5} />
            </div>

            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-white">
                Drop your media here or click to upload
              </p>
              <p className="text-gray-400">
                Supports images, videos, audio files, text, and URLs
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FileImage className="w-4 h-4" />
                <span>Image</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FileVideo className="w-4 h-4" />
                <span>Video</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FileAudio className="w-4 h-4" />
                <span>Audio</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FileText className="w-4 h-4" />
                <span>Text</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Link className="w-4 h-4" />
                <span>URL</span>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
