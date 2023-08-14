import React from "react";
import { RootContext } from "./context";
import { v4 as uuidv4 } from "uuid";

const Item = ({ data, origin, setNewIndex }) => {
  const [isSomeoneInsideMe, setIsSomeoneInsideMe] = React.useState(false);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("id", data.id);
    e.dataTransfer.setData("origin", origin);
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    setIsSomeoneInsideMe(() => true);
    console.log("entered the", data.text);
  };

  const handleDragLeave = () => {
    setIsSomeoneInsideMe(() => false);
    console.log("left the", data.text);
  };
  return (
    <h3
      style={{ color: isSomeoneInsideMe ? "red" : "black" }}
      draggable
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={handleDragLeave}
      onDragStartCapture={(e) => handleDragStart(e)}
    >
      {data.text}
    </h3>
  );
};

// const Column = ({ name, items }) => {
//   <div
//     onDragOver={(e) => e.preventDefault()}
//     onDragEnter={() => console.log("asdf")}
//     onDrop={(e) => handleDrop(e)}
//     className="column"
//   >
//     <h1>{name}</h1>
//     {state.left.map((i) => {
//       return (
//         <Item key={i.id} data={i} origin="left" setNewIndex={setNewPlace} />
//       );
//     })}
//   </div>;
// };

// Column passes a index grabbing function to an Item (handleDragEnter) and sorts it after drop using that index
// Columns are stored in state inside of an array to ease the addition of new columns (?)
export const App = () => {
  const { state, dispatch } = React.useContext(RootContext);
  const [input, setInput] = React.useState("");
  const [newPlace, setNewPlace] = React.useState();
  React.useEffect(() => {
    console.log(input);
  }, [input]);
  // Abstact columns to prevent hardcoding functions on drop for each column
  const handleDropLeft = (e) => {
    const id = e.dataTransfer.getData("id");
    const origin = e.dataTransfer.getData("origin");
    dispatch({ type: "DROP", payload: { origin, destination: "left", id } });
  };
  const handleDropRight = (e) => {
    const id = e.dataTransfer.getData("id");
    const origin = e.dataTransfer.getData("origin");
    dispatch({ type: "DROP", payload: { origin, destination: "right", id } });
  };
  const handleAdd = () => {
    dispatch({
      type: "ADD",
      payload: { destination: "left", data: { text: input, id: uuidv4() } },
    });
    setInput(() => "");
  };
  const handleChange = (e) => {
    setInput(() => e.target.value);
  };

  return (
    <div className="container">
      <input
        value={input}
        onChange={handleChange}
        type="text"
        placeholder="item text"
      />
      <button onClick={handleAdd}>Add</button>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropLeft(e)}
        className="column"
      >
        <h1>LEft</h1>
        {state.left.map((i) => {
          return (
            <Item key={i.id} data={i} origin="left" setNewIndex={setNewPlace} />
          );
        })}
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDropRight(e)}
        className="column"
      >
        <h1>Right</h1>
        {state.right.map((i) => {
          return (
            <Item
              key={i.id}
              data={i}
              origin="right"
              setNewIndex={setNewPlace}
            />
          );
        })}
      </div>
    </div>
  );
};
