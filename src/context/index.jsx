import React from "react";

export const RootContext = React.createContext();

class LinkedList {
  head = null;
  length = 0;
}

const InitState = {
  left: [],
  right: [],
};

const indOf = (id, arr) => {
  let ind = 0;
  for (let i of arr) {
    if (i.id === id) return ind;
    ind++;
  }
  return undefined;
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
      const itemToMove = state[action.payload.origin].filter(
        (i) => i.id === action.payload.id
      )[0];
      if (
        state[action.payload.destination].filter(
          (i) => i.id === action.payload.id
        )[0]
      ) {
        const arr = state[action.payload.destination];
        // let ind = 0;
        let arrWithout;
        let arrWith;
        // for (let i of arr) {
        //   if (i.id === action.payload.placeAfter) {
        //     arrWithout = arr.toSpliced(ind, 1);
        //     return { ...state, [action.payload.destination]: arrWithout };
        //   }
        //   ind++;
        // }
        const moveId = indOf(itemToMove.id, arr);
        const moveAfterId = indOf(action.payload.placeAfter, arr);
        arrWithout = arr.toSpliced(moveId, 1);
        arrWith = arrWithout.toSpliced(moveAfterId, 0, itemToMove);
        console.log(arrWith);
        return { ...state, [action.payload.destination]: arrWith };
      }
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
