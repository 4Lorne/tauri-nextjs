import React, { useEffect, useRef } from "react";
import { ENDPOINTS } from "@/app/api/endpoints";
import { fetchData } from "@/app/components/Buttons/HamburgerButton";
import { TextFile } from "@/app/types/TextFile";

interface TextAreaProps {
  setFileData: (arg: string) => void;
  fileData: string;
  filename: string;
  setFilename: (arg: string) => void;
  setNewFilename: (arg: string) => void;
  setFileList: (
    value: ((prevState: TextFile[]) => TextFile[]) | TextFile[],
  ) => void;
  newFilename: string;
  fileID: number;
}
const TextArea = ({
  setFileData,
  fileData,
  filename,
  setNewFilename,
  setFileList,
  setFilename,
  newFilename,
  fileID,
}: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (fileData !== ref.current?.value) {
      ref.current!.value = fileData;
    }
    if (filename !== ref.current?.value) {
      inputRef.current!.value = filename;
    }
  }, [fileData, filename]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.currentTarget;
      const newValue =
        value.substring(0, selectionStart) +
        "\u0009" +
        value.substring(selectionEnd);
      e.currentTarget.value = newValue;
      setFileData(newValue);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        selectionStart + 4;
    }
  };

  const saveData = async () => {
    const requestBody = {
      id: fileID,
      filename: filename,
      new_filename: newFilename,
      file_data: fileData,
    };

    await fetch(ENDPOINTS.PUT_DATA, {
      method: "PUT",
      body: JSON.stringify(requestBody),
    });

    fetchData(setFileList);
    setFileData(fileData);
    setFilename(newFilename);
  };

  return (
    <div className="me-1 w-1/2">
      <input
        defaultValue={filename}
        ref={inputRef}
        onChange={(e) => setNewFilename(e.target.value)}
        onBlur={saveData}
      />
      <textarea
        id="editor"
        ref={ref}
        className="resize-both m-2 h-full w-full border border-black bg-slate-400 p-2 text-slate-50 focus:outline-none"
        cols={30}
        rows={30}
        onKeyDown={handleTab}
        onChange={(e) => setFileData(e.target.value)}
        defaultValue={fileData}
        onBlur={saveData}
      ></textarea>
    </div>
  );
};

export default TextArea;
