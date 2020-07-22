import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./helpers/Routes";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./helpers/apolloClient";
import { Provider } from "react-redux";
import store from "./redux/store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { isWidthDown } from "@material-ui/core";
import AlertTemplate from "react-alert-template-basic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: "5px",

    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
      zIndex: 4000,
      color: "red",
      fontFamily: "Roboto",
    },
  };

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
