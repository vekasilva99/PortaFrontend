import gql from "graphql-tag";


export const LOGIN_USER = gql`
  query($mail: String!, $password: String!, $role: String!) {
    userLogin(mail: $mail, password: $password, role: $role) {
      userId
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
      rating{
        score
      }
      comments{
        content
        user{
    	  	name
          lastName
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_REQUESTS = gql`
  {
    solicitudes{
    _id
    experience
    vehiculo
    licencia
    carnetCirculacion
    seguroVehiculo
    status
    repartidorID{
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

export const CURRENT_ADMIN = gql`
  {
    currentAdmin {
      _id
      mail
    }
  }
`;

export const CURRENT_DRIVER = gql`
  {
    currentRepartidor {
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
      rating{
        score
      }
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
      rating{
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
      rating{
        score
      }
      comments{
        content
        user{
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
    repartidorID{
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
