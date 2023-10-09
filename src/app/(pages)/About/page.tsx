"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ReactMarkdown from "react-markdown";

const TextArea = ({
  setText,
}: {
  setText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <textarea
        id="editor"
        className="text-black"
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

const About = () => {
  const [text, setText] = useState("");
  console.log(text);

  return (
    <div className="flex-end flex">
      <TextArea setText={setText} />
      <ReactMarkdown className={"prose bg-red-500 text-red-200"}>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default About;
