import { useState, useEffect, useRef } from "react";
import upload from "@/assets/images/icons/upload.png";
import capture from "@/assets/images/icons/capture.png";
import { RefreshCcw, SwitchCamera } from "lucide-react";
import forward from "@/assets/images/icons/forward.png";

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
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

interface CameraButtonProps {
  onClick: () => void;
}

interface CameraSwitchButtonProps {
  onClick: () => void;
}

interface SubmitButtonProps {
  onClick: () => void;
}

interface ResetButtonProps {
  onClick: () => void;
}

const ImageUpload = ({
  setChosenImage,
  setIsCapturedImage,
  fileInputRef,
}: ImageUploadProps) => {
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
        className="rounded-full"
      >
        <img src={upload} alt="Upload" className="w-10 h-10" />
      </button>
    </div>
  );
};

const CameraButton = ({ onClick }: CameraButtonProps) => {
  return (
    <button onClick={onClick} className="rounded-full">
      <img src={capture} alt="Capture" className="w-14 h-14" />
    </button>
  );
};

const CameraSwitchButton = ({ onClick }: CameraSwitchButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-white p-3 bg-[#37373770]"
    >
      <SwitchCamera className="w-3 h-3 text-white" strokeWidth={1} />
    </button>
  );
};

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full flex items-center justify-center gap-4 text-white text-2xl cursor-pointer"
      style={{
        textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* <Check className="w-10.5 h-10.5 text-white rounded-full border-2 bg-radial from-green-500 to-green-900 border-white p-2.5 font-bold" strokeWidth={3.5} /> */}
      Next <img src={forward} alt="forward" className="w-8 h-8" />
    </button>
  );
};

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-white p-3 bg-[#37373770]"
    >
      <RefreshCcw className="w-3 h-3 text-white" strokeWidth={1} />
    </button>
  );
};

const ImageSelector = ({
  onImageCapture,
  chosenImage,
  setChosenImage,
  setIsCapturedImage,
  setStep,
  setHideContainer,
}: ImageSelectorProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<DOMException | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      // Dimenzije prikaza na ekranu
      const displayWidth = videoRef.current.clientWidth;
      const displayHeight = videoRef.current.clientHeight;
      // Dimenzije originalnog videa sa kamere
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Odnos širine i visine prikaza i originala
      const displayAspect = displayWidth / displayHeight;
      const videoAspect = videoWidth / videoHeight;

      let sx = 0,
        sy = 0,
        sWidth = videoWidth,
        sHeight = videoHeight;
      if (displayAspect > videoAspect) {
        // Ekran je širi od videa, cropuj visinu
        sHeight = videoWidth / displayAspect;
        sy = (videoHeight - sHeight) / 2;
      } else {
        // Ekran je uži od videa, cropuj širinu
        sWidth = videoHeight * displayAspect;
        sx = (videoWidth - sWidth) / 2;
      }

      // Canvas je iste veličine kao prikaz na ekranu
      const canvas = document.createElement("canvas");
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        if (facingMode === "user") {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(
          videoRef.current,
          sx,
          sy,
          sWidth,
          sHeight, // izvorni crop
          0,
          0,
          canvas.width,
          canvas.height // destinacija
        );
        const imageData = canvas.toDataURL("image/jpeg");
        onImageCapture(imageData);
      }
    }
  };

  const handleReset = () => {
    setChosenImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        return "Camera access denied. Please enable camera permissions or upload an image instead.";
      case "NotFoundError":
        return "Please upload an image.";
      case "NotReadableError":
        return "Camera is currently in use. Please close other applications using the camera or upload an image instead.";
      case "OverconstrainedError":
        return "Camera doesn't support required parameters. Please try another camera.";
      case "AbortError":
        return "An error occurred while accessing the camera.";
      default:
        return "Unknown camera access error.";
    }
  };

  if (chosenImage) {
    return (
      <div className="w-full h-full relative flex items-center justify-center">
        <img
          src={chosenImage}
          alt="Chosen"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
          <ImageUpload
            setChosenImage={setChosenImage}
            setIsCapturedImage={setIsCapturedImage}
            fileInputRef={fileInputRef}
          />
          <SubmitButton onClick={handleSubmit} />
          <ResetButton onClick={handleReset} />
        </div>
      </div>
    );
  }

  if (cameraError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white text-2xl text-center px-4">
          {" "}
          {getCameraErrorMessage(cameraError)}
        </p>
        <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
          <ImageUpload
            setChosenImage={setChosenImage}
            setIsCapturedImage={setIsCapturedImage}
            fileInputRef={fileInputRef}
          />
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
          className={`w-full h-full object-cover ${
            facingMode === "user" ? "scale-x-[-1]" : ""
          }`}
          ref={videoRef}
        />
      )}
      <div className="absolute bottom-10 left-0 right-0 p-4 flex justify-between items-center">
        <ImageUpload
          setChosenImage={setChosenImage}
          setIsCapturedImage={setIsCapturedImage}
          fileInputRef={fileInputRef}
        />
        <CameraButton onClick={handleCapture} />
        <CameraSwitchButton onClick={handleCameraSwitch} />
      </div>
    </div>
  );
};

export default ImageSelector;
