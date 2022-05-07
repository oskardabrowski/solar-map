import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LayersReducer from "./LayersReducer";

const store = configureStore({
  reducer: {
    layers: LayersReducer,
  },
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
