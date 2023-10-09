"use client";
import { marked } from "marked";
import { Dispatch, SetStateAction, useState } from "react";
import ReactMarkdown from "react-markdown";

const Title = () => {
  return (
    <div className="flex select-none flex-col items-center bg-slate-500">
      <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">
        LDMD
      </h2>
      <p className="mt-6 text-lg leading-8 text-slate-100">
        Markdown editor in progress.
      </p>
    </div>
  );
};
/* TODO
Auto add bullet when previous line uses bullet
Highlight and auto wrap text in bold, italics, etc when selected
Enter adds newline
Adding new colors to the tailwind typography plugin
Add a toolbar for markdown
Bug: Tab is adding codeblock when there isn't anything else
*/
const TextArea = ({
  setText,
}: {
  setText: Dispatch<SetStateAction<string>>;
}) => {
  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.currentTarget;
      // Takes the value before the caret and after the caret and combines them with 4 spaces in between
      const newValue =
        value.substring(0, selectionStart) +
        "    " +
        value.substring(selectionEnd);
      e.currentTarget.value = newValue;
      setText(newValue);
      // Set the caret position after the inserted spaces
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        selectionStart + 4;
    }
  };

  return (
    <>
      <textarea
        id="editor"
        className="resize-both m-2 border border-black bg-slate-400 p-2 text-slate-50 focus:outline-none"
        cols={screen.width / 9}
        rows={30}
        onKeyDown={handleTab}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

const Markdown = ({ text }: { text: string }) => {
  return (
    <div className="m-2 w-full border border-black bg-slate-400 p-2">
      <ReactMarkdown className={"prose text-slate-50"}>{text}</ReactMarkdown>
    </div>
  );
};

const About = () => {
  const [text, setText] = useState("");
  console.log(text);
  const testing = marked.parse(text);
  // DOMPurify.sanitize(testing);
  return (
    <>
      <Title />
      <div className="flex flex-row bg-slate-600">
        <TextArea setText={setText} />
        <Markdown text={text} />
      </div>
    </>
  );
};

export default About;
