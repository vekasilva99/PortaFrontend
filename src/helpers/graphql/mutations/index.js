import gql from "graphql-tag";
export const REGISTER_USER = gql`
  mutation($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      name
      lastName
      birthdate
      mail
      password
      zone
      cellphone
    }
  }
`;
