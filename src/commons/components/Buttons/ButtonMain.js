import React from "react";

import "./styles.scss";

const Index = ({ type, className = "", children, ...exProps }) => {
  return (
    <button type={type || "button"} className={`button-main ${className}`} {...exProps}>
      {children}
    </button>
  );
};

export default Index;
