"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sparkles, FileText, RefreshCw, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatCompletionOutputMessage } from "@huggingface/tasks";

type ImageAnalysisProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  analyzeImage: () => Promise<void>;
  result: ChatCompletionOutputMessage | null;
  setResult: Dispatch<SetStateAction<ChatCompletionOutputMessage | null>>;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  loadingAnalyze: boolean;
};

export const ImageAnalysis = ({
  file,
  setFile,
  analyzeImage,
  result,
  setResult,
  preview,
  setPreview,
  loadingAnalyze,
}: ImageAnalysisProps) => {
  const handleReset = () => {
    setResult(null);
    setFile(null);
    setPreview("");
  };

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);

      setPreview(url);
    }
  }, [file]);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Image analysis</h1>
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={handleReset}
          className="bg-black text-white hover:bg-neutral-800 rounded-lg"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Upload a food photo, and AI will detect the items.
        </p>
        <div>
          {preview === "" ? (
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border border-input rounded-lg px-4 py-2 text-sm text-muted-foreground cursor-pointer file:mr-3 file:font-medium file:text-foreground file:bg-transparent file:border-0 file:cursor-pointer"
            />
          ) : (
            <img src={preview} alt="Image" className="object-cover" />
          )}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={analyzeImage}
            className="px-6 cursor-pointer hover:bg-black hover:text-white hover:border-white transition-colors"
          >
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {loadingAnalyze ? (
          <div className="w-full flex justify-center">
            I am analyzing the image...
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Here is the summary</h2>
          </div>
        )}
        {result ? (
          <Card className="rounded-xl border border-zinc-400">
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">{result?.content}</p>
            </CardContent>
          </Card>
        ) : !loadingAnalyze ? (
          <p className="text-sm text-muted-foreground">
            First, enter your image to recognize an items.
          </p>
        ) : null}
      </div>
    </div>
  );
};
