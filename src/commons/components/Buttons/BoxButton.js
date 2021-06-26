import React from "react";
import "./styles.scss";

export default function BoxButton({ icon, title = "", description = "", customClass = "" }) {
  return (
    <div className={`btn-item ${customClass}`}>
      {icon && (
        <div className="btn-icon">
          <img alt="icon" width="40" height="40" src={icon} target="_blank" />
        </div>
      )}
      <div className="btn-body">
        {title && <p>{title}</p>}
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}
