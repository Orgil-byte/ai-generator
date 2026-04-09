"use client";
import { useState } from "react";
import { Section } from "./_components/section";
import { FoodImageCreator } from "./_components/imageGenerator";
import { InferenceClient } from "@huggingface/inference";
import { LoaderCircle } from "lucide-react";
import { ImageAnalysis } from "./_components/imageAnalysis";
import { ChatCompletionOutputMessage } from "@huggingface/tasks";

export const MainClient = () => {
  const [activeSection, setActiveSection] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ChatCompletionOutputMessage | null>(
    null,
  );
  const [preview, setPreview] = useState("");
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);

  const client = new InferenceClient(process.env.NEXT_PUBLIC_API_KEY);

  const analyzeImage = async () => {
    setLoadingAnalyze(true);
    if (!file) return;

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const chatCompletion = await client.chatCompletion({
      model: "moonshotai/Kimi-K2.5:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image, tell me all the items you see and if there is any food tell me every ingredients there.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64,
              },
            },
          ],
        },
      ],
    });

    const aiAnswer = chatCompletion.choices[0].message;
    setResult(aiAnswer);
    setLoadingAnalyze(false);
  };

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
            preview={preview}
            setPreview={setPreview}
            analyzeImage={analyzeImage}
            loadingAnalyze={loadingAnalyze}
          />
        ) : null}
        {activeSection === "generator" ? (
          loading ? (
            <div className="w-full flex justify-center">
              <p>Wait! Image loading...</p>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : image === "" ? null : (
            <img src={image} alt="image" />
          )
        ) : null}
      </div>
    </div>
  );
};
