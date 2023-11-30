import { ENDPOINTS } from "@/app/api/endpoints";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

interface NewFileButtonProps {
  onFileCreation: (arg: any) => void;
}
export const NewFileButton = ({ onFileCreation }: NewFileButtonProps) => {
  const defaultFile = {
    filename: "Untitled" + Math.floor(Math.random() * 1000),
    file_data: "",
  };

  return (
    <button
      className={"px-2 py-2 hover:bg-slate-500"}
      onClick={async () => {
        const response = await fetch(ENDPOINTS.POST_DATA, {
          method: "POST",
          body: JSON.stringify(defaultFile),
        });
        const createdFile = await response.json();

        onFileCreation(createdFile);
      }}
    >
      <PencilSquareIcon
        className={"h-6 w-6 text-slate-50 hover:text-slate-100"}
      />
    </button>
  );
};
