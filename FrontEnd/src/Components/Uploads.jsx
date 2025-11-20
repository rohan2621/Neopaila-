import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};
const Uploads = ({ type, children, setProgress, setData }) => {
  const ref = useRef(null);
  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed");
  };
  const onSuccess = (res) => {
    console.log(res);
    toast.success("Image uploaded successfully!");
    setData(res);
  };
  const onUploadProgress = (progress) => {
    console.log(progress);

    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onSuccess={onSuccess}
        onError={onError}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Uploads;
