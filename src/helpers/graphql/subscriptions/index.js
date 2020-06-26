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
      succeeded
      createdAt
      updatedAt
    }
  }
`;
