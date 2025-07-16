import React, { useEffect, useState, useMemo } from "react";

const Typewriter = () => {
  const fixedText = "Your Partner in progress through ";

  const languages = useMemo(() => [
    "मराठी",
    "हिन्दी",
    "বাংলা",
    "ગુજરાતી",
    "தமிழ்",
    "اُردُو‎",
    "all Indian languages"
  ], []);

  const [displayedText, setDisplayedText] = useState("");
  const [langIndex, setLangIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = languages[langIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 120);
    } else if (!isDeleting && charIndex > currentWord.length) {
      // Stop animation if it's the final word
      if (currentWord === "all Indian languages") {
        return;
      }
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setCharIndex((prev) => prev - 1);
      }, 800);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 80);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setLangIndex((prev) => prev + 1);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, langIndex, languages]);

  return (
    <div>
    <h1 className="oxygen-bold text-3xl md:text-5xl font-bold text-center text-gray-800">
      {fixedText}
      {/* <span className="text-purple-600">
        {displayedText}
        <span className="animate-pulse inline-block w-[1ch]">|</span>
      </span> */}
    </h1>
    <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mt-5 oxygen-regular">
      <span className="text-orange-900 font-oxygen">
        {displayedText}
        <span className="animate-pulse inline-block w-[1ch]">|</span>
      </span>
    </h1>
    </div>
  );
};

export default Typewriter;
