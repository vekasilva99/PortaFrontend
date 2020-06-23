import { LOGIN, LOGOUT, UPDATE_USER, CURRENT_USER } from "../actionTypes";

const initialState = {
  token: null,
  userId: null,
  name: null,
  lastName: null,
  birthdate: null,
  mail: null,
  zone:null,
  cellphone:null,
  role: null,
  createdAt:null
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
      const { token, userId, name, lastName, birthdate, mail, zone, cellphone, role, createdAt} = action.payload;
      return {
        token: token,
        userId: userId,
        name: name,
        lastName: lastName,
        birthdate: birthdate,
        mail: mail,
        zone: zone,
        cellphone: cellphone,
        role: role,
        createdAt: createdAt
      };
    }
    case UPDATE_USER: {
      const { name, lastName, birthdate, mail, zone, cellphone, role, createdAt } = action.payload;
      return {
        ...state,
        name,
        lastName,
        birthdate,
        mail,
        zone,
        cellphone,
        role,
        createdAt
      };
    }

    default:
      return state;
  }
}
