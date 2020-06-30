import gql from "graphql-tag";

export const LOGIN_USER = gql`
  query($mail: String!, $password: String!, $role: String!) {
    userLogin(mail: $mail, password: $password, role: $role) {
      user{
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
      }
      token
      tokenExpiration
    }
  }
`;

export const GET_USERS = gql`
  {
    costumers {
      _id
      name
      lastName
      birthdate
      mail
      zone
      cellphone
      orders {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_REPARTIDORES = gql`
  {
    drivers {
      _id
      cedula
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
      placaVehiculo
      rating {
        score
      }
      comments {
        content
        user {
          name
          lastName
        }
      }
      orders {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_REQUESTS = gql`
  {
    solicitudes {
      _id
      experience
      vehiculo
      licencia
      carnetCirculacion
      seguroVehiculo
      status
      placaVehiculo
      repartidor {
        _id
        cedula
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
      }
    }
  }
`;

export const LIST_OF_REPARTIDORES = gql`
  {
    drivers {
      _id
      name
      lastName
      mail
    }
  }
`;

export const CURRENT_USER = gql`
  {
    currentUser {
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
    }
  }
`;

export const NEW_USERS = gql`
  {
    newestUsers {
      _id
      name
      lastName
      birthdate
      mail
      zone
      cellphone
      createdAt
      updatedAt
    }
  }
`;

export const NEW_REPARTIDORES = gql`
  {
    newestDrivers {
      _id
      cedula
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
      placaVehiculo
      rating {
        score
      }
      createdAt
      updatedAt
    }
  }
`;

export const SELECTED_DRIVER = gql`
  query($driverId: ID!) {
    selectedDriver(driverId: $driverId) {
      _id
      cedula
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
      placaVehiculo
      rating {
        score
        user {
          _id
          name
          lastName
        }
      }
      comments {
        _id
        content
        user {
          _id
          name
          lastName
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const SELECTED_REQUEST = gql`
  query($solicitudId: ID!) {
    selectedRequest(solicitudId: $solicitudId) {
      _id
      vehiculo
      licencia
      experience
      seguroVehiculo
      carnetCirculacion
      placaVehiculo
      repartidor {
        _id
        cedula
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
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORDERS = gql`
  {
    orders {
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

export const MESSAGES = gql`
  query($user: ID!) {
    messages(user: $user) {
      _id
      content
      createdAt
      conversation{
        _id
      }
      sender{
        _id
        name
        lastName
        mail
      }
      receiver{
        _id
        name
        lastName
        mail
      }
    }
  }
`;
