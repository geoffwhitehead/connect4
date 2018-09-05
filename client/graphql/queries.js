import gql from "graphql-tag";

export const TOP_TEN = gql`
  query topTen {
    topTen {
      name, 
      wins
    }
  }
`
