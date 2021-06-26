import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { dataURLtoFile } from "helpers/CommonHelper";
import "./style.scss";

const Index = ({ handleCapture = () => {}, isOpen = true, name = "image-camera" }) => {
  function handleTakePhotoAnimationDone(dataUri) {
    const file = dataURLtoFile(dataUri);
    const result = {
      base64: dataUri,
      file: {
        originFileObj: file,
        status: "done",
        name,
      },
    };

    handleCapture(result);
  }
  if (!isOpen) return <></>;
  return (
    <div className="capture-image">
      <Camera
        onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
        isMaxResolution={true}
        isImageMirror={false}
        isSilentMode={false}
        isDisplayStartCameraError={false}
        isFullscreen={false}
        sizeFactor={1}
      />
    </div>
  );
};

export default Index;
