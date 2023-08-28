import React from "react";
import { RootContext } from "../../context";
import { Item } from "../Item/Item";
import { Actions } from "../../context/actions";
import "./column.css";
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

  const removeItem = (id) => {
    dispatch({ type: Actions.REMOVE_ITEM, payload: { column: name, id } });
  };
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <button
        onClick={() =>
          dispatch({ type: Actions.REMOVE_COLUMN, payload: { name: name } })
        }
      >
        delete
      </button>
      <h1 className="column_title">{name}</h1>
      <div className="item_list">
        {state[name].map((i) => (
          <Item
            key={i.id}
            data={i}
            origin={name}
            setPlaceAfter={setPlaceAfter}
            handleRemove={removeItem}
          />
        ))}
      </div>
    </div>
  );
};
