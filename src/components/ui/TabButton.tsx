import clsx from "clsx";

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton = ({ title, isActive, onPress }: TabButtonProps) => {
  return (
    <button
      type="button"
      className={clsx("flex flex-col justify-center items-center gap-1")}
      onClick={onPress}
    >
      <span
        className={clsx(
          "text-base font-semibold leading-[24px]",
          isActive ? "text-white" : "text-theme-gray-4"
        )}
      >
        {title}
      </span>
      <div
        className={clsx(
          "w-full h-[2px] rounded-full",
          isActive ? "bg-white" : "bg-transparent"
        )}
      />
    </button>
  );
};

export default TabButton;
