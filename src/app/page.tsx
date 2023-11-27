"use client";
import { useEffect, useRef, useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import Hamburger from "@/app/components/Hamburger";

export default function Home() {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!inputFileRef.current?.files) {
  //     throw new Error("No file selected");
  //   }
  //
  //   const file = inputFileRef.current.files[0];
  //
  //   const newBlob = await upload(file.name, file, {
  //     access: "public",
  //     handleUploadUrl: "/api/upload",
  //   });
  //
  //   setBlob(newBlob);
  // };

  //TODO: Loading state on save button
  //TODO: Save button should be disabled if no changes have been made

  const reqBody = {
    Filename: "test1",
    File_data: text,
  };

  return (
    <>
      <Hamburger setText={setText} />
      {/*<Title />*/}
      {/*{blob && (*/}
      {/*  <div>*/}
      {/*    Blob url: <a href={blob.url}>{blob.url}</a>*/}
      {/*  </div>*/}
      {/*)}*/}
      <form
        onSubmit={async () => {
          await fetch("api/hooks/useUploadData/", {
            method: "POST",
            body: JSON.stringify(reqBody),
          });
        }}
      >
        <input name="file" type="file" ref={inputFileRef} />
        <button type="submit">Submit</button>
      </form>

      {/*<div className="bg-slate-600 ps-2 pt-2">*/}
      {/*  <Toolbar selectedText={selectedText} setText={setText} text={text} />{" "}*/}
      {/*</div>*/}
      {/*<div className="flex h-screen flex-row bg-slate-600">*/}
      <TextArea setText={setText} text={text} />
      {/*  <MarkdownArea text={text} />*/}
      {/*</div>*/}
    </>
  );
}
