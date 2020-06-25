import gql from "graphql-tag";
export const NOTIFICATION_ADDED_SUSCRIPTION = gql`
  {
    notificationAdded {
      _id
    }
  }
`;
