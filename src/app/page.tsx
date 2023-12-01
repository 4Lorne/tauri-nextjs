"use client";
import { useState } from "react";
import MarkdownArea from "./components/MarkdownArea";
import TextArea from "./components/TextArea";
import Title from "./components/Title";
import HamburgerButton from "@/app/components/Buttons/HamburgerButton";
import { TextFile } from "@/app/types/TextFile";

export default function Home() {
  const [fileData, setFileData] = useState("");
  const [filename, setFilename] = useState("");
  const [fileID, setFileID] = useState(0);
  const [newFilename, setNewFilename] = useState("");
  const [fileList, setFileList] = useState<TextFile[]>([]);

  return (
    <>
      <Title />
      <HamburgerButton
        setFileData={setFileData}
        setFilename={setFilename}
        setFileID={setFileID}
        setFileList={setFileList}
        fileList={fileList}
        fileID={fileID}
        filename={filename}
        fileData={fileData}
        newFilename={newFilename}
        setNewFilename={setNewFilename}
      />
      <div className="flex h-screen flex-row bg-slate-600">
        <TextArea
          setFileData={setFileData}
          fileData={fileData}
          filename={filename}
          newFilename={newFilename}
          fileID={fileID}
          setFileList={setFileList}
        />
        <MarkdownArea fileData={fileData} />
      </div>
    </>
  );
}
