import { useEffect, useState } from "react";

const SingleImage = ({ url }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomX, setZoomX] = useState(null);
  const [zoomY, setZoomY] = useState(null);

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

  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
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
        className={`flex items-center justify-center transform duration-150 ease-in-out overflow-hidden ${
          fullscreen
            ? "fixed w-screen inset-0 z-100"
            : "relative w-150 rounded-xl border border-gray-200"
        }`}
      >
        <img className="absolute blur-xl h-full w-full scale-110" src={url} />
        <span
          className={`absolute inset-0 ${
            fullscreen ? "bg-black/70" : "bg-black/60"
          }`}
        ></span>
        <img
          onClick={fullscreen ? handleZoom : undefined}
          src={url}
          alt="Post Image"
          className={`object-contain z-10 
                ${fullscreen ? "h-screen max-w-[70vw]" : "max-h-120"} 
                ${
                  fullscreen &&
                  (isZoomed ? "scale-175 cursor-zoom-out" : "cursor-zoom-in")
                }`}
          style={{ transformOrigin: `${zoomX}px ${zoomY}px` }}
        />
      </div>
    </>
  );
};

export default SingleImage;
