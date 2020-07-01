import { MockedProvider } from "@apollo/react-testing";

import { InputMessage } from "./inputMessage";

import { CREATE_MESSAGE } from "../../helpers/graphql/mutations";

const mocks = {
  request: {
    query: CREATE_MESSAGE,
    variables: {
      inputMessage: {
        content: "mensaje de prueba",
        postId: "",
        userId: ""
      }
    }
  },
  result: {
    data: {
      _id: any,
      content: "mensaje de prueba",
      user: any
    }
  }
};

it("renders without error", () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <InputMessage name="Buck" />
    </MockedProvider>
  );
});
