import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./helpers/Routes";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./helpers/apolloClient";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}> 
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
