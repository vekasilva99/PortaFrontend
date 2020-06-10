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

export const UPDATE_USER = gql`
  mutation($updateInput: UpdateUserInput!) {
    updateUser(updateInput: $updateInput) {
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
