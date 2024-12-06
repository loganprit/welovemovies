import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../theme/ThemeContext";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "50px 0px",
  });

  useEffect(() => {
    if (inView && !isLoaded && !error) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [inView, src, isLoaded, error]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className} ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      } ${!isLoaded && "animate-pulse"}`}
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">
            Failed to load image
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
}; 