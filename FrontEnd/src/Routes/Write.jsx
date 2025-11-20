import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import { useNavigate } from "react-router";
import Uploads from "../Components/Uploads";
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
export const Write = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [value, setValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    img && setValue((pre) => pre + `<p><image src="${img.url}"/></p>`);
  }, [img]);
  useEffect(() => {
    video &&
      setValue(
        (pre) =>
          pre + `<p><iframe classname="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
    onError: (err) => {
      toast.error("Error creating post:");
    },
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (isLoaded && !isSignedIn) return <div>You should log in.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      img:cover.filePath ||"",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Uploads type={"image"} setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="p-2 w-max shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Add a cover image
          </button>
        </Uploads>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          name="title"
          type="text"
          placeholder="My Awesome Story"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a category:</label>
          <select name="category" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="web-desgin">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">SEO</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2 ">
            <Uploads type={"image"} setProgress={setProgress} setData={setImg}>
              <button
                type="button"
                className="p-2 w-max shadow-md rounded-xl text-sm text-gray-500 bg-white"
              >
                🌆
              </button>
            </Uploads>
            <Uploads
              type={"video"}
              setProgress={setProgress}
              setData={setVideo}
            >
              <button
                type="button"
                className="p-2 w-max shadow-md rounded-xl text-sm text-gray-500 bg-white"
              >
                ▶
              </button>
            </Uploads>
          </div>
          <ReactQuill
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            theme="snow"
            readOnly={progress > 0 && progress < 100}
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-[#540000] disabled:cursor-not-allowed disabled:bg-[#ffafafaf] mt-4 p-2 w-36 hover:cursor-pointer text-white font-medium rounded-xl"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};
