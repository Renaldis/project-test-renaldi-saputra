import { Parallax } from "react-parallax";

const ParallaxBannerImage = () => {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div className="relative w-full h-full">
        <Parallax
          bgImage="/src/assets/doodle.jpg"
          strength={300}
          bgImageAlt="Background Image"
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-white text-center z-10">
              <h1 className="text-4xl font-bold">Ideas</h1>
              <p className="text-lg mt-2">Where all our great things begin</p>
            </div>

            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </Parallax>
      </div>

      <svg
        className="absolute top-40 bottom-0 left-0 w-full z-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,256L1440,128L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default ParallaxBannerImage;
