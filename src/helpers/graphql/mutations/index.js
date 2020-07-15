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
        stripeId
        haveCard
        saldo
        orders {
          _id
          repartidor {
            _id
            name
            lastName
            birthdate
            mail
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
          messages {
            _id
            content
            createdAt
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
          createdAt
          updatedAt
        }
        currentOrder {
          _id
          pickUp
          pickUpLat
          pickUpLng
          deliver
          deliverLat
          deliverLng
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
  mutation($user: String!, $repartidor: ID!, $content: String!) {
    createComment(user: $user, repartidor: $repartidor, content: $content) {
      _id
      content
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation($commentId: String!, $content: String!) {
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

export const RATE_DRIVER = gql`
  mutation($user: String!, $repartidor: String!, $score: Int!) {
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

export const ACCEPT_ORDER = gql`
  mutation($orderId: String!, $repartidor: String!) {
    acceptOrder(orderId: $orderId, repartidor: $repartidor) {
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

export const ORDER_PICKED_UP = gql`
  mutation($orderId: String!) {
    orderPickedUp(orderId: $orderId) {
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

export const ORDER_ARRIVED = gql`
  mutation($orderId: String!) {
    orderArrived(orderId: $orderId) {
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

export const ORDER_COMPLETED = gql`
  mutation($orderId: String!) {
    orderCompleted(orderId: $orderId) {
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

export const CONTACT_US = gql`
  mutation($contactInput: ContactInput!) {
    contactUs(contactInput: $contactInput)
  }
`;

export const SET_CREDIT_CARD = gql`
  mutation($cardInput: CardInput) {
    setUpCreditCard(cardInput: $cardInput){
      _id
      name
      lastName
      stripeId
    }
  }
`;

export const SET_INTENT = gql`
  mutation {
    setUpIntent
  }
`;

export const CARD_SAVED = gql`
  mutation {
    cardSaved{
      name
      haveCard
    }
  }
`;

export const COLLECT_PAY = gql`
  mutation {
    collectPay{
      name
      lastName
      saldo
    }
  }
`;
