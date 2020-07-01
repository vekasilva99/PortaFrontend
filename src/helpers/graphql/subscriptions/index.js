import gql from "graphql-tag";

export const NOTIFICATION_ADDED_SUSCRIPTION = gql`
  subscription {
    notificationAdded {
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

export const NOTIFICATION_DELETED_SUSCRIPTION = gql`
  subscription {
    notificationDeleted {
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

export const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      _id
      content
      createdAt
      conversation {
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

export const ORDER_UPDATE = gql`
  subscription($userId: ID!) {
    orderUpdate(userId: $userId) {
      _id
      user {
        _id
        name
        lastName
      }
      repartidor {
        _id
        name
        lastName
        latitud
        longitud
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
