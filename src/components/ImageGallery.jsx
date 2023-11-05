import update from "immutability-helper";
import { useCallback } from "react";
import ImageCard from "./ImageCard";
import ImageDragDropInp from "./ImageDragDropInp";

function ImageGallery({ images, setImages }) {
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const selectedImage = (id) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === id) {
          return { ...image, selected: !image.selected };
        }
        return image;
      });
    });
  };

  const renderCard = useCallback((image, idx) => {
    const { id, imageSrc, selected } = image || {};
    return (
      <ImageCard
        key={id}
        index={idx}
        id={id}
        imageSrc={imageSrc}
        moveCard={moveCard}
        selected={selected}
        onClick={selectedImage}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-4 py-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 [&>*:first-child]:row-span-2 [&>*:first-child]:col-span-2 [&>*:first-child]:h-[27rem] [&>*]:rounded-lg [&>*]:border [&>*]:w-full [&>*]:h-52 [&>*]:bg-gray-300">
        {images?.map((card, idx) => renderCard(card, idx))}
        <ImageDragDropInp images={images} setImages={setImages} />
      </div>
    </div>
  );
}

export default ImageGallery;
