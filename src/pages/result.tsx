import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import ImageFilter from "react-image-filter";
import magic from "@/assets/images/icons/magic.png";
import confirm from "@/assets/images/icons/confirm.png";
import back from "@/assets/images/icons/back.png";
import download from "@/assets/images/icons/download.png";
import bg from "@/assets/images/bg.png";
import mytouch from "@/assets/images/mytouch.png";
import download2 from "@/assets/images/icons/download2.png";
interface ResultProps {
  selectedFilter: number;
  chosenImage: string | null;
  isCapturedImage: boolean;
  step: number;
  setStep: (step: number | ((prev: number) => number)) => void;
}

const filterStyles = [
  [0.7, 0, 0.2, 0, 0, 0, 1, 0.1, 0, 0, 0, 0, 0.6, 0, 0.3, 0, 0, 0, 1, 0],
  [1.1, 0.1, 0.1, 0, 0, 0, 1.1, 0.1, 0, 0, 0, 0.2, 0.7, 0, 0, 0, 0, 0, 1, 0],
  [0.8, 0.3, 0.1, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 1, 0],
];

const Result = ({
  selectedFilter,
  chosenImage,
  isCapturedImage,
  step,
  setStep,
}: ResultProps) => {
  const [showFiltered, setShowFiltered] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [filteredUrl, setFilteredUrl] = useState<string | null>(null);
  const [openDownload, setOpenDownload] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setFilteredUrl(null);
    if (!chosenImage) return;

    const timer1 = setTimeout(() => setShowFiltered(true), 1000);
    const timer2 = setTimeout(() => setHideOverlay(true), 2000);

    // Kad se slika učita, primeni filter i generiši novi url
    const img = new Image();
    img.crossOrigin = "anonymous"; // za CORS ako je sa interneta
    img.src = chosenImage;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      // Preuzmi piksele
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const matrix = filterStyles[selectedFilter];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] =
          matrix[0] * r +
          matrix[1] * g +
          matrix[2] * b +
          matrix[3] * 255 +
          matrix[4];
        data[i + 1] =
          matrix[5] * r +
          matrix[6] * g +
          matrix[7] * b +
          matrix[8] * 255 +
          matrix[9];
        data[i + 2] =
          matrix[10] * r +
          matrix[11] * g +
          matrix[12] * b +
          matrix[13] * 255 +
          matrix[14];
        data[i + 3] =
          matrix[15] * r +
          matrix[16] * g +
          matrix[17] * b +
          matrix[18] * 255 +
          matrix[19];
      }

      ctx.putImageData(imageData, 0, 0);
      setFilteredUrl(canvas.toDataURL("image/jpeg"));
      setStep(4);
    };

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [chosenImage, selectedFilter]);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute flex items-end justify-start top-0 left-2 right-2 p-4  rounded-b-3xl h-30 overflow-hidden z-30"
        style={{
          background:
            "radial-gradient(circle at center, #B4B4B410 0%, #B4B4B430 100%), radial-gradient(circle at center, transparent 0%, #ffffff20 44%, #ffffff66 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          onClick={() => setStep((prev: number) => prev - 1)}
          className="text-white text-xl flex items-center gap-2"
        >
          <img src={back} alt="back" className="w-6 h-6" />
          <p className="text-black text-xl">Back</p>
        </button>
      </motion.div>
      {/* Canvas za generisanje nove slike (skriven) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Filtrirana slika (vizuelno) */}
      <ImageFilter
        image={chosenImage || ""}
        filter={filterStyles[selectedFilter]}
        className="h-full w-full object-contain"
        preserveAspectRatio={isCapturedImage ? "none" : "preserveAspectRatio"}
      />

      {/* Originalna slika na početku */}
      <AnimatePresence>
        {!showFiltered && chosenImage && (
          <motion.img
            key="original"
            src={chosenImage}
            alt="Original"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-full w-full object-contain absolute top-0 left-0 z-10"
          />
        )}
      </AnimatePresence>

      {/* Blur efekat */}
      <AnimatePresence>
        {!hideOverlay && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col items-center justify-center gap-4"
            style={{
              backdropFilter: "blur(10px)",
              backgroundImage:
                "radial-gradient(circle, #b4b4b410 41%, #b4b4b430 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* SVG krug koji se animira */}
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 100 100"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="282.74" // 2 * π * r
                  strokeDashoffset="282.74"
                  transform="rotate(-90 50 50)"
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "linear" }} // ovo treba da se poklapa sa trajanjem overlay-a
                />
              </svg>
              {/* Ikonica */}
              <img src={magic} alt="Magic" className="w-4 h-4 z-10" />
            </div>
            <p className="text-white text-xl">Loading...</p>
            <div className="flex flex-col items-center gap-2 bottom-30 absolute border-b-2 border-white p-2">
              <img src={confirm} alt="confirm" className="w-6 h-6" />
              <p className="text-white text-xl">Style {selectedFilter + 1}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download dugme */}
      {filteredUrl && step === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-32  left-2 right-2 p-4 gap-4 rounded-3xl text-white  flex flex-col justify-center items-center cursor-pointer"
          style={{
            background:
              "radial-gradient(circle at center, #0A578C 0%, #0E2843 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => setOpenDownload(true)}
        >
          <img src={download} alt="download" className="w-8 h-8" />
          Download item image
        </motion.div>
      )}
      <AnimatePresence>
        {openDownload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full z-40 text-white px-2 flex flex-col items-center justify-end gap-4"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <img src={mytouch} alt="mytouch" className="w-full h-auto" />
            <p className="text-white text-xl text-center font-bold">
              We hope you enjoy this content, Which is for personal use only.
            </p>
            <p className="text-white text-xl text-center">
              If you share it with others, Please do not link it to any messages
              or content from us, including #hashtags.
            </p>
            <div className="w-full bg-black h-30 rounded-t-3xl flex  justify-center">
              <a
                href={filteredUrl || ""}
                onClick={() => setOpenDownload(false)}
                download="filtered-image.jpg"
                className="text-white text-2xl text-center font-bold flex items-center gap-2"
              >
                Download{" "}
                <img src={download2} alt="download2" className="w-8 h-8" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;
