import React, { useEffect, useRef } from "react";
import { ENDPOINTS } from "@/app/api/endpoints";
import { fetchData } from "@/app/components/Buttons/HamburgerButton";
import { TextFile } from "@/app/types/TextFile";

interface FilenameInputProps {
  filename: string;
  setNewFilename: (arg: string) => void;
  fileID: number;
  newFilename: string;
  fileData: string;
  setFilename: (arg: string) => void;
  setFileData: (arg: string) => void;
  setFileList: (
    value: ((prevState: TextFile[]) => TextFile[]) | TextFile[],
  ) => void;
}
const FilenameInput = ({
  filename,
  setNewFilename,
  fileID,
  newFilename,
  fileData,
  setFilename,
  setFileData,
  setFileList,
}: FilenameInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (filename !== inputRef.current?.value) {
      inputRef.current!.value = filename;
    }
  }, [filename]);

  const saveData = async () => {
    const requestBody = {
      id: fileID,
      filename: filename,
      new_filename: newFilename,
      file_data: fileData,
    };

    setFilename(newFilename);

    await fetch(ENDPOINTS.PUT_DATA, {
      method: "PUT",
      body: JSON.stringify(requestBody),
    });

    fetchData(setFileList);
  };

  return (
    <input
      defaultValue={filename}
      ref={inputRef}
      onChange={(e) => setNewFilename(e.target.value)}
      onBlur={saveData}
      className={"border border-black bg-slate-400 text-slate-50"}
    />
  );
};

export default FilenameInput;
