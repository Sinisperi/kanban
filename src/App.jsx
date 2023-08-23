import React from "react";
import { RootContext } from "./context";
import { v4 as uuidv4 } from "uuid";

// TODO: Every item has to know its current position in the list by storing and its current index
const Item = ({ data, origin, setPlaceAfter }) => {
  const [isSomeoneInsideMe, setIsSomeoneInsideMe] = React.useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", data.id);
    e.dataTransfer.setData("origin", origin);
    e.stopPropagation();
  };

  const handleDragEnd = () => {
    // setIsSomeoneInsideMe(() => false);
  };
  const handleDragEnter = (e) => {
    setIsSomeoneInsideMe(() => true);
    console.log("someone entered the", data.text);
    setPlaceAfter(data.id);
  };
  const handleDrop = () => {
    setIsSomeoneInsideMe(() => false);
  };
  const handleDragLeave = () => {
    setIsSomeoneInsideMe(() => false);
    console.log("left the", data.text);
  };
  return (
    <h3
      style={{ borderTop: isSomeoneInsideMe ? "1px solid red" : "none" }}
      draggable
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStartCapture={handleDragStart}
      onDragEndCapture={handleDragEnd}
      onDrop={handleDrop}
    >
      {data.text}
    </h3>
  );
};

const Column = ({ name, placeAfter, setPlaceAfter }) => {
  const { state, dispatch } = React.useContext(RootContext);
  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("id");
    const origin = e.dataTransfer.getData("origin");
    dispatch({
      type: "DROP",
      payload: { origin, destination: name, id, placeAfter },
    });
  };
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h1>{name}</h1>
      {state[name].map((i) => (
        <Item key={i.id} data={i} origin={name} setPlaceAfter={setPlaceAfter} />
      ))}
    </div>
  );
};

const InitInput = {
  item: "",
  column: "",
};
export const App = () => {
  const { state, dispatch } = React.useContext(RootContext);
  const [input, setInput] = React.useState(InitInput);
  const [placeAfter, setPlaceAfter] = React.useState();
  const handleAddItem = () => {
    dispatch({
      type: "ADD",
      payload: {
        destination: Object.keys(state)[0],
        data: { text: input.item, id: uuidv4() },
      },
    });
    setInput(() => InitInput);
  };
  const handleAddColumn = () => {
    dispatch({
      type: "NEW_COL",
      payload: {
        name: input.column,
      },
    });
    setInput(() => InitInput);
  };
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setInput((i) => ({ ...i, [field]: value }));
  };

  return (
    <div className="container">
      <input
        value={input.item}
        onChange={handleChange}
        type="text"
        placeholder="item text"
        name="item"
      />
      <button onClick={handleAddItem}>Add</button>
      <input
        value={input.column}
        onChange={handleChange}
        type="text"
        name="column"
        placeholder="column name"
      />
      <button onClick={handleAddColumn}>Add</button>

      {Object.keys(state).map((i) => (
        <Column
          name={i}
          placeAfter={placeAfter}
          setPlaceAfter={setPlaceAfter}
        />
      ))}
    </div>
  );
};
