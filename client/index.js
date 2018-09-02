import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({uri: GRAPHQL_URI});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Connect 4</div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
