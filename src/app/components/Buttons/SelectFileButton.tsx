import { ENDPOINTS } from "@/app/api/endpoints";

interface SelectFileButtonProps {
  fileList: {
    id: number;
    filename: string;
    file_data: { type: string; data: number[] };
  }[];
  setFileData: (arg: string) => void;
  setFileName: (arg: string) => void;
}

export const SelectFileButton = ({
  fileList,
  setFileData,
  setFileName,
}: SelectFileButtonProps) => {
  return fileList.map((file, index) => (
    <button
      className={"flex flex-col text-slate-50 hover:text-slate-300"}
      key={index}
      onClick={async () => {
        const response = await fetch(
          `${ENDPOINTS.GET_DATA}/?filename=${file.filename}&id=${file.id}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const fileData = data.rows[0].file_data?.data || [];
        setFileData(Buffer.from(fileData).toString("utf-8"));
        setFileName(file.filename);
      }}
    >
      <label className={"hover:bg-slate-500"}>{file.filename}</label>
    </button>
  ));
};
