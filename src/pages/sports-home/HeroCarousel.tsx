import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

// Demo banner data
const DEMO_BANNERS = [
  {
    id: 1,
    image_url: "https://placehold.co/800x400/1a1a2e/ffd500?text=Banner+1",
    match_id: null,
  },
  {
    id: 2,
    image_url: "https://placehold.co/800x400/16213e/ffd500?text=Banner+2",
    match_id: null,
  },
  {
    id: 3,
    image_url: "https://placehold.co/800x400/0f3460/ffd500?text=Banner+3",
    match_id: null,
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  if (DEMO_BANNERS.length === 0) {
    return null;
  }

  return (
    <div className="px-3 mt-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {DEMO_BANNERS.map((banner) => (
              <div
                key={banner.id}
                className="flex-[0_0_100%] min-w-0"
              >
                <button
                  type="button"
                  className="w-full aspect-[351/172] cursor-pointer"
                  onClick={() => {
                    if (banner.match_id) {
                      // Navigate to match detail
                      console.log("Navigate to match:", banner.match_id);
                    }
                  }}
                >
                  <img
                    src={banner.image_url}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {DEMO_BANNERS.map((_, index) => (
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
      </div>
    </div>
  );
};

export default HeroCarousel;
