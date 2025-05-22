import { useState, useEffect, useRef } from "react";

interface ImageSelectorProps {
  onImageCapture: (imageData: string) => void;
  chosenImage: string | null;
  setChosenImage: (imageData: string | null) => void;
  setIsCapturedImage: (isCapturedImage: boolean) => void;
  isCapturedImage?: boolean;
  setStep: (step: number) => void;
  setHideContainer: (hideContainer: boolean) => void;
}

interface ImageUploadProps {
  setChosenImage: (imageData: string | null) => void;
  setIsCapturedImage: (isCaptured: boolean) => void;
}

const ImageUpload = ({ setChosenImage, setIsCapturedImage }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChosenImage(e.target?.result as string);
        setIsCapturedImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-white text-black px-4 py-2 rounded-md"
      >
        Upload slike
      </button>
    </div>
  );
};

const ImageSelector = ({
  onImageCapture,
  chosenImage,
  setChosenImage,
  setIsCapturedImage,
  isCapturedImage = false,
  setStep,
  setHideContainer,
}: ImageSelectorProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<DOMException | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async (mode: "user" | "environment") => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      setStream(mediaStream);
      setFacingMode(mode);
      setCameraError(null);
    } catch (err) {
      console.warn("Kamera nije dozvoljena ili nije dostupna:", err);
      if (err instanceof DOMException) {
        setCameraError(err);
      } else {
        setCameraError(
          new DOMException("Nepoznata greška pri pristupu kameri")
        );
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    startCamera("user");
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCameraSwitch = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    startCamera(newMode);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        onImageCapture(imageData);
      }
    }
  };

  const handleReset = () => {
    setChosenImage(null);
    startCamera(facingMode);
    setIsCapturedImage(false);
  };

  const handleSubmit = () => {
    setHideContainer(false);
    setStep(2);
  };

  const getCameraErrorMessage = (err: DOMException): string => {
    switch (err?.name) {
      case "NotAllowedError":
        return "Niste dozvolili pristup kameri. Dozvolite pristup u podešavanjima ili nastavite sa uploadom slike.";
      case "NotFoundError":
        return "Nismo pronašli nijednu kameru. Možete umesto toga uploadovati sliku.";
      case "NotReadableError":
        return "Kamera je trenutno zauzeta. Zatvorite druge aplikacije koje je koriste.";
      case "OverconstrainedError":
        return "Ova kamera ne podržava tražene parametre. Pokušajte sa drugom.";
      case "SecurityError":
        return "Aplikacija mora biti pokrenuta preko sigurnog HTTPS protokola.";
      case "AbortError":
        return "Nešto je pošlo po zlu prilikom pristupa kameri.";
      default:
        return "Nepoznata greška pri pristupu kameri.";
    }
  };

  if (chosenImage) {
    return (
      <div className="w-full h-full relative flex items-center justify-center">
        <img
          src={chosenImage}
          alt="Chosen"
          className={`${
            isCapturedImage
              ? "w-full h-full object-cover"
              : "max-w-full max-h-full object-contain"
          }`}
        />
        <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
          <ImageUpload setChosenImage={setChosenImage} setIsCapturedImage={setIsCapturedImage} />
          <button
            className="bg-white text-black px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        
            <button
              className="bg-white text-black px-4 py-2 rounded-md"
              onClick={handleReset}
            >
              Ponovo
            </button>
          
        </div>
      </div>
    );
  }

  if (cameraError) {
    return (
      <div>
        {getCameraErrorMessage(cameraError)}
        <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
          <ImageUpload setChosenImage={setChosenImage} setIsCapturedImage={setIsCapturedImage} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {stream && (
        <video
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          ref={videoRef}
        />
      )}
      <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
        <ImageUpload setChosenImage={setChosenImage} setIsCapturedImage={setIsCapturedImage} />
        <button
          className="bg-white text-black px-4 py-2 rounded-md"
          onClick={handleCapture}
        >
          Slikanje
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-md"
          onClick={handleCameraSwitch}
        >
          Promena kamere
        </button>
      </div>
    </div>
  );
};

export default ImageSelector;
