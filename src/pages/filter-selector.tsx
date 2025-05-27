import { StyleCarousel } from "@/components/filter/style-carousel";
import filter1 from "@/assets/images/filter1.png";
import filter2 from "@/assets/images/filter2.png";
import filter3 from "@/assets/images/filter3.png";
import { motion, useDragControls } from "motion/react";
import { useRef, useState } from "react";
import { type UseEmblaCarouselType } from "embla-carousel-react";

const FilterSelector = ({
  setSelectedFilter,
  selectedFilter,
  setStep,
}: {
  setSelectedFilter: (filter: number) => void;
  selectedFilter: number;
  setStep: (step: number) => void;
}) => {
  const dragControls = useDragControls();
  const carouselApi = useRef<UseEmblaCarouselType[1] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    event.preventDefault();
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && selectedFilter > 0) {
        setSelectedFilter(selectedFilter - 1);
        carouselApi.current?.scrollTo(selectedFilter - 1);
      } else if (info.offset.x < 0 && selectedFilter < 2) {
        setSelectedFilter(selectedFilter + 1);
        carouselApi.current?.scrollTo(selectedFilter + 1);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && selectedFilter > 0) {
        setSelectedFilter(selectedFilter - 1);
        carouselApi.current?.scrollTo(selectedFilter - 1);
        setIsDragging(false);
      } else if (diff < 0 && selectedFilter < 2) {
        setSelectedFilter(selectedFilter + 1);
        carouselApi.current?.scrollTo(selectedFilter + 1);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="h-full relative ">
      <div className="w-full flex flex-col items-center justify-center absolute bottom-30">
        <h1
          className=" hackney-vector text-[6vh] font-bold text-center"
          style={{
            background: "#ffffff",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "0.9",
          }}
        >
          TOUCH <br /> YOUR STYLE
        </h1>
        <motion.div
          className="flex w-full h-[34vh] items-center justify-center gap-4 relative"
          drag="x"
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div
            className="absolute left-1/2"
            style={{
              zIndex: selectedFilter === 0 ? 30 : selectedFilter === 1 ? 20 : 10
            }}
            animate={{
              x:
                selectedFilter === 0
                  ? "-50%"
                  : selectedFilter === 1
                  ? "-75%"
                  : "-100%",
              scale:
                selectedFilter === 0 ? 1 : selectedFilter === 1 ? 0.75 : 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <img
              src={filter1}
              alt="Filter 1"
              className="h-[30vh] w-auto min-w-[30vh] object-contain"
             
              style={{
                filter: `brightness(${
                  selectedFilter === 0 ? 100 : selectedFilter === 1 ? 75 : 50
                }%)`,
              }}
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2"
            style={{
              zIndex: selectedFilter === 0 ? 20 : selectedFilter === 1 ? 30 : 10
            }}
            animate={{
              x:
                selectedFilter === 0
                  ? "-20%"
                  : selectedFilter === 1
                  ? "-50%"
                  : "-75%",
              scale:
                selectedFilter === 0 ? 0.75 : selectedFilter === 1 ? 1 : 0.75,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <img
              src={filter2}
              alt="Filter 2"
              className="h-[30vh] w-auto min-w-[30vh] object-contain"
             
              style={{
                filter: `brightness(${
                  selectedFilter === 0 ? 75 : selectedFilter === 1 ? 100 : 50
                }%)`,
              }}
            />
          </motion.div>
          <motion.div
            className="absolute left-1/2"
            style={{
              zIndex: selectedFilter === 0 ? 10 : selectedFilter === 1 ? 20 : 30
            }}
            animate={{
              x:
                selectedFilter === 0
                  ? "0%"
                  : selectedFilter === 1
                  ? "-20%"
                  : "-50%",
              scale:
                selectedFilter === 0 ? 0.5 : selectedFilter === 1 ? 0.75 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <img
              src={filter3}
              alt="Filter 3"
              className="h-[30vh] w-auto min-w-[30vh] object-contain"
             
              style={{
                filter: `brightness(${
                  selectedFilter === 0 ? 50 : selectedFilter === 1 ? 75 : 100
                }%)`,
              }}
            />
          </motion.div>
        </motion.div>
        <StyleCarousel
          activeSlide={selectedFilter}
          setActiveSlide={setSelectedFilter}
          carouselApi={carouselApi}
          setStep={setStep}
        />
      </div>
    </div>
  );
};

export default FilterSelector;
