import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const TextArea = ({
  setText,
  text,
}: {
  setText: Dispatch<SetStateAction<string>>;
  text: string;
}) => {
  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.currentTarget;
      const newValue =
        value.substring(0, selectionStart) +
        "\u0009" +
        value.substring(selectionEnd);
      e.currentTarget.value = newValue;
      setText(newValue);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        selectionStart + 4;
    }
  };

  return (
    <div className="me-1 w-1/2">
      <textarea
        id="editor"
        className="resize-both m-2 h-full w-full border border-black bg-slate-400 p-2 text-slate-50 focus:outline-none"
        cols={30}
        rows={30}
        onKeyDown={handleTab}
        onChange={(e) => setText(e.target.value)}
        defaultValue={text}
      />
    </div>
  );
};

export default TextArea;
