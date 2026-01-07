import { useTranslation } from "react-i18next";

import { SOCIAL_MEDIA_LIST } from "@/constants/trading";

const JoinCommunity = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h2 className="text-white text-lg font-bold">
        {t("home.dashboard.joinTheCommunity")}
      </h2>

      <div className="mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6">
          {SOCIAL_MEDIA_LIST.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-10 h-10"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
