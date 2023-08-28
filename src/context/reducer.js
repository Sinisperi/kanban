import { Actions } from "./actions";

export const InitState = {};

const indOf = (id, arr) => {
  let ind = 0;
  for (let i of arr) {
    if (i.id === id) return ind;
    ind++;
  }
  return undefined;
};

export const RootReducer = (state = InitState, action) => {
  switch (action.type) {
    case Actions.CREATE_COLUMN: {
      const colList = Object.keys(state);
      if (colList.indexOf(action.payload.name) >= 0) {
        return state;
      }

      return { ...state, [action.payload.name]: [] };
    }
    case Actions.REMOVE_COLUMN: {
      const colList = Object.keys(state).filter(
        (i) => i !== action.payload.name
      );
      const newState = {};
      for (let i of colList) {
        newState[i] = state[i];
        console.log(i);
      }

      return newState;
    }
    case Actions.CREATE_ITEM: {
      const newColumn = state[action.payload.destination];
      if (!newColumn) return state;
      newColumn.push(action.payload.data);
      return {
        ...state,
        [action.payload.destination]: newColumn,
      };
    }
    case Actions.DROP_ITEM: {
      const itemToMove = state[action.payload.origin].filter(
        (i) => i.id === action.payload.id
      )[0];
      if (
        state[action.payload.destination].filter(
          (i) => i.id === action.payload.id
        )[0]
      ) {
        const arr = state[action.payload.destination];
        let arrWithout;
        let arrWith;

        const moveId = indOf(itemToMove.id, arr);
        const moveAfterId = indOf(action.payload.placeAfter, arr);
        arrWithout = arr.toSpliced(moveId, 1);
        arrWith = arrWithout.toSpliced(moveAfterId, 0, itemToMove);
        return { ...state, [action.payload.destination]: arrWith };
      }
      const fromArray = state[action.payload.origin].filter(
        (i) => i.id !== action.payload.id
      );
      const toArray = state[action.payload.destination];

      const moveAfterId = indOf(action.payload.placeAfter, toArray);
      if (moveAfterId === undefined) {
        toArray.push(itemToMove);
        return {
          ...state,
          [action.payload.origin]: fromArray,
          [action.payload.destination]: toArray,
        };
      }

      const newArr = toArray.toSpliced(moveAfterId, 0, itemToMove);

      return {
        ...state,
        [action.payload.origin]: fromArray,
        [action.payload.destination]: newArr,
      };
    }

    case Actions.REMOVE_ITEM: {
      const arrayFrom = state[action.payload.column].filter(
        (i) => i.id !== action.payload.id
      );
      return { ...state, [action.payload.column]: arrayFrom };
    }
    default: {
      return state;
    }
  }
};
