import { Dispatch, SetStateAction } from "react";
import { Sparkles, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ImageAnalysisProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  //   analyzeImage: () => Promise<void>;
  result: string | null;
  setResult: Dispatch<SetStateAction<string | null>>;
};

export const ImageAnalysis = ({
  file,
  setFile,
  //   analyzeImage,
  result,
  setResult,
}: ImageAnalysisProps) => {
  const handleReset = () => {
    setFile(null);
    setResult(null);
  };

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
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full border border-input rounded-lg px-4 py-2 text-sm text-muted-foreground cursor-pointer file:mr-3 file:font-medium file:text-foreground file:bg-transparent file:border-0 file:cursor-pointer"
        />
        <div className="flex justify-end">
          <Button
            variant="outline"
            // onClick={analyzeImage}
            disabled={!file}
            className="px-6 cursor-pointer hover:bg-black hover:text-white hover:border-white transition-colors"
          >
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Here is the summary</h2>
        </div>
        {result ? (
          <Card className="rounded-xl border border-border">
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">{result}</p>
            </CardContent>
          </Card>
        ) : (
          <p className="text-sm text-muted-foreground">
            First, enter your image to recognize an items.
          </p>
        )}
      </div>
    </div>
  );
};
