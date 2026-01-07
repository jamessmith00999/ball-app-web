import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "zht", name: "繁體中文" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white text-sm hover:opacity-80 transition-opacity"
      >
        <span>{currentLang.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[32px] right-0 w-[120px] bg-[#1A1A20] rounded-lg border border-[#2A2A35] z-50 shadow-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full py-2 px-3 text-left text-sm hover:bg-[#2A2A35] transition-colors",
                  currentLang.code === lang.code ? "text-primary" : "text-white"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
