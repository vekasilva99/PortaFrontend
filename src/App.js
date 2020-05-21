import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./helpers/Routes";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./helpers/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
