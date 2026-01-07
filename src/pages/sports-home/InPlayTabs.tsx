import clsx from "clsx";
import { useTranslation } from "react-i18next";

type InPlayMatchesType = "1x2" | "hdp" | "o/u" | "other";

const IN_PLAY_CATEGORY: InPlayMatchesType[] = ["1x2", "hdp", "o/u", "other"];

interface InPlayTabsProps {
  className?: string;
  inplayType: InPlayMatchesType;
  onInplayTypeChange: (type: InPlayMatchesType) => void;
}

const InPlayTabs = ({
  className,
  inplayType,
  onInplayTypeChange,
}: InPlayTabsProps) => {
  const { t } = useTranslation();

  const translateInPlayType = (type: string) => {
    return t(`inPlayType.${type}`);
  };

  return (
    <div className={clsx("flex gap-[6px]", className)}>
      {IN_PLAY_CATEGORY.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onInplayTypeChange(type)}
          className={clsx(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            inplayType === type
              ? "bg-primary text-black"
              : "bg-theme-gray-light text-white hover:bg-theme-gray-2/30"
          )}
        >
          {translateInPlayType(type)}
        </button>
      ))}
    </div>
  );
};

export default InPlayTabs;
export type { InPlayMatchesType };
