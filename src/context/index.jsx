import React from "react";
import { RootReducer, InitState } from "./reducer";
export const RootContext = React.createContext();
export const RootContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(RootReducer, InitState, () => {
    const store = localStorage.getItem("store");
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
