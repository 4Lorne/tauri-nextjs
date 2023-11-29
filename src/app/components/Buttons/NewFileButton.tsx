import { ENDPOINTS } from "@/app/api/endpoints";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export const NewFileButton = () => {
  const defaultFile = {
    filename: "Untitled",
    file_data: "",
  };

  return (
    <button
      className={"px-2 py-2 hover:bg-slate-500"}
      onClick={async () => {
        await fetch(ENDPOINTS.POST_DATA, {
          method: "POST",
          body: JSON.stringify(defaultFile),
        });
      }}
    >
      <PencilSquareIcon
        className={"h-6 w-6 text-slate-50 hover:text-slate-100"}
      />
    </button>
  );
};
