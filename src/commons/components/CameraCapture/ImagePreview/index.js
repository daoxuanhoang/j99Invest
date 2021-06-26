import React from "react";

import "./style.scss";

const Index = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? "demo-image-preview-fullscreen" : "";

  return (
    <div className={"demo-image-preview " + classNameFullscreen}>
      <img src={dataUri} />
    </div>
  );
};

export default Index;
