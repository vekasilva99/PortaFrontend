import { LOGIN, LOGOUT, UPDATE_USER, CURRENT_USER } from "../actionTypes";

const initialState = {
  token: null,
  _id: null,
  name: null,
  lastName: null,
  birthdate: null,
  mail: null,
  zone: null,
  cellphone: null,
  role: null,
  latitud: null,
  longitud: null,
  available: null,
  workingStatus: null,
  experience: null,
  vehiculo: null,
  licencia: null,
  carnetCirculacion: null,
  seguroVehiculo: null,
  placaVehiculo: null,
  rating: null,
  comments: null,
  currentOrder:null,
  createdAt: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { token, role } = action.payload;
      return {
        ...state,
        token,
        role,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    case CURRENT_USER: {
      const {
        token,
        _id,
        name,
        lastName,
        birthdate,
        mail,
        zone,
        cellphone,
        role,
        latitud,
        longitud,
        available,
        workingStatus,
        experience,
        vehiculo,
        licencia,
        carnetCirculacion,
        seguroVehiculo,
        placaVehiculo,
        rating,
        comments,
        currentOrder,
        createdAt,
      } = action.payload;
      return {
        token: token,
        _id: _id,
        name: name,
        lastName: lastName,
        birthdate: birthdate,
        mail: mail,
        zone: zone,
        cellphone: cellphone,
        role: role,
        latitud: latitud,
        longitud: longitud,
        available: available,
        workingStatus: workingStatus,
        experience: experience,
        vehiculo: vehiculo,
        licencia: licencia,
        carnetCirculacion: carnetCirculacion,
        seguroVehiculo: seguroVehiculo,
        placaVehiculo: placaVehiculo,
        rating: rating,
        comments: comments,
        currentOrder: currentOrder,
        createdAt: createdAt,
      };
    }
    case UPDATE_USER: {
      //const { name, lastName, birthdate, mail, zone, cellphone, role, available, workingStatus, experience, vehiculo, licencia, carnetCirculacion, seguroVehiculo, placaVehiculo, rating, comments, createdAt } = action.payload;
      const params = action.payload;
      return {
        ...state,
        ...params,
      };
    }

    default:
      return state;
  }
}
