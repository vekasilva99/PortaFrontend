import gql from "graphql-tag";
export const LOGIN_USER = gql`
  query($mail: String!, $password: String!) {
    userLogin(mail: $mail, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const ADMIN_LOGIN = gql`
  query($mail: String!, $password: String!) {
    adminLogin(mail: $mail, password: $password) {
      adminId
      token
      tokenExpiration
    }
  }
`;

export const DRIVER_LOGIN = gql`
  query($mail: String!, $password: String!) {
    repartidorLogin(mail: $mail, password: $password) {
      repartidorId
      token
      tokenExpiration
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
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
    repartidores {
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
      rating
      createdAt
      updatedAt
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
      rating
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
    newestRepartidores {
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
      rating
      createdAt
      updatedAt
    }
  }
`;
