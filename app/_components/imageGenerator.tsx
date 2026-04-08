import { Dispatch, SetStateAction, useState } from "react";
import { Sparkles, Image, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type FoodImageCreatorProps = {
  setPrompt: Dispatch<SetStateAction<string>>;
  prompt: string;
  fetchImage: () => Promise<void>;
};

export const FoodImageCreator = ({
  setPrompt,
  prompt,
  fetchImage,
}: FoodImageCreatorProps) => {
  const [result, setResult] = useState<{
    title: string;
    imageUrl: string;
  } | null>(null);

  const handleReset = () => {
    setPrompt("");
    setResult(null);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Food image creator</h1>
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
          What food image do you want? Describe it briefly.
        </p>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your food..."
          className="min-h-35 resize-none text-base leading-relaxed"
        />
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={fetchImage}
            className="px-6 cursor-pointer hover:bg-black hover:text-white hover:border-white transition-colors"
          >
            Generate
          </Button>
        </div>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Result</h2>
          </div>
          <Card className="rounded-xl border border-border">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-medium">{result.title}</p>
              <img
                src={result.imageUrl}
                alt={result.title}
                className="w-full max-w-sm rounded-lg object-cover"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
