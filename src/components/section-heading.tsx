import React from "react";

const UniqueHeading = ({
  text = "Your Heading",
  textColor = "text-slate-50",
  bgCut = false,
  bgCutColor = "bg-blue-200",
  highlight = "",
  highlightColor = "bg-white/30", // transparent white
  highlightTextColor = "text-slate-50", // visible on light background
  className = "",
}) => {
  const highlightIndex = text.indexOf(highlight);
  const before = highlightIndex !== -1 ? text.slice(0, highlightIndex) : text;
  const highlighted = highlightIndex !== -1 ? highlight : "";
  const after =
    highlightIndex !== -1 ? text.slice(highlightIndex + highlight.length) : "";

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main Background Cut */}
      {bgCut && (
        <div
          className={`
            absolute inset-0 -z-10 rounded-xl
            transform  -skew-y-3 translate-y-4 -translate-x-6
            ${bgCutColor} opacity-50
          `}
        />
      )}

     

      <h1
        className={`font-extrabold tracking-tight relative ${textColor}`}
        aria-label={text}
      >
        <span>{before}</span>
        {highlighted && (
          <span
            className={`
              relative inline-block px-3 py-1 mx-1
              ${highlightColor} ${highlightTextColor}
              backdrop-blur-md  shadow-inner ring-1 ring-white/30
            `}
          >
            {highlighted}
          </span>
        )}
        <span>{after}</span>
      </h1>
    </div>
  );
};

export default UniqueHeading;
