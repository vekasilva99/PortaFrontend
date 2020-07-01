import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const endpoint = "https://porta-api.herokuapp.com/graphql";
const endpointWs = "wss://porta-api.herokuapp.com/graphql";
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: endpoint,
  //uri: "http://localhost:4000/graphql"
});
const token = localStorage.getItem("token");
const wsLink = new WebSocketLink({
  uri: endpointWs,
  //uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true, // reconecta si ocurre algun error
    lazy: true, // solo establece la coneccion cuando se ejecute una subscription
    connectionParams: {
      authToken: token ? `Bearer ${token}` : "", // se pasa el token como parametro
      // que unicamente usuarios pueden subscribirse en el servidor
    },
  },
});

const authLink = setContext((_, { headers }) => {
  // obtiene el token de autorizacion si existe del local storage
  const token = localStorage.getItem("token");
  // retorna el headers al context entonces httpLink podra leerlo
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  wsLink,
  cache,
});

export default client;
