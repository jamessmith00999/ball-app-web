import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

import { PartnersImg } from "@/assets/images/trading/home";

const Partners = () => {
  const { t } = useTranslation();

  return (
    <div className="py-4">
      <div className="px-4 mb-4">
        <h2 className="text-white text-lg font-bold">{t("home.partners")}</h2>
      </div>

      <div className="border-y border-[#202432]">
        <Marquee speed={30} gradient={false}>
          <img
            src={PartnersImg}
            alt="Partners"
            className="w-[912px] h-[64px]"
          />
        </Marquee>
      </div>
    </div>
  );
};

export default Partners;
