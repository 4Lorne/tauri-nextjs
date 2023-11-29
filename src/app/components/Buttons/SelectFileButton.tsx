import { ENDPOINTS } from "@/app/api/endpoints";

interface SelectFileButtonProps {
  fileList: string[];
  setFileData: (arg: string) => void;
  setFileName: (arg: string) => void;
}

export const SelectFileButton = ({
  fileList,
  setFileData,
  setFileName,
}: SelectFileButtonProps) => {
  return fileList.map((file, index: number) => (
    <button
      className={"flex flex-col text-slate-50 hover:text-slate-300"}
      key={index}
      onClick={async () => {
        const response = await fetch(
          `${ENDPOINTS.GET_DATA}/?filename=${file}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const fileData = data.rows[0].file_data.data;
        setFileData(Buffer.from(fileData).toString("utf-8"));
        setFileName(file);
      }}
    >
      <label className={"hover:bg-slate-500"}>{file}</label>
    </button>
  ));
};
