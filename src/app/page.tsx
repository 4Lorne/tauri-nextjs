"use client";

import Link from "next/link";
import { useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";

export default function Home() {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  console.log(text);
  // DOMPurify.sanitize(testing);
  return (
    <>
      <Title />
      <div className="bg-slate-600 ps-2 pt-2">
        <Toolbar selectedText={selectedText} setText={setText} text={text} />{" "}
      </div>
      <div className="flex h-screen flex-row bg-slate-600">
        <TextArea setText={setText} />
        <MarkdownArea text={text} />
      </div>
    </>
  );
}
