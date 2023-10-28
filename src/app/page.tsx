"use client";
import { useRef, useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

export default function Home() {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  console.log(blob);
  return (
    <>
      <Title />
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });

          setBlob(newBlob);
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
