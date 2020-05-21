import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/scss/index.scss";
import "./assets/fonts/Roboto-Black.ttf";
import "./assets/fonts/Roboto-BlackItalic.ttf";
import "./assets/fonts/Roboto-Bold.ttf";
import "./assets/fonts/Roboto-BoldItalic.ttf";
import "./assets/fonts/Roboto-Italic.ttf";
import "./assets/fonts/Roboto-Light.ttf";
import "./assets/fonts/Roboto-LightItalic.ttf";
import "./assets/fonts/Roboto-Medium.ttf";
import "./assets/fonts/Roboto-MediumItalic.ttf";
import "./assets/fonts/Roboto-Regular.ttf";
import "./assets/fonts/Roboto-Thin.ttf";
import "./assets/fonts/Roboto-ThinItalic.ttf";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
