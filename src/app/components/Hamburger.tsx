import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/app/api/endpoints";
import { useToggle } from "usehooks-ts";
import { ShowButtons } from "@/app/components/Buttons/ShowButtons";
import { ShowFilesButton } from "@/app/components/Buttons/ShowFilesButton";
import { NewFileButton } from "@/app/components/Buttons/NewFileButton";
import { SaveFileButton } from "@/app/components/Buttons/SaveFileButton";
import { SelectFileButton } from "@/app/components/Buttons/SelectFileButton";
import { TextFile } from "@/app/types/TextFile";

interface HamburgerProps {
  setFileData: (arg: string) => void;
  setFileName: (arg: string) => void;
  fileData: string;
  filename: string;
  newFilename: string;
}

const fetchData = (setFileList: (data: TextFile[]) => void) => {
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

const Hamburger = ({
  setFileData,
  setFileName,
  fileData,
  filename,
  newFilename,
}: HamburgerProps) => {
  const [showButtons, setShowButtons] = useToggle(false);
  const [showList, setShowList] = useState(false);
  const [fileList, setFileList] = useState<TextFile[]>([]);
  const [fileID, setFileID] = useState(0);

  useEffect(() => {
    fetchData(setFileList);
  }, []);

  const onFileCreation = (createdFile: TextFile) => {
    setFileList((prevFileList) => [...prevFileList, createdFile]);
    fetchData(setFileList);
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

        {showList && <NewFileButton fileCreated={onFileCreation} />}

        <SaveFileButton
          fileID={fileID}
          fileData={fileData}
          filename={filename}
          newFilename={newFilename}
        />
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

export default Hamburger;
