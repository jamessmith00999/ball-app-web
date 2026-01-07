import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { CountryItem } from "@/constants/sports/contry-codes";
import { EXCLUDED_COUNTRIES } from "@/constants/sports/contry-codes";
import { getFlagEmoji } from "@/utils/country";

// Country data - simplified list of common countries
const COUNTRIES: CountryItem[] = [
  { code: "US", dial_code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial_code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial_code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial_code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial_code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial_code: "+33", flag: "🇫🇷", name: "France" },
  { code: "JP", dial_code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dial_code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "TW", dial_code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "HK", dial_code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "SG", dial_code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "MY", dial_code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "TH", dial_code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "VN", dial_code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "PH", dial_code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "ID", dial_code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "IN", dial_code: "+91", flag: "🇮🇳", name: "India" },
  { code: "BR", dial_code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dial_code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "ES", dial_code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "IT", dial_code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "NL", dial_code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "CH", dial_code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "SE", dial_code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "NO", dial_code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "DK", dial_code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "FI", dial_code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "NZ", dial_code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "AE", dial_code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "SA", dial_code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
];

interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: CountryItem) => void;
}

const CountryPickerModal = ({
  visible,
  onClose,
  onSelect,
}: CountryPickerModalProps) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      !EXCLUDED_COUNTRIES.includes(country.code) &&
      (country.name.toLowerCase().includes(searchText.toLowerCase()) ||
        country.dial_code.includes(searchText))
  );

  useEffect(() => {
    if (visible) {
      setSearchText("");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[90%] max-w-[400px] max-h-[80vh] bg-background-secondary rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-input">
          <h2 className="text-white text-lg font-semibold">
            {t("auth.selectCountry")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:opacity-80 transition-opacity"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center gap-2 px-3 h-10 bg-background-tertiary rounded-lg">
            <Search className="w-4 h-4 text-theme-gray-2" />
            <input
              type="text"
              placeholder={t("global.search")}
              className="flex-1 bg-transparent text-white text-sm outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Country List */}
        <div className="max-h-[50vh] overflow-y-auto">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3",
                "hover:bg-background-tertiary transition-colors"
              )}
              onClick={() => {
                onSelect(country);
                onClose();
              }}
            >
              <span className="text-2xl">{getFlagEmoji(country.code)}</span>
              <span className="flex-1 text-left text-white text-sm">
                {country.name}
              </span>
              <span className="text-theme-gray-2 text-sm">
                {country.dial_code}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryPickerModal;
