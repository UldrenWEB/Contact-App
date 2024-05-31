import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const TypingText = ({ text = "", typingDelay = 100, style }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Limpia el texto antes de comenzar a escribir
    let i = 0;
    const timerId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevText) => prevText + text[i]);
        i++;
      } else {
        clearInterval(timerId);
      }
    }, typingDelay);

    return () => clearInterval(timerId);
  }, [text, typingDelay]);

  return <Text style={style}>{displayedText}</Text>;
};

export default TypingText;
