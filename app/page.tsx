"use client";

import { useEffect, useState } from "react"; // Import the useState hook
import { FaQuoteLeft } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Home() {
  const [quoteContent, setQuoteContent] = useState(""); // Initialize quoteContent state
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
      }
    };
    xhr.send();
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      className="h-full duration-[2s] flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <div id="quote-box" className="bg-white w-[500px] rounded-xl">
        <FaQuoteLeft className="duration-[2s]" size={28} color={color} />
        <h1
          id="text"
          className="text-4xl duration-[2s]"
          style={{ color: color }}
        >
          {quoteContent}
        </h1>
        <h2
          id="author"
          className="text-2xl duration-[2s]"
          style={{ color: color }}
        >
          - {author}
        </h2>
        <button
          onClick={() => getQuote()}
          id="new-quote"
          className="text-white p-2 rounded-md duration-[2s]"
          style={{ backgroundColor: color }}
        >
          New Quote
        </button>
        <a id="tweet-quote" href="https://twitter.com/intent/tweet">
          <FaSquareXTwitter className="duration-[2s]" size={28} color={color} />
        </a>
      </div>
    </div>
  );
}
