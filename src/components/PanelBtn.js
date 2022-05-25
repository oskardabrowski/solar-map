import React from "react";

const PanelBtn = ({ name, ico, PanelHandler, code }) => {
  return (
    <button
      className="buttons-btn"
      onClick={() => PanelHandler(code)}
      title={name}
    >
      {ico}
      <div className="buttons-btn-desc">
        <span>{name}</span>
      </div>
    </button>
  );
};

export default PanelBtn;
