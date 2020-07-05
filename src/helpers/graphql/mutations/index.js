import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation($mail: String!, $password: String!, $role: String!) {
    userLogin(mail: $mail, password: $password, role: $role) {
      user {
        _id
        role
        name
        lastName
        birthdate
        mail
        zone
        cellphone
        available
        latitud
        longitud
        workingStatus
        vehiculo
        licencia
        carnetCirculacion
        seguroVehiculo
        currentOrder {
          _id
          pickUp
          deliver
          km
          price
          status
          user {
            _id
            role
            name
            lastName
            birthdate
            mail
          }
          repartidor {
            _id
            role
            name
            lastName
            birthdate
            mail
          }
          messages {
            content
            createdAt
            sender {
              _id
              role
              name
              lastName
              birthdate
              mail
            }
            receiver {
              _id
              role
              name
              lastName
              birthdate
              mail
            }
          }
        }
        createdAt
        updatedAt
      }
      token
      tokenExpiration
    }
  }
`;

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
  mutation($user: ID!, $repartidor: ID!, $content: String!) {
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
  mutation($lat: String!, $lng: String!) {
    changeAvailable(lat: $lat, lng: $lng) {
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

export const MAKE_ORDER = gql`
  mutation($orderInput: OrderInput!) {
    createOrder(orderInput: $orderInput) {
      _id
      user {
        _id
        name
        lastName
      }
      pickUp
      deliver
      km
      price
      status
      concluded
      createdAt
      updatedAt
    }
  }
`;

export const ACCEPT_ORDER = gql`
  mutation($orderId: String!, $repartidor: String!) {
    acceptOrder(orderId: $orderId, repartidor: $repartidor) {
      _id
      pickUp
      deliver
      km
      price
    }
  }
`;

export const UPDATE_LOCATION_DRIVER = gql`
  mutation($lat: String!, $lng: String!) {
    updateLocationDriver(lat: $lat, lng: $lng) {
      _id
      latitud
      longitud
      mail
      password
      zone
      cellphone
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($messageInput: MessageInput!) {
    createMessage(messageInput: $messageInput) {
      _id
      content
      createdAt
      order {
        _id
      }
      sender {
        _id
        name
        lastName
        mail
      }
      receiver {
        _id
        name
        lastName
        mail
      }
    }
  }
`;
