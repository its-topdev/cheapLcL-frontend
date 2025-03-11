import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/fonts/Inter/Inter-Black.ttf";
import "./assets/fonts/Inter/Inter-Bold.ttf";
import "./assets/fonts/Inter/Inter-ExtraBold.ttf";
import "./assets/fonts/Inter/Inter-ExtraLight.ttf";
import "./assets/fonts/Inter/Inter-Light.ttf";
import "./assets/fonts/Inter/Inter-Medium.ttf";
import "./assets/fonts/Inter/Inter-Regular.ttf";
import "./assets/fonts/Inter/Inter-SemiBold.ttf";
import "./assets/fonts/Inter/Inter-Thin.ttf";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
