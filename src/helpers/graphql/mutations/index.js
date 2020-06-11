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

export const DRIVER_REQUEST = gql`
  mutation($solicitudInput: SolicitudInput!) {
    createSolicitud(solicitudInput: $solicitudInput) {
      _id
      
    }
  }
`;

export const REVIEW_REQUEST = gql`
  mutation($reviewInput: ReviewInput!) {
    reviewSolicitud(reviewInput: $reviewInput) {
      _id
      
    }
  }
`;

export const CREATE_COMENT = gql`
  mutation($user: ID!, $repartidor:ID!, $content: String!) {
    createComment(user: $user, repartidor: $repartidor, content: $content) {
      _id
      content
    }
  }
`;
