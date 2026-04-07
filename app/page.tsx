"use client";

import { useState } from "react";
import { aiApi } from "./_utils/aiApi";

const Home = () => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const msg = await aiApi();
      setMessage(msg);
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-40 gap-20">
      <p className="text-2xl">message: {message}</p>
      <button
        onClick={handleClick}
        className="bg-black text-white p-4 rounded-md"
      >
        see results
      </button>
    </div>
  );
};

export default Home;
