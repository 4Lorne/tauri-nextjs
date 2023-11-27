import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Hamburger = ({
  setText,
}: {
  setText: Dispatch<SetStateAction<string>>;
}) => {
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

  return (
    <>
      <label>Files</label>
      <div className="hamburger">
        {fileList.map((file) => (
          <button
            className={"flex flex-col text-slate-50 hover:text-slate-100"}
            key={file}
            onClick={() => {
              fetch("api/hooks/useGetData/", {
                method: "POST",
                body: JSON.stringify({ filename: file }),
              })
                .then((res) => res.json())
                .then((data) => {
                  const fileData = data.rows[0].file_data.data;
                  setText(Buffer.from(fileData).toString("utf-8"));
                  // You can use 'fileData' as needed, for example, display it in the UI or further process it.
                })
                .catch((error) => {
                  console.error("Error:", error);
                  // Handle the error as needed
                });
            }}
          >
            {file}
          </button>
        ))}
      </div>
    </>
  );
};

export default Hamburger;
