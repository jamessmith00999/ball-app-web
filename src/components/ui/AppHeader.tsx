import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  children: ReactNode;
  onBack?: () => void;
}

const AppHeader = ({ children, onBack }: AppHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center h-[44px] px-4 relative">
      <button
        type="button"
        onClick={handleBack}
        className="absolute left-4 p-1 hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <h1 className="flex-1 text-center text-white text-lg font-semibold">
        {children}
      </h1>
    </div>
  );
};

export default AppHeader;
