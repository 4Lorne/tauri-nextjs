"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";
import { PutBlobResult } from "@vercel/blob";
import useFetch from "./middleware/useFetch";

export default function Home() {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // useFetch(formData);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result: PutBlobResult = await response.json();
        console.log(result); // Handle the response data as needed
      } else {
        console.error("Failed to upload the file");
      }
    } catch (error) {
      console.error("An error occurred while processing the request:", error);
    }
  };
  return (
    <>
      <Title />
      <form
        method="POST"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input name="file" type="file" ref={inputFileRef} required />
        <button type="submit">Submit</button>
      </form>

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
