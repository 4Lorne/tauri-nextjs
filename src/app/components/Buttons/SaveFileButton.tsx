import { ENDPOINTS } from "@/app/api/endpoints";

interface SaveFileButtonProps {
  filename: string;
  newFilename: string;
  fileData: string;
}

export const SaveFileButton = ({
  filename,
  fileData,
  newFilename,
}: SaveFileButtonProps) => {
  const requestBody = {
    filename: filename,
    new_filename: newFilename,
    file_data: fileData,
  };

  return (
    <button
      className={"px-2 py-2 hover:bg-slate-500"}
      onClick={() => {
        fetch(ENDPOINTS.PUT_DATA, {
          method: "PUT",
          body: JSON.stringify(requestBody),
        }).then((r) => console.log(r.text()));
      }}
    >
      <label>Save</label>
    </button>
  );
};
