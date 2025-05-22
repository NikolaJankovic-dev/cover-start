import landing from "@/assets/images/landing.png";

const Landing = () => {
  return (
    <div
      className="w-full h-full flex flex-col gap-0 items-center justify-end pb-44 text-center"
      style={{
        backgroundImage: `url(${landing})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p
        className="text-7xl hackney-vector"
        style={{
          background: "#ffffff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        BECOME THE
      </p>
      <p
        className=" text-9xl hackney-vector"
        style={{
          background: "#ffffff",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: "0.8",
        }}
      >
        COVER STAR
      </p>
      <p className="text-white text-4xl mt-4">
        Upload your photo and give it a <br/> unique touch.
      </p>
    </div>
  );
};

export default Landing;
