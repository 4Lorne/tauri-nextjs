import ReactMarkdown from "react-markdown";

interface MarkdownAreaProps {
  fileData: string;
}
const MarkdownArea = ({ fileData }: MarkdownAreaProps) => {
  return (
    <div className="ms-1 w-1/2">
      <div className="m-2 h-full border border-black bg-slate-400 p-2">
        <ReactMarkdown className={"prose text-slate-50"}>
          {fileData}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownArea;
