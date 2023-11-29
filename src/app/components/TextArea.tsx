import React, { useEffect, useRef } from "react";

interface TextAreaProps {
  setFileData: (arg: string) => void;
  fileData: string;
}
const TextArea = ({ setFileData, fileData }: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (fileData !== ref.current?.value) {
      ref.current!.value = fileData;
    }
  }, [fileData]);

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

  return (
    <div className="me-1 w-1/2">
      <textarea
        id="editor"
        ref={ref}
        className="resize-both m-2 h-full w-full border border-black bg-slate-400 p-2 text-slate-50 focus:outline-none"
        cols={30}
        rows={30}
        onKeyDown={handleTab}
        onChange={(e) => setFileData(e.target.value)}
        defaultValue={fileData}
      />
    </div>
  );
};

export default TextArea;
