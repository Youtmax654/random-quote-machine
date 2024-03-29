"use client";

import { useEffect, useState } from "react"; // Import the useState hook
import { FaCopy, FaQuoteLeft } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Home() {
  const [quoteContent, setQuoteContent] = useState(""); // Initialize quoteContent state
  const [tweet, setTweet] = useState(""); // Initialize tweet state
  const [author, setAuthor] = useState(""); // Initialize author state
  const [color, setColor] = useState(""); // Initialize color state

  function getQuote() {
    setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.quotable.io/random");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const quote = JSON.parse(xhr.responseText);
        setQuoteContent(quote.content); // Update quoteContent state
        setAuthor(quote.author); // Update author state
        setTweet(
          quoteContent.replaceAll(" ", "%20") + "%0A" + "(" + quote.author + ")"
        );
      }
    };
    xhr.send();
  }

  const writeIntoClipboard = () => {
    navigator.clipboard.writeText(quoteContent + " - " + author);
    toast.success("Quote copied to clipboard", { position: "top-center" });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      className="h-full duration-[2s] flex-col flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <div
        id="quote-box"
        className="bg-white w-[600px] rounded-xl flex flex-col p-4"
      >
        <div className="flex flex-row">
          <FaQuoteLeft className="duration-[2s]" size={28} color={color} />
          <h1
            id="text"
            className="text-xl duration-[2s] ml-2"
            style={{ color: color }}
          >
            {quoteContent}
          </h1>
        </div>
        <h2
          id="author"
          className="duration-[2s] flex flex-row-reverse"
          style={{ color: color }}
        >
          - {author}
        </h2>
        <div className="flex flex-row-reverse justify-between mt-4">
          <button
            onClick={() => getQuote()}
            id="new-quote"
            className="text-white p-2 rounded-md duration-[2s] max-w-fit"
            style={{ backgroundColor: color }}
          >
            New Quote
          </button>
          <div className="flex gap-2">
            <FaCopy
              className="duration-[2s] cursor-pointer"
              size={28}
              color={color}
              onClick={writeIntoClipboard}
            />
            <a
              id="tweet-quote"
              href={"https://twitter.com/intent/tweet?text=" + tweet}
              className="max-w-fit block"
              target="_blank"
            >
              <FaSquareXTwitter
                className="duration-[2s]"
                size={28}
                color={color}
              />
            </a>
          </div>
        </div>
      </div>
      <h1 className="p-4 text-white font-bold">Made by Maxime Penn</h1>
    </div>
  );
}
