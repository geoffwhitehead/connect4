import gql from "graphql-tag";

export const PROCESS_WINNER = gql`
  mutation ProcessWinner($name: String) {
    processWinner(name: $name) {
      id
      name
      wins
    }
  }
`;
