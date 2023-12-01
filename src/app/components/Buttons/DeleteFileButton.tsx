import { TrashIcon } from "@heroicons/react/20/solid";
import { ENDPOINTS } from "@/app/api/endpoints";

interface DeleteFileButtonProps {
  id: number;
  onFileDeletion: (arg: any) => void;
}
export const DeleteFileButton = ({
  id,
  onFileDeletion,
}: DeleteFileButtonProps) => {
  const requestBody = {
    id: id,
  };

  return (
    <button
      className={"px-2 py-2 hover:bg-slate-500"}
      onClick={async () => {
        const response = fetch(`${ENDPOINTS.DELETE_DATA}/?id=${id}`, {
          method: "DELETE",
          body: JSON.stringify(requestBody),
        });

        const deletedFile = await response;
        onFileDeletion(deletedFile);
        console.log(deletedFile);
      }}
    >
      <TrashIcon className={"h-6 w-6 text-slate-50 hover:text-slate-100"} />
    </button>
  );
};
