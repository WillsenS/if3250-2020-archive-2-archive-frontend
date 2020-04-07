import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
};

const StateUserContext = createContext();
const DispatchUserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_user':
      return {
        ...state,
        user: action.payload,
      }
    case 'remove_user':
      return {
        ...state,
        user: null
      }
    default:
      throw new Error('No action type was given.');
  }
};

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateUserContext.Provider value={state}>
      <DispatchUserContext.Provider value={dispatch}>
        {props.children}
      </DispatchUserContext.Provider>
    </StateUserContext.Provider>
  );
};

export { UserProvider, StateUserContext, DispatchUserContext };