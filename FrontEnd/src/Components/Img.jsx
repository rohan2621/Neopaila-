import { Image } from "@imagekit/react";

export const Img = ({ src, className, alt, w, h, noSize = false }) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      src={src}
      {...(!noSize && w && h ? { width: w, height: h } : {})}
      className={className}
      alt={alt || "Image"}
      loading="lazy"
    />
  );
};
