import React from "react";
import { appActions } from "jimu-core";

const Widget = (props) => {
  const placeholder = props?.config?.placeholder || "Enter text...";
  const font = props?.config?.fontFamily || "Arial";
  const showPlaceholderText = props?.config?.showText || "";


  const rawFontSize = props?.config?.fontSize || "16";
  const fontSize = typeof rawFontSize === "string" && rawFontSize.includes("px")
    ? rawFontSize
    : `${rawFontSize}px`;

  return (
    <input
      type={showPlaceholderText === "No" ? 'password' : 'text'}
      style={{ fontSize, fontFamily: font }}
      placeholder={placeholder}
    />
  );
};

export default Widget;
