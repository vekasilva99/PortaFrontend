import { LOGIN, LOGOUT, UPDATE_USER, CURRENT_USER } from "../actionTypes";

const initialState = {
  token: null,
  userId: null,
  userImg: null,
  name: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    case CURRENT_USER: {
      const { token, userId, userImg, name, username, posts } = action.payload;
      return {
        token: token,
        userId,
        userImg,
        name,
        username,
      };
    }
    case UPDATE_USER: {
      const { userImg, name } = action.payload;
      return {
        ...state,
        userImg,
        name,
      };
    }

    default:
      return state;
  }
}
