import { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import SelectItems from "./components/SelectItems";
import dummyImages from "./utils/data.json";

function App() {
  const [images, setImages] = useState([...dummyImages]);

  const selectedItemCount = images.filter((image) => image.selected).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl m-auto py-5">
        <div className="bg-white rounded-lg shadow-md !container mx-auto">
          <SelectItems
            selectedCount={selectedItemCount}
            images={images}
            setImages={setImages}
          />
          <ImageGallery images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  );
}

export default App;
