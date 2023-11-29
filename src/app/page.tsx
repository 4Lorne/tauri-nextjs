"use client";
import { useEffect, useRef, useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";
import { PutBlobResult } from "@vercel/blob";
import HamburgerButton from "@/app/components/Buttons/HamburgerButton";
import { TextFile } from "@/app/types/TextFile";

export default function Home() {
  const [fileData, setFileData] = useState("");
  const [filename, setFilename] = useState("");
  const [fileID, setFileID] = useState(0);
  const [newFilename, setNewFilename] = useState("");
  const [fileList, setFileList] = useState<TextFile[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <HamburgerButton
        setFileData={setFileData}
        setFileName={setFilename}
        setFileID={setFileID}
        setFileList={setFileList}
        fileList={fileList}
      />
      {/*<Title />*/}
      {/*<form*/}
      {/*  onSubmit={async () => {*/}
      {/*    await fetch("api/hooks/useUploadData/", {*/}
      {/*      method: "POST",*/}
      {/*      body: JSON.stringify(reqBody),*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <input name="file" type="file" ref={inputFileRef} />*/}
      {/*  <button type="submit">Submit</button>*/}
      {/*</form>*/}

      {/*<div className="bg-slate-600 ps-2 pt-2">*/}
      {/*  <Toolbar selectedText={selectedText} setText={setText} text={text} />{" "}*/}
      {/*</div>*/}

      {filename && (
        <>
          <div className={"ml-2 mt-2"}></div>
          <div className="flex h-screen flex-row bg-slate-600">
            <TextArea
              setFileData={setFileData}
              fileData={fileData}
              filename={filename}
              setNewFilename={setNewFilename}
              newFilename={newFilename}
              fileID={fileID}
              setFileList={setFileList}
              setFilename={setFilename}
            />
            <MarkdownArea fileData={fileData} />
          </div>
        </>
      )}
    </>
  );
}
