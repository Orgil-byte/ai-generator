import { MessageCircle } from "lucide-react";

export const MessengerButton = () => {
  return (
    <a
      href="https://gemini.google.com/app"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-full shadow-lg"
    >
      <MessageCircle className="w-4 h-4" />
    </a>
  );
};
