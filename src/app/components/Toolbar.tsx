import { Dispatch, SetStateAction } from "react";

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
    <>
      <span className="isolate inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-black bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus:z-10"
          onClick={() => {
            handleClick();
          }}
        >
          B
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center border border-black bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus:z-10"
        >
          I
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center border border-black bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus:z-10"
        >
          U
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center border border-black bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus:z-10"
        >
          Code
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-black bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus:z-10"
        >
          Table
        </button>
      </span>
      {/* 
      TODO: On click, use copy function of blob to update the url with the current text.
      */}
      <button
        type="button"
        className="mb-2 ml-2 mr-2 rounded-md border border-black bg-slate-100 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-slate-200 focus:outline-none"
      >
        Save Changes
      </button>
    </>
  );
};

export default Toolbar;
