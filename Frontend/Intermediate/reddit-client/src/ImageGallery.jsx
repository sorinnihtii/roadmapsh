import { useEffect, useRef, useState } from "react";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const ImageGallery = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomX, setZoomX] = useState(null);
  const [zoomY, setZoomY] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isFullscreen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
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
  }, [isFullscreen]);

  const scrollPrev = async (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
    scrollRef.current.scrollBy(-scrollRef.current.clientWidth, 0);
    setIsZoomed(false);
    await delay(500);
    setIsAnimating(false);
  };

  const scrollNext = async (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
    scrollRef.current.scrollBy(scrollRef.current.clientWidth, 0);
    setIsZoomed(false);
    await delay(500);
    setIsAnimating(false);
  };

  const handleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleZoom = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomX(x);
    setZoomY(y);
    setIsZoomed((prev) => !prev);
  };

  return (
    <div
      onClick={!isFullscreen ? handleFullscreen : undefined}
      className={`relative ${isFullscreen ? "h-screen w-screen" : "w-150"}`}
    >
      <div
        ref={scrollRef}
        className={`flex w-full overflow-x-scroll overflow-y-hidden [scrollbar-width:none] snap-x snap-mandatory scroll-smooth ${
          isFullscreen
            ? "fixed inset-0 z-100"
            : "relative rounded-xl border border-gray-200 cursor-pointer"
        }`}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative flex shrink-0 w-150 justify-center object-contain snap-center ease-in-out ${
              isFullscreen ? "h-screen w-screen" : "max-h-120"
            }`}
          >
            <img
              className="absolute blur-xl h-full w-full scale-110"
              src={src}
            />
            <span
              className={`absolute inset-0 ${
                isFullscreen ? "bg-black/70" : "bg-black/60"
              }`}
            ></span>
            <img
              onClick={isFullscreen ? handleZoom : undefined}
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className={`object-contain z-10 ${
                isFullscreen &&
                (isZoomed ? "scale-175 cursor-zoom-out" : "cursor-zoom-in")
              }`}
              style={{ transformOrigin: `${zoomX}px ${zoomY}px` }}
            ></img>
          </div>
        ))}
      </div>

      {isFullscreen && (
        <button
          onClick={handleFullscreen}
          className="
            fixed w-10 h-10 right-10 top-10 z-200
            opacity-75 bg-gray-800 hover:bg-gray-900 text-white rounded-full cursor-pointer"
        >
          <pre>✖</pre>
        </button>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className={`
              flex items-center justify-center w-9 aspect-square top-1/2 -translate-y-1/2
              rounded-full bg-gray-800 opacity-75 cursor-pointer z-250 hover:bg-gray-900
              ${isFullscreen ? "fixed left-10" : "absolute left-4"}
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
              absolute flex items-center justify-center w-9 aspect-square top-1/2 -translate-y-1/2
              rounded-full bg-gray-800 opacity-75 cursor-pointer z-300 hover:bg-gray-900
              ${isFullscreen ? "fixed right-10" : "absolute right-4"}
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
            className={`
              flex items-center justify-around gap-1.5 px-1.5 py-1 
              bottom-4 left-1/2 -translate-x-1/2 z-250 bg-gray-800 opacity-75 rounded-xl
              ${isFullscreen ? "fixed" : "absolute"}`}
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
        </>
      )}
    </div>
  );
};

export default ImageGallery;
