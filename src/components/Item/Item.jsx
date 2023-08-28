import React from "react";
export const Item = ({ data, origin, setPlaceAfter, handleRemove }) => {
  const [isSomeoneInsideMe, setIsSomeoneInsideMe] = React.useState(false);
  const [isBeingDragged, setBeingDragged] = React.useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", data.id);
    e.dataTransfer.setData("origin", origin);
    setBeingDragged(() => true);
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    setIsSomeoneInsideMe(() => true);
    setPlaceAfter(data.id);
  };
  const handleDrop = () => {
    setIsSomeoneInsideMe(() => false);
    setBeingDragged(() => false);
  };
  const handleDragLeave = () => {
    setIsSomeoneInsideMe(() => false);
  };

  return (
    <h3
      className="item"
      style={{
        boxShadow: isSomeoneInsideMe
          ? "0px -2px 0.7px -0.4px rgba(33,156,194,1)"
          : "none",
      }}
      draggable
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStartCapture={handleDragStart}
      onDrop={handleDrop}
    >
      <button onClick={() => handleRemove(data.id)}>remove</button>
      {data.text}
    </h3>
  );
};