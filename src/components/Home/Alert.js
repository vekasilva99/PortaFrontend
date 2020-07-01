export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageSentSubscription {
    messageSent {
      id
      from
      message
    }
  }
`;
