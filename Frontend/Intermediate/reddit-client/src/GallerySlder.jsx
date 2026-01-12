import { useEffect, useRef, useState } from "react";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const GallerySlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const [fullscreen, setFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomX, setZoomX] = useState(null);
  const [zoomY, setZoomY] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!fullscreen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setFullscreen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      setIsZoomed(false);
      setZoomX(null);
      setZoomY(null);
    };
  }, [fullscreen]);

  const scrollPrev = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
    scrollRef.current.scrollBy(-1, 0);
    await delay(500);
    setIsAnimating(false);
  };

  const scrollNext = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
    scrollRef.current.scrollBy(1, 0);
    await delay(500);
    setIsAnimating(false);
  };

  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  return (
    <>
      {fullscreen && (
        <button
          onClick={handleFullscreen}
          className="
            fixed w-10 h-10 right-10 top-10 z-200
            opacity-75 bg-gray-800 hover:bg-gray-900 text-white rounded-full cursor-pointer"
        >
          <pre>✖</pre>
        </button>
      )}
      <div
        onClick={!fullscreen ? handleFullscreen : undefined}
        className={`flex items-center justify-center overflow-hidden ${
          fullscreen
            ? "fixed w-screen left-0 top-0 z-100"
            : "relative w-150 rounded-xl border border-gray-200"
        }`}
      >
        <button
          onClick={scrollPrev}
          className={`
            flex items-center justify-center top-1/2 left-4 w-9 aspect-square 
            rounded-full bg-gray-800 opacity-75 cursor-pointer z-250 hover:bg-gray-900
            ${fullscreen ? "fixed" : "absolute -translate-y-1/2"}
            ${currentSlide === 1 && "hidden opacity-0"}`}
        >
          <span
            className="
            relative h-2 w-4
            [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-white transform-[rotate(-90deg)]
            after:content-[''] after:absolute after:h-full after:w-full after-left-1/2 after:-translate-x-1/2 after:top-0.75
            after:[clip-path:polygon(50%_0%,0%_100%,100%_100%)] after:bg-gray-800"
          />
        </button>
        <button
          onClick={scrollNext}
          className={`
            absolute flex items-center justify-center w-9 aspect-square top-1/2 -translate-y-1/2 right-4
            rounded-full bg-gray-800 opacity-75 cursor-pointer z-50 hover:bg-gray-900
            ${fullscreen ? "fixed" : "absolute -translate-y-1/2"}
            ${currentSlide === images.length && "hidden opacity-0"}`}
        >
          <span
            className="
            relative h-2 w-4
            [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-white transform-[rotate(90deg)]
            after:content-[''] after:absolute after:h-full after:w-full after-left-1/2 after:-translate-x-1/2 after:top-0.75
            after:[clip-path:polygon(50%_0%,0%_100%,100%_100%)] after:bg-gray-800"
          />
        </button>

        <div
          ref={scrollRef}
          className="relative flex w-full aspect-5/4 overflow-hidden [scrollbar-width:none] snap-x snap-mandatory scroll-smooth rounded-xl"
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative flex justify-center aspect-5/4"
            >
              <img
                className="absolute blur-xl h-full w-full scale-110"
                src={src}
              />
              <span className="absolute inset-0 bg-black/50"></span>
              <img
                src={src}
                alt={`Gallery Image ${index}`}
                className={`object-contain z-10 snap-center ${
                  fullscreen ? "h-screen w-screen" : "max-h-120"
                }`}
              ></img>
            </div>
          ))}
        </div>

        <div
          className="
          absolute flex items-center justify-around gap-1.5 px-1.5 py-1 
          bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-800 opacity-75 rounded-xl"
        >
          {images.map((src, index) => (
            <span
              key={index}
              className={`h-2 aspect-square rounded-full opacity-75 transition-all duration-500 ${
                currentSlide - 1 == index ? "bg-white" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default GallerySlider;
