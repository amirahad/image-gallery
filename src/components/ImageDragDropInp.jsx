import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDragDropInp({ images, setImages }) {
  const [wrongFile, setWrongFile] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      const arrayLastItem = images.slice(-1)[0]; 
      const newImageObject = {
        id: arrayLastItem + 1,
        imageSrc: URL.createObjectURL(file),
        selected: false,
      };
      setImages([...images, newImageObject]);
      setWrongFile && setWrongFile(false);
    } else {
      setWrongFile(true);
    }
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/svg": [],
    },
  });

  return (
    <div
      className="flex justify-center items-center w-full"
      {...getRootProps({ className: "dropzone" })}
      accept="image/*"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-52 bg-gray-300 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 "
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select your image
          </p>

          {wrongFile && (
            <p className="text-xs text-red-500 dark:text-red-400">
              Wrong file select
            </p>
          )}
        </div>
        <input {...getInputProps()} />
      </label>
    </div>
  );
}
