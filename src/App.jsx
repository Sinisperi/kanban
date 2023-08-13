import React from "react";
import { RootContext } from "./context";

const Item = ({ data, origin }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", data.id);
    e.dataTransfer.setData("origin", origin);
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    console.log(data.id);
  };
  return (
    <h3
      draggable
      onDragEnter={(e) => handleDragEnter(e)}
      onDragStartCapture={(e) => handleDragStart(e)}
    >
      {data.text}
    </h3>
  );
};

export const App = () => {
  const { state, dispatch } = React.useContext(RootContext);
  React.useEffect(() => {
    console.log(state);
  }, [state]);

  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("id");
    const origin = e.dataTransfer.getData("origin");
    const last = e.dataTransfer.getData("lastDraggedOver");
    console.log(id, origin, last);
  };

  return (
    <div className="container">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => console.log("asdf")}
        onDrop={(e) => handleDrop(e)}
        className="column"
      >
        <h1>Pick</h1>
        <Item data={{ text: "ShiteF", id: 13 }} origin="Pasdf" />
        <Item data={{ text: "Apples", id: 11 }} origin="Pasdf" />
      </div>
      <div className="column">
        <h1>Drop</h1>
      </div>
    </div>
  );
};
