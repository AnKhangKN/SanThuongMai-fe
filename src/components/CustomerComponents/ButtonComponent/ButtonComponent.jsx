import React from "react";

const ButtonComponent = ({
  Icon,
  name,
  width = "auto",
  height = "auto",
  onClick,
}) => {
  return (
    <button
      onClick={onClick} // Properly handling onClick event
      style={{
        height: height,
        width: width,
        padding: "10px 30px",
        border: "none",
        outline: "none",
        borderRadius: "2px",
        backgroundColor: "#f53d2d",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {Icon && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          <Icon />
        </div>
      )}

      {name}
    </button>
  );
};

export default ButtonComponent;
