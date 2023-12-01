import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/app/api/endpoints";
import { useToggle } from "usehooks-ts";
import { ShowButtons } from "@/app/components/Buttons/ShowButtons";
import { ShowFilesButton } from "@/app/components/Buttons/ShowFilesButton";
import { NewFileButton } from "@/app/components/Buttons/NewFileButton";
import { SelectFileButton } from "@/app/components/Buttons/SelectFileButton";
import { TextFile } from "@/app/types/TextFile";
import { DeleteFileButton } from "@/app/components/Buttons/DeleteFileButton";
import FilenameInput from "@/app/components/FilenameInput";

interface HamburgerProps {
  setFileData: (arg: string) => void;
  setFilename: (arg: string) => void;
  setFileID: (arg: number) => void;
  setFileList: (
    value: ((prevState: TextFile[]) => TextFile[]) | TextFile[],
  ) => void;
  fileList: TextFile[];
  fileID: number;
  filename: string;
  fileData: string;
  newFilename: string;
  setNewFilename: (arg: string) => void;
}

export const fetchData = async (setFileList: (data: TextFile[]) => void) => {
  try {
    const response = await fetch(ENDPOINTS.GET_LIST, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    setFileList(data.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const HamburgerButton = ({
  setFileData,
  setFilename,
  setFileID,
  setFileList,
  fileList,
  fileID,
  filename,
  fileData,
  newFilename,
  setNewFilename,
}: HamburgerProps) => {
  const [showButtons, setShowButtons] = useToggle(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetchData(setFileList);
  }, [setFileList]);

  const onFileCreation = (createdFile: TextFile) => {
    setFileList((prevFileList) => [...prevFileList, createdFile]);
    fetchData(setFileList);
  };

  const onFileDeletion = (deletedFile: TextFile) => {
    setFileList((prevFileList) =>
      prevFileList.filter((file) => file.id !== deletedFile.id),
    );
    fetchData(setFileList);
  };

  return (
    <>
      <div className="flex items-center bg-slate-500">
        <ShowButtons
          setShowButtons={setShowButtons}
          setShowList={setShowList}
        />
        {showButtons && (
          <>
            <ShowFilesButton setShowList={setShowList} showList={showList} />
            <NewFileButton onFileCreation={onFileCreation} />
            <DeleteFileButton id={fileID} onFileDeletion={onFileDeletion} />
          </>
        )}

        <div className="flex flex-grow justify-end">
          <div className="flex flex-col text-slate-50 hover:text-slate-300">
            <FilenameInput
              filename={filename}
              setNewFilename={setNewFilename}
              fileID={fileID}
              fileData={fileData}
              newFilename={newFilename}
              setFilename={setFilename}
              setFileList={setFileList}
            />
          </div>
        </div>
      </div>

      {showList && (
        <SelectFileButton
          fileList={fileList}
          setFileID={setFileID}
          setFileData={setFileData}
          setFileName={setFilename}
        />
      )}
    </>
  );
};

export default HamburgerButton;
