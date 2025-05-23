import { StyleCarousel } from "@/components/filter/style-carousel";
import filter1 from "@/assets/images/filter1.png";
import filter2 from "@/assets/images/filter2.png";
import filter3 from "@/assets/images/filter3.png";
import { motion } from "motion/react";

const FilterSelector = ({
  setSelectedFilter,
  selectedFilter,
}: {
  setSelectedFilter: (filter: number) => void;
  selectedFilter: number;
}) => {
  return (
    <div
      className="h-full relative "
    >
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
        <div
          className="flex w-full h-[40vh] items-center justify-center gap-4  relative"
          // style={{
          //   height: window.innerHeight,
          // }}
        >
          <motion.img
            src={filter1}
            alt="Filter 1"
            className="h-[30vh] w-auto min-w-[30vh] object-contain absolute  left-1/2"
            animate={{
              x:
                selectedFilter === 0
                  ? "-50%"
                  : selectedFilter === 1
                  ? "-75%"
                  : "-100%",
              scale:
                selectedFilter === 0 ? 1 : selectedFilter === 1 ? 0.75 : 0.5,
              filter: `brightness(${
                selectedFilter === 0 ? 100 : selectedFilter === 1 ? 75 : 50
              }%)`,
            }}
            style={{
              zIndex:
                selectedFilter === 0 ? 30 : selectedFilter === 1 ? 20 : 10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <motion.img
            src={filter2}
            alt="Filter 2"
            className="h-[30vh] w-auto min-w-[30vh] object-contain absolute  left-1/2"
            animate={{
              x:
                selectedFilter === 0
                  ? "-20%"
                  : selectedFilter === 1
                  ? "-50%"
                  : "-75%",
              scale:
                selectedFilter === 0 ? 0.75 : selectedFilter === 1 ? 1 : 0.75,
              filter: `brightness(${
                selectedFilter === 0 ? 75 : selectedFilter === 1 ? 100 : 50
              }%)`,
            }}
            style={{
              zIndex:
                selectedFilter === 0 ? 20 : selectedFilter === 1 ? 30 : 10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <motion.img
            src={filter3}
            alt="Filter 3"
            className="h-[30vh] w-auto min-w-[30vh] object-contain absolute left-1/2"
            animate={{
              x:
                selectedFilter === 0
                  ? "0%"
                  : selectedFilter === 1
                  ? "-20%"
                  : "-50%",
              scale:
                selectedFilter === 0 ? 0.5 : selectedFilter === 1 ? 0.75 : 1,
              filter: `brightness(${
                selectedFilter === 0 ? 50 : selectedFilter === 1 ? 75 : 100
              }%)`,
            }}
            style={{
              zIndex:
                selectedFilter === 0 ? 10 : selectedFilter === 1 ? 20 : 30,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </div>
        <StyleCarousel
          activeSlide={selectedFilter}
          setActiveSlide={setSelectedFilter}
        />
      </div>
    </div>
  );
};

export default FilterSelector;
