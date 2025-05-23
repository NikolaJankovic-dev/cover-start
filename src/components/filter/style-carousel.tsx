import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import message from "@/assets/images/icons/message.png";
import { type UseEmblaCarouselType } from "embla-carousel-react";
interface StyleCarouselProps {
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}
type CarouselApi = UseEmblaCarouselType[1]
export function StyleCarousel({ activeSlide, setActiveSlide }: StyleCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 lg:basis-1/3 ">
            <div
              className={` text-white flex flex-col justify-end items-center transition-all h-full duration-300 select-none whitespace-nowrap gap-2 ${
                activeSlide + 1 === index
                  ? "border-b-2 border-white text-xl opacity-100 p-2"
                  : "text-sm opacity-50 p-4"
              }`}
            >
              {activeSlide + 1 === index && (
                <img src={message} alt="message" className="w-6 h-6" />
              )}
              <span className=" font-semibold">
                {index > 0 && index < 4 ? `Style ${index}` : ""}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
