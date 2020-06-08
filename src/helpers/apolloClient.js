import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

//const endpoint = "https://examplee/graphql";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://porta-api.herokuapp.com/graphql"
});

const client = new ApolloClient({
  cache,
  link,
});

export default client;
