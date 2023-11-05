import { useState } from "react";

function SelectItems({ selectedCount = 0, images, setImages }) {
  const [checked, setChecked] = useState(true);

  const handleImageClick = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
  };

  const handelImageDeselect = () => {
    const updatedImages = images.map((image) => ({
      ...image,
      selected: false,
    }));
    
    setImages(updatedImages);
    !setChecked;
  };

  return (
    <>
      {selectedCount > 0 ? (
        <div className="w-full flex justify-between items-center px-5 py-4 border-b">
          <div className="flex items-center justify-start gap-2">
            <input
              type="checkbox"
              value=""
              name="bordered-checkbox"
              onChange={handelImageDeselect}
              checked={checked}
              className=" w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="font-semibold text-lg">
              {selectedCount} items selected
            </span>
          </div>
          <button
            type="button"
            className="px-3 py-2 rounded-3xl hover:bg-red-100 text-red-600"
            onClick={handleImageClick}
          >
            Delete Image
          </button>
        </div>
      ) : (
        <div className=" px-5 py-4 border-b text-xl font-semibold">
          Image Gallery
        </div>
      )}
    </>
  );
}


export default SelectItems;
