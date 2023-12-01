import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

interface ShowFileButtonProps {
  setShowList: (arg: boolean) => void;
  showList: boolean;
}
export const ShowFilesButton = ({
  setShowList,
  showList,
}: ShowFileButtonProps) => {
  return (
    <button
      onClick={() => {
        setShowList(!showList);
      }}
      className={"px-2 py-2 hover:bg-slate-500"}
    >
      {showList ? (
        <MinusIcon className={"h-6 w-6 text-slate-50 hover:text-slate-100"} />
      ) : (
        <PlusIcon className="h-6 w-6 text-slate-50 hover:text-slate-100" />
      )}
    </button>
  );
};
