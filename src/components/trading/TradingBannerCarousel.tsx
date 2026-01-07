import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { BannerItem, BannerType } from "@/api/futures/campaigns/types";
import { tradingBannersAtom } from "@/contexts/trading/banner";

interface TradingBannerCarouselProps {
  bannerType: BannerType;
}

const TradingBannerCarousel = ({ bannerType }: TradingBannerCarouselProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const banners = useAtomValue(tradingBannersAtom);

  const currentBanners = useMemo(() => {
    return banners
      .filter((item) => item?.entry_options === bannerType)
      .sort((a, b) => a.sort - b.sort);
  }, [bannerType, banners]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleBannerClick = useCallback(
    (item: BannerItem) => {
      if (item.navigate_type === "url" && item.link) {
        window.open(item.link, "_blank");
      }

      if (item.navigate_type === "inapp" && item.app_page) {
        if (item.app_page === "campaign") {
          navigate("/personal/activity-center");
        }
      }
    },
    [navigate]
  );

  if (!currentBanners || currentBanners.length === 0) {
    return null;
  }

  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {currentBanners.map((banner) => (
              <div key={banner.uid} className="flex-[0_0_100%] min-w-0">
                <button
                  type="button"
                  onClick={() => handleBannerClick(banner)}
                  disabled={banner.navigate_type === "none"}
                  className="w-full aspect-[343/190] cursor-pointer disabled:cursor-default"
                >
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        {currentBanners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {currentBanners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary w-4"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingBannerCarousel;
