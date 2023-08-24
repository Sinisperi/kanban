import React from "react";
import { RootContext } from "../context";
import { Item } from "./Item";
import { Actions } from "../context/actions";
export const Column = ({ name, placeAfter, setPlaceAfter }) => {
  const { state, dispatch } = React.useContext(RootContext);
  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("id");
    const origin = e.dataTransfer.getData("origin");
    dispatch({
      type: Actions.DROP_ITEM,
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
