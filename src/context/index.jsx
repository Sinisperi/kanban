import React from "react";

export const RootContext = React.createContext();

const InitState = {
  pick: [],
  drop: [],
};

const RootReducer = (state = InitState, action) => {
  console.log(state, "rootred");
  switch (action.type) {
    case "PICK": {
      return { ...state, num: state.num + 1 };
    }
    case "SUB": {
      return { ...state, num: state.num - 1 };
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
