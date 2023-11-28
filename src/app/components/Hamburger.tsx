import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FolderIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const Hamburger = ({
  setText,
  setFileName,
  text,
  fileName,
  newFileName,
}: {
  setText: Dispatch<SetStateAction<string>>;
  setFileName: Dispatch<SetStateAction<string>>;
  text: string;
  fileName: string;
  newFileName: string;
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showList, setShowList] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/hooks/useGetList/", {
          method: "POST",
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFileList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const reqBody = {
    filename: fileName,
    new_filename: newFileName,
    file_data: text,
  };

  const createFile = {
    filename: "Untitled",
    file_data: "",
  };

  return (
    <>
      <div className={"flex bg-red-800"}>
        <button
          onClick={() => {
            setShowButtons(!showButtons);
            setShowList(false);
          }}
          className={"px-2 py-2 hover:bg-slate-500"}
        >
          <FolderIcon
            className={"h-6 w-6 text-slate-50 hover:text-slate-100"}
          />
        </button>
        {showButtons && (
          <div>
            <button
              onClick={() => {
                setShowList(!showList);
              }}
              className={"px-2 py-2 hover:bg-slate-500"}
            >
              {showList ? (
                <MinusIcon
                  className={"h-6 w-6 text-slate-50 hover:text-slate-100"}
                />
              ) : (
                <PlusIcon className="h-6 w-6 text-slate-50 hover:text-slate-100" />
              )}
            </button>
          </div>
        )}
        {showList && (
          <div>
            <button
              className={"px-2 py-2 hover:bg-slate-500"}
              onClick={async () => {
                await fetch("api/hooks/useUploadData/", {
                  method: "POST",
                  body: JSON.stringify(createFile),
                });
              }}
            >
              <PencilSquareIcon
                className={"h-6 w-6 text-slate-50 hover:text-slate-100"}
              />
            </button>
          </div>
        )}
        <button
          className={"px-2 py-2 hover:bg-slate-500"}
          onClick={() => {
            fetch("api/hooks/useUpdateData/", {
              method: "POST",
              body: JSON.stringify(reqBody),
            }).then((r) => console.log(r.text()));
          }}
        >
          <label>Save</label>
        </button>
      </div>

      {showList && (
        <div className="hamburger">
          {fileList.map((file, index: number) => (
            <button
              className={"flex flex-col text-slate-50 hover:text-slate-300"}
              key={index}
              onClick={() => {
                fetch("api/hooks/useGetData/", {
                  method: "POST",
                  body: JSON.stringify({ filename: file }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    const fileData = data.rows[0].file_data.data;
                    setText(Buffer.from(fileData).toString("utf-8"));
                    setFileName(file);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    // Handle the error as needed
                  });
              }}
            >
              <label className={"hover:bg-slate-500"}>{file}</label>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Hamburger;
