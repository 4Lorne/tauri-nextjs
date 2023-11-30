import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/app/api/endpoints";
import { useToggle } from "usehooks-ts";
import { ShowButtons } from "@/app/components/Buttons/ShowButtons";
import { ShowFilesButton } from "@/app/components/Buttons/ShowFilesButton";
import { NewFileButton } from "@/app/components/Buttons/NewFileButton";
import { SelectFileButton } from "@/app/components/Buttons/SelectFileButton";
import { TextFile } from "@/app/types/TextFile";
import { DeleteFileButton } from "@/app/components/Buttons/DeleteFileButton";

interface HamburgerProps {
  setFileData: (arg: string) => void;
  setFileName: (arg: string) => void;
  setFileID: (arg: number) => void;
  setFileList: (
    value: ((prevState: TextFile[]) => TextFile[]) | TextFile[],
  ) => void;
  fileList: TextFile[];
  fileID: number;
}

export const fetchData = (setFileList: (data: TextFile[]) => void) => {
  fetch(ENDPOINTS.GET_LIST, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      setFileList(data.rows);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const HamburgerButton = ({
  setFileData,
  setFileName,
  setFileID,
  setFileList,
  fileList,
  fileID,
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

  const reqBody = {
    id: fileID,
  };
  return (
    <>
      <div className={"flex bg-red-800"}>
        <ShowButtons
          setShowButtons={setShowButtons}
          setShowList={setShowList}
        />

        {showButtons && (
          <ShowFilesButton setShowList={setShowList} showList={showList} />
        )}

        {showList && <NewFileButton onFileCreation={onFileCreation} />}

        <DeleteFileButton id={fileID} />
      </div>

      {showList && (
        <SelectFileButton
          fileList={fileList}
          setFileID={setFileID}
          setFileData={setFileData}
          setFileName={setFileName}
        />
      )}
    </>
  );
};

export default HamburgerButton;
