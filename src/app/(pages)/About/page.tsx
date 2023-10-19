"use client";
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

const Toolbar = ({
  selectedText,
  setText,
  text,
}: {
  selectedText: string;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
}) => {
  const handleClick = () => {
    if (selectedText) {
      const modifiedText = `**${selectedText}**`;
      const newText = text.replace(selectedText, modifiedText);
      setText(newText);
      console.log(newText);
    }
  };

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        onClick={() => {
          handleClick();
        }}
      >
        B
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        I
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        U
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Code
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Table
      </button>
    </span>
  );
};

const BoldText = (selectedText: string) => {
  return `**${selectedText}**`;
};

/* TODO
Auto add bullet when previous line uses bullet
Highlight and auto wrap text in bold, italics, etc when selected
Enter adds newline - need to add 2 spaces to add newline
Adding new colors to the tailwind typography plugin
Add a toolbar for markdown
Add split pane
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
        "\u0009" +
        value.substring(selectionEnd);
      e.currentTarget.value = newValue;
      setText(newValue);
      // Set the caret position after the inserted spaces
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
        selectionStart + 4;
    }
  };

  return (
    <div className="me-1 w-1/2">
      <textarea
        id="editor"
        className="resize-both m-2 h-full w-full border border-black bg-slate-400 p-2 text-slate-50 focus:outline-none"
        cols={window.screen.width / 9}
        rows={30}
        onKeyDown={handleTab}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const Markdown = ({ text }: { text: string }) => {
  return (
    <div className="ms-1 w-1/2">
      <div className="m-2 h-full border border-black bg-slate-400 p-2">
        <ReactMarkdown className={"prose text-slate-50"}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

const About = () => {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  console.log(text);
  // DOMPurify.sanitize(testing);
  return (
    <>
      <Title />
      <div className="bg-slate-600 ps-2 pt-2">
        <Toolbar selectedText={selectedText} setText={setText} text={text} />{" "}
      </div>
      <div className="flex h-screen flex-row bg-slate-600">
        <TextArea setText={setText} />
        <Markdown text={text} />
      </div>
    </>
  );
};

export default About;
