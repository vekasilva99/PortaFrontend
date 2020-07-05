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
      pickUpLat
      pickUpLng
      deliver
      deliverLat
      deliverLng
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
      pickUpLat
      pickUpLng
      deliver
      deliverLat
      deliverLng
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
  subscription($orderId: String!) {
    newMessage(orderId: $orderId) {
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

export const ORDER_UPDATE = gql`
  subscription($userId: String!) {
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
      pickUpLat
      pickUpLng
      deliver
      deliverLat
      deliverLng
      km
      price
      status
      concluded
      createdAt
      updatedAt
    }
  }
`;

export const DRIVER_ADDED = gql`
  subscription {
    addDriver {
      _id
      role
      name
      lastName
      birthdate
      mail
      zone
      cellphone
      available
      workingStatus
      vehiculo
      licencia
      carnetCirculacion
      seguroVehiculo
      createdAt
      updatedAt
      longitud
      latitud
    }
  }
`;
