import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

export default function Images() {
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      <h1 className="title"></h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName="sinkoverflow"
              publicId={imageId}
              width="300"
              crop="scale"
            />
          ))}
      </div>
    </div>
  );
}
