import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./store/store";

interface StoresContext {
  store: Store;
}

const store = new Store();

export const Context = createContext<StoresContext>({ store });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>,
);
