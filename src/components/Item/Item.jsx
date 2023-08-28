import React from "react";
import "./item.css";
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
    <div
      className="item"
      style={{
        boxShadow: isSomeoneInsideMe ? "0px -4px 0.7px -1px #ffc857" : "none",
      }}
      draggable
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStartCapture={handleDragStart}
      onDrop={handleDrop}
    >
      <h4>
        <button onClick={() => handleRemove(data.id)}>remove</button>
        {data.text}
      </h4>
    </div>
  );
};
