import React from "react";

const ButtonComponent = ({
  Icon,
  name,
  width = "auto",
  height = "auto",
  onClick,
  fontSize = "15px",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: fontSize,
        height: height,
        width: width,
        padding: "10px 30px",
        border: "none",
        outline: "none",
        borderRadius: "2px",
        backgroundColor: "#194a7a",
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
