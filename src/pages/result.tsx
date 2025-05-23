import ImageFilter from "react-image-filter";
import { useState } from "react";

interface ResultProps {
  selectedFilter: number;
  chosenImage: string | null;
  isCapturedImage: boolean;
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
}: ResultProps) => {
  const [redToRed, setRedToRed] = useState<number>(1);
  const [greenToRed, setGreenToRed] = useState<number>(0);
  const [blueToRed, setBlueToRed] = useState<number>(0);
  const [alphaToRed, setAlphaToRed] = useState<number>(0);
  const [addToRed, setAddToRed] = useState<number>(0);
  const [redToGreen, setRedToGreen] = useState<number>(0);
  const [greenToGreen, setGreenToGreen] = useState<number>(1);
  const [blueToGreen, setBlueToGreen] = useState<number>(0);
  const [alphaToGreen, setAlphaToGreen] = useState<number>(0);
  const [addToGreen, setAddToGreen] = useState<number>(0);
  const [redToBlue, setRedToBlue] = useState<number>(0);
  const [greenToBlue, setGreenToBlue] = useState<number>(0);
  const [blueToBlue, setBlueToBlue] = useState<number>(1);
  const [alphaToBlue, setAlphaToBlue] = useState<number>(0);
  const [addToBlue, setAddToBlue] = useState<number>(0);
  const [redToAlpha, setRedToAlpha] = useState<number>(0);
  const [greenToAlpha, setGreenToAlpha] = useState<number>(0);
  const [blueToAlpha, setBlueToAlpha] = useState<number>(0);
  const [alphaToAlpha, setAlphaToAlpha] = useState<number>(1);
  const [addToAlpha, setAddToAlpha] = useState<number>(0);

  const resetFilters = () => {
    setRedToRed(1);
    setGreenToRed(0);
    setBlueToRed(0);
    setAlphaToRed(0);
    setAddToRed(0);
    setRedToGreen(0);
    setGreenToGreen(1);
    setBlueToGreen(0);
    setAlphaToGreen(0);
    setAddToGreen(0);
    setRedToBlue(0);
    setGreenToBlue(0);
    setBlueToBlue(1);
    setAlphaToBlue(0);
    setAddToBlue(0);
    setRedToAlpha(0);
    setGreenToAlpha(0);
    setBlueToAlpha(0);
    setAlphaToAlpha(1);
    setAddToAlpha(0);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <button onClick={resetFilters}>Reset</button>
      {/* <img
        src={chosenImage || ""}
        alt="Chosen"
        className={`${
          isCapturedImage
            ? "w-full h-full object-cover"
            : "max-w-full max-h-full object-contain"
        }`}
        style={{
          filter: filterStyles[selectedFilter - 1],
        }}
      /> */}
      <ImageFilter
        image={chosenImage || ""}
        filter={filterStyles[selectedFilter - 1]}
        // filter={[
        //   redToRed,
        //   greenToRed,
        //   blueToRed,
        //   alphaToRed,
        //   addToRed,
        //   redToGreen,
        //   greenToGreen,
        //   blueToGreen,
        //   alphaToGreen,
        //   addToGreen,
        //   redToBlue,
        //   greenToBlue,
        //   blueToBlue,
        //   alphaToBlue,
        //   addToBlue,
        //   redToAlpha,
        //   greenToAlpha,
        //   blueToAlpha,
        //   alphaToAlpha,
        //   addToAlpha,
        // ]}
      />

      {/* Controls */}
      <div className="grid grid-cols-5 gap-4 p-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Red Channel</p>
          <div className="flex flex-col">
            <p>Red to red {redToRed}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={redToRed}
              onChange={(e) => setRedToRed(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Green to red {greenToRed}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={greenToRed}
              onChange={(e) => setGreenToRed(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Blue to red {blueToRed}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={blueToRed}
              onChange={(e) => setBlueToRed(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Alpha to red {alphaToRed}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={alphaToRed}
              onChange={(e) => setAlphaToRed(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Add to red {addToRed}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={addToRed}
              onChange={(e) => setAddToRed(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Green Channel</p>
          <div className="flex flex-col">
            <p>Red to green {redToGreen}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={redToGreen}
              onChange={(e) => setRedToGreen(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Green to green {greenToGreen}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={greenToGreen}
              onChange={(e) => setGreenToGreen(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Blue to green {blueToGreen}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={blueToGreen}
              onChange={(e) => setBlueToGreen(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Alpha to green {alphaToGreen}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={alphaToGreen}
              onChange={(e) => setAlphaToGreen(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Add to green {addToGreen}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={addToGreen}
              onChange={(e) => setAddToGreen(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Blue Channel</p>
          <div className="flex flex-col">
            <p>Red to blue {redToBlue}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={redToBlue}
              onChange={(e) => setRedToBlue(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Green to blue {greenToBlue}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={greenToBlue}
              onChange={(e) => setGreenToBlue(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Blue to blue {blueToBlue}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={blueToBlue}
              onChange={(e) => setBlueToBlue(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Alpha to blue {alphaToBlue}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={alphaToBlue}
              onChange={(e) => setAlphaToBlue(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Add to blue {addToBlue}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={addToBlue}
              onChange={(e) => setAddToBlue(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold">Alpha Channel</p>
          <div className="flex flex-col">
            <p>Red to alpha {redToAlpha}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={redToAlpha}
              onChange={(e) => setRedToAlpha(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Green to alpha {greenToAlpha}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={greenToAlpha}
              onChange={(e) => setGreenToAlpha(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Blue to alpha {blueToAlpha}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={blueToAlpha}
              onChange={(e) => setBlueToAlpha(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Alpha to alpha {alphaToAlpha}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={alphaToAlpha}
              onChange={(e) => setAlphaToAlpha(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <p>Add to alpha {addToAlpha}</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={addToAlpha}
              onChange={(e) => setAddToAlpha(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
