import React from "react";
export const Item = ({ data, origin, setPlaceAfter }) => {
  const [isSomeoneInsideMe, setIsSomeoneInsideMe] = React.useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", data.id);
    e.dataTransfer.setData("origin", origin);
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    setIsSomeoneInsideMe(() => true);
    setPlaceAfter(data.id);
  };
  const handleDrop = () => {
    setIsSomeoneInsideMe(() => false);
  };
  const handleDragLeave = () => {
    setIsSomeoneInsideMe(() => false);
  };
  return (
    <h3
      style={{ borderTop: isSomeoneInsideMe ? "1px solid red" : "none" }}
      draggable
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStartCapture={handleDragStart}
      onDrop={handleDrop}
    >
      {data.text}
    </h3>
  );
};
