import "./App.css";
import Landing from "@/pages/landing";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import forward from "@/assets/images/icons/forward.png";
import ImageSelector from "./pages/image-selector";
import FilterSelector from "./pages/filter-selector";
import Result from "./pages/result";
import bg from "@/assets/images/bg.png";
import confirm from "@/assets/images/icons/confirm.png";
import restart from "@/assets/images/icons/restart.png";

function App() {
  const [step, setStep] = useState<number>(0);
  const [hideContainer, setHideContainer] = useState<boolean>(false);
  const [chosenImage, setChosenImage] = useState<string | null>(null);
  const [isCapturedImage, setIsCapturedImage] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    handleResize(); // inicijalno postavljanje
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const handleStartNow = () => {
    setStep(1);
    setHideContainer(true);
  };

  const handleImageCapture = (imageData: string) => {
    setChosenImage(imageData);
    setIsCapturedImage(true);
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-700 overflow-hidden relative"
      style={{ height: height }}
    >
      <div
        className="sm:rounded-lg rounded-none shadow-lg bg-white sm:aspect-[9/16] aspect-auto w-full sm:w-auto overflow-hidden relative"
        style={{
          height: window.innerHeight,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence initial={false}>
          {step === 0 && (
            <motion.div
              key="landing-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Landing />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key="info-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <ImageSelector
                chosenImage={chosenImage}
                onImageCapture={handleImageCapture}
                setChosenImage={setChosenImage}
                isCapturedImage={isCapturedImage}
                setIsCapturedImage={setIsCapturedImage}
                setStep={setStep}
                setHideContainer={setHideContainer}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="filter-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <FilterSelector
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
              />
            </motion.div>
          )}
          {step > 2 && (
            <motion.div
              key="result-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Result
                selectedFilter={selectedFilter}
                chosenImage={chosenImage}
                isCapturedImage={isCapturedImage}
                setStep={setStep}
                step={step}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          animate={{ y: hideContainer ? "80%" : "0%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-0 left-2 right-2 p-4 bg-[#151515] rounded-t-3xl h-30 overflow-hidden z-30"
          style={{
            boxShadow: "0px -14px 96px 0px #1580AF",
          }}
        >
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.button
                  key="start-now"
                  onClick={handleStartNow}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-white text-2xl cursor-pointer flex items-center gap-4"
                >
                  Start Now{" "}
                  <img src={forward} alt="forward" className="w-8 h-8" />
                </motion.button>
              )}
              {step === 2 && (
                <motion.div
                  key="start-now"
                  // onClick={() => setStep(3)}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex-col text-white text-2xl  flex items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 border border-white rounded-full flex items-center justify-center`}
                      >
                        <span
                          className={`bg-white rounded-full block w-full h-full transition-all duration-300 ${
                            index === selectedFilter
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-4"
                  >
                    Select style
                    <img src={forward} alt="forward" className="w-6 h-6" />
                  </button>
                </motion.div>
              )}
              {step === 4 && (
                <motion.button
                  key="confirm"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => setStep(5)}
                  className="flex items-center gap-4"
                >
                  <p className="text-white text-2xl">Confirm </p>
                  <img src={confirm} alt="confirm" className="w-6 h-6" />
                </motion.button>
              )}
              {step === 5 && (
                <motion.button
                  key="restart"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    setStep(0);
                    setHideContainer(false);
                    setChosenImage(null);
                    setIsCapturedImage(false);
                    setSelectedFilter(0);
                  }}
                  className="flex items-center gap-4"
                >
                  <p className="text-white text-2xl">Restart </p>
                  <img src={restart} alt="restart" className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
