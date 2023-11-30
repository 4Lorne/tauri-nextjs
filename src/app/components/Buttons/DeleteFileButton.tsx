import { TrashIcon } from "@heroicons/react/20/solid";

interface DeleteFileButtonProps {
  id: number;
}
export const DeleteFileButton = ({ id }: DeleteFileButtonProps) => {
  const requestBody = {
    id: id,
  };

  return (
    <button
      className={"px-2 py-2 hover:bg-slate-500"}
      onClick={() => {
        fetch(`/api/hooks/useDeleteData/?id=${id}`, {
          method: "DELETE",
          body: JSON.stringify(requestBody),
        }).then((r) => console.log(r.text()));
      }}
    >
      <TrashIcon className={"h-6 w-6 text-slate-50 hover:text-slate-100"} />
    </button>
  );
};
