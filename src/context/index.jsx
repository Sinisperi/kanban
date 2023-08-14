import React from "react";

export const RootContext = React.createContext();

const InitState = {
  left: [],
  right: [],
};

const RootReducer = (state = InitState, action) => {
  switch (action.type) {
    case "ADD": {
      const newColumn = state[action.payload.destination];
      newColumn.push(action.payload.data);
      return {
        ...state,
        [action.payload.destination]: newColumn,
      };
    }
    case "DROP": {
      if (
        state[action.payload.destination].filter(
          (i) => i.id === action.payload.id
        )[0]
      )
        return state;
      const itemToMove = state[action.payload.origin].filter(
        (i) => i.id === action.payload.id
      )[0];
      const fromArray = state[action.payload.origin].filter(
        (i) => i.id !== action.payload.id
      );
      const toArray = state[action.payload.destination];
      toArray.push(itemToMove);
      console.log(toArray, fromArray);
      return {
        ...state,
        [action.payload.origin]: fromArray,
        [action.payload.destination]: toArray,
      };
    }
    default: {
      return state;
    }
  }
};

export const RootContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(RootReducer, InitState, () => {
    const store = localStorage.getItem("store");
    console.log(store);
    if (store) {
      return JSON.parse(store);
    } else return InitState;
  });
  React.useEffect(() => {
    localStorage.setItem("store", JSON.stringify(state));
  }, [state]);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};
