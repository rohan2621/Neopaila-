import { useState } from "react";
import { Image } from "@imagekit/react";

const ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

export const Img = ({
  src,
  className,
  alt,
  w,
  h,
  noSize = false,
  fallback = "/placeholder.jpg",
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setImgSrc(fallback);
    }
  };

  // If no endpoint configured, just render a plain img
  if (!ENDPOINT || errored) {
    return (
      <img
        src={imgSrc}
        alt={alt || "Image"}
        className={className}
        loading="lazy"
        onError={handleError}
        {...(!noSize && w ? { width: w } : {})}
        {...(!noSize && h ? { height: h } : {})}
      />
    );
  }

  return (
    <Image
      urlEndpoint={ENDPOINT}
      src={imgSrc}
      alt={alt || "Image"}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 10 }}
      onError={handleError}
      {...(!noSize && w && h
        ? { width: w, height: h }
        : w && h
          ? { transformation: [{ width: w, height: h }] }
          : {})}
    />
  );
};
