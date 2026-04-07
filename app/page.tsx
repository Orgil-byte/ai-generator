"use client";

import { useState } from "react";
import { aiApi } from "./_utils/aiApi";

const Home = () => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const message = await aiApi();
    setMessage(message);
  };

  handleClick();
  return <div>message: {message}</div>;
};

export default Home;
