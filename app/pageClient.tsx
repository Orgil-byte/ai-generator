"use client";
import { useState } from "react";
import { Section } from "./_components/section";
import { FoodImageCreator } from "./_components/imageGenerator";
import { InferenceClient } from "@huggingface/inference";
import { LoaderCircle } from "lucide-react";
import { ImageAnalysis } from "./_components/imageAnalysis";

export const MainClient = () => {
  const [activeSection, setActiveSection] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>("");

  const client = new InferenceClient(process.env.NEXT_PUBLIC_API_KEY);

  const fetchImage = async () => {
    setLoading(true);
    const response = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    const imgUrl = URL.createObjectURL(response as unknown as Blob);
    setImage(imgUrl);
    setLoading(false);
  };

  const analyzeImage = async () => {};

  return (
    <div className="w-full flex justify-center">
      <div className="w-145 h-fit py-6 flex flex-col gap-6">
        <Section
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        {activeSection === "generator" ? (
          <FoodImageCreator
            setPrompt={setPrompt}
            prompt={prompt}
            fetchImage={fetchImage}
          />
        ) : activeSection === "analysis" ? (
          <ImageAnalysis
            file={file}
            setFile={setFile}
            result={result}
            setResult={setResult}
          />
        ) : null}
        {loading ? (
          <div className="w-full flex justify-center">
            <p>Wait! Image loading...</p>
            <LoaderCircle className="animate-spin" />
          </div>
        ) : image === "" ? null : (
          <img src={image} alt="image" />
        )}
      </div>
    </div>
  );
};
