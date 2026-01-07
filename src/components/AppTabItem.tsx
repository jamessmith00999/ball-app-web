import clsx from "clsx";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface TabItemProps {
  icon: string;
  activeIcon: string;
  label: string;
  href?: string;
  badge?: number;
  isActive?: boolean;
  onPress?: () => void;
  large?: boolean;
  disabledHref?: boolean;
  activeColor?: string;
}

export const AppTabItem = ({
  large,
  icon,
  activeIcon,
  label,
  href,
  badge,
  isActive,
  onPress,
  disabledHref,
  activeColor,
}: TabItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePress = useCallback(() => {
    // if the current path is the same as the href, do not navigate
    if (href && location.pathname === href) {
      return;
    }

    // if the onPress is defined, call it
    if (onPress) {
      onPress();
      return;
    }

    // if the href is defined, navigate to it
    if (href) {
      if (disabledHref) {
        return;
      }

      navigate(href);
    }
  }, [href, location.pathname, onPress, navigate, disabledHref]);

  return (
    <button
      onClick={handlePress}
      className={clsx(
        "flex-1 flex flex-col justify-center items-center",
        "transition-opacity duration-150",
        "hover:opacity-80 active:opacity-60"
      )}
    >
      <div className="relative">
        <div className={clsx(large && "-mt-[29px] mb-[1px]")}>
          <img
            src={large ? icon : isActive ? activeIcon : icon}
            alt={label}
            className={clsx(
              !large && "w-[22px] h-[22px]",
              large && "w-[44px] h-[44px]"
            )}
          />
        </div>
        {badge !== undefined && badge > 0 && (
          <div
            className={clsx(
              "absolute z-50 -top-[14px] -right-[4px] w-5 h-5",
              "bg-theme-red-2 rounded-full flex justify-center items-center",
              large && "-mt-[20px]"
            )}
          >
            <span className="text-white font-semibold text-xs">{badge}</span>
          </div>
        )}
      </div>
      <div className={clsx(!large && "mt-[2px]")}>
        <span
          className={clsx(
            "text-xs leading-[20px]",
            large && "mt-2",
            isActive && "font-semibold",
            isActive ? "text-white" : "text-theme-gray-2"
          )}
          style={isActive && activeColor ? { color: activeColor } : undefined}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default AppTabItem;
