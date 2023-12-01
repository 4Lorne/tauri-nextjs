import { FolderIcon } from "@heroicons/react/20/solid";

interface ShowFileListProps {
  setShowButtons: () => void;
  setShowList: (arg: boolean) => void;
}

export const ShowButtons = ({
  setShowButtons,
  setShowList,
}: ShowFileListProps) => {
  return (
    <button
      onClick={() => {
        setShowButtons();
        setShowList(false);
      }}
      className={"px-2 py-2 hover:bg-slate-500"}
    >
      <FolderIcon className={"h-6 w-6 text-slate-50 hover:text-slate-100"} />
    </button>
  );
};
