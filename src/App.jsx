import React from "react";
import { RootContext } from "./context";
import { v4 as uuidv4 } from "uuid";
import { Column } from "./components";
import { Actions } from "./context/actions";

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
      type: Actions.CREATE_ITEM,
      payload: {
        destination: Object.keys(state)[0],
        data: { text: input.item, id: uuidv4() },
      },
    });
    setInput(() => InitInput);
  };
  const handleAddColumn = () => {
    dispatch({
      type: Actions.CREATE_COLUMN,
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
