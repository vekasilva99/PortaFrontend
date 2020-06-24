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

export const CREATE_COMMENT = gql`
  mutation($user: ID!, $repartidor:ID!, $content: String!) {
    createComment(user: $user, repartidor: $repartidor, content: $content) {
      _id
      content
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation($commentId: ID!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      _id
      content
    }
  }
`;

export const CHANGE_AVAILABLE = gql`
  mutation{
    changeAvailable{
      _id
      available
      name
      lastName
    }
  }
`;


export const RATE_DRIVER = gql`
  mutation($user: ID!, $repartidor: ID!, $score: Int!) {
    createRate(user: $user, repartidor: $repartidor, score: $score) {
      _id
      score
    }
  }
`;


