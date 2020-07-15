import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Geocoder from "react-native-geocoding";
// import MapViewDirections from "react-native-maps-directions";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { DRIVERS_AROUND } from "../helpers/graphql/queries/index";
import {
  MAKE_ORDER,
  ORDER_COMPLETED,
} from "../helpers/graphql/mutations/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSubscription } from "@apollo/react-hooks";
import {
  ORDER_UPDATE,
  DRIVER_ADDED,
} from "../helpers/graphql/subscriptions/index";
import Spinner from "./Spinner";
import { NavLink, withRouter } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  withGoogleMap,
  withScriptjs,
  Polyline,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Grid from "@material-ui/core/Grid";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "../assets/scss/mapStyles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const libraries = ["places", "directions"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
  top: "0",
  left: "0",
  display: "flex",
  position: "absolute",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 10.480594,
  lng: -66.903603,
};
export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCM4qSOvs4NukQZxy366IuzW41Ymugauqo",
    libraries,
  });
  Geocoder.init("AIzaSyCM4qSOvs4NukQZxy366IuzW41Ymugauqo");
  const [markers, setMarkers] = React.useState(null);
  let [path, setPath] = React.useState("/user/driverprofile/");
  const [user, setUser] = React.useState(null);
  const [profileD, setProfileD] = React.useState(false);
  const [pack, setPackage] = React.useState(null);
  const [distancia, setDistancia] = React.useState(null);
  const [precio, setPrecio] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { data, error, loading, subscribeToMore } = useQuery(DRIVERS_AROUND, {
    fetchPolicy: "network-only",
  });

  const [
    makeOrderd,
    { data: dataM, error: errorM, loading: loadingM },
  ] = useMutation(MAKE_ORDER);

  const [
    orderCompleted,
    { data: dataC, error: errorC, loading: loadingC },
  ] = useMutation(ORDER_COMPLETED);

  const { _id, role, name, lastName, currentOrder } = useSelector((state) => ({
    ...state.User,
  }));

  const { data: dataS, error: errorS, loading: loadingS } = useSubscription(
    ORDER_UPDATE,
    {
      variables: {
        userId: _id.toString(),
      },
    }
  );
  console.log(dataS);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataM && dataM.createOrder) {
      console.log("useEffect here");
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: dataM.createOrder,
        },
      });
      console.log("useEffect passed");
    }
  }, [dataM, dispatch]);
  useEffect(() => {
    if (dataS && dataS.orderUpdate) {
      console.log("useEffect here");
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: dataS.orderUpdate,
        },
      });
      console.log("useEffect passed");
    }
  }, [dataS, dispatch]);
  const origin = { lat: 10.492268, lng: -66.893961 };
  const destination = { lat: 10.460533, lng: -66.885201 };
  const origin2 = "10.492268, -66.893961";
  const destination2 = "10.460533,  -66.885201";
  const [directions, setDirections] = React.useState(null);
  const handleSend = async (e) => {
    if (user != null && pack != null && distancia != null && precio != null) {
      console.log("SE PUEDE MANDAR");
      console.log(user);
      console.log("Precio", precio);
      console.log("Distancia", distancia);
      const { dataM } = await makeOrderd({
        variables: {
          orderInput: {
            user: _id,
            pickUp: user.address,
            pickUpLat: user.lat.toString(),
            pickUpLng: user.lng.toString(),
            deliver: pack.address,
            deliverLat: pack.lat.toString(),
            deliverLng: pack.lng.toString(),
            km: distancia,
            price: Number(precio),
          },
        },
      });
    } else {
      console.log("NO SE PUEDE MANDAR");
    }
  };
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    if (currentOrder) {
      const directionsService = new window.google.maps.DirectionsService();
      const service = new window.google.maps.DistanceMatrixService();
      console.log("Entree");
      directionsService.route(
        {
          origin: { lat: currentOrder.pickUpLat, lng: currentOrder.pickUpLng },
          destination: {
            lat: currentOrder.deliverLat,
            lng: currentOrder.deliverLng,
          },
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (directions == null) {
              setDirections(result);
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, []);
  const onMapClick = React.useCallback((e) => {
    setMarkers({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  });
  const handleUserChange = ({ lat, lng, address }) => {
    setUser({ lat, lng, address });
    console.log("User");
    console.log(user);
  };
  const handlePackageChange = ({ lat, lng, address }) => {
    setPackage({ lat, lng, address });
    console.log("Package");
    console.log(pack);
  };
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  const RouteDraw = React.useCallback((user, pack) => {
    console.log("user", user);
    console.log("pack", pack);
    console.log("directions", directions);
    console.log("distancia", distancia);
    if (user != null && pack != null && distancia == null) {
      const directionsService = new window.google.maps.DirectionsService();
      const service = new window.google.maps.DistanceMatrixService();
      console.log("Entree");
      directionsService.route(
        {
          origin: { lat: user.lat, lng: user.lng },
          destination: { lat: pack.lat, lng: pack.lng },
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (directions == null) {
              setDirections(result);
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      let distan;
      let price;
      service.getDistanceMatrix(
        {
          origins: [user.lat.toString() + ", " + user.lng.toString()],
          destinations: [pack.lat.toString() + ", " + pack.lng.toString()],
          travelMode: "DRIVING",
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            if (result.rows[0].elements[0]) {
              console.log(result.rows[0].elements[0]);
              price = result.rows[0].elements[0].distance.value / 1000 / 2;
              distan = result.rows[0].elements[0].distance.text;
              setDistancia(distan);
              setPrecio(price.toFixed(2));
            }
          } else {
            console.error(`error calculating directions ${result}`);
          }
        }
      );
    }
  }, []);

  const handleCompleted = async (e) => {
    setProfileD(true);
    const { data: dataC } = await orderCompleted({
      variables: {
        orderId: currentOrder._id.toString(),
      },
    });
    if (dataC && dataC.orderCompleted) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: null,
        },
      });
    }
  };

  React.useEffect(() => {
    const unsubscription = subscribeToMore({
      document: DRIVER_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newDriver = subscriptionData.data.addDriver;

        if (!prev.driversAroundMe.find((msg) => msg._id === newDriver._id)) {
          const res = Object.assign({}, prev, {
            driversAroundMe: [newDriver, ...prev.driversAroundMe],
          });
          return res;
        } else return prev;
      },
    });
    return () => {
      unsubscription();
    };
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return profileD ? (
    <Redirect to={path + currentOrder.repartidor._id} />
  ) : (
    <>
      <StyledMap>
        <div className="fondoMap">
          {currentOrder ? (
            <div className="busqueda">
              <h1>Orden Actual</h1>
              <div className="info">
                <div className="div6">
                  <h2>Repartidor</h2>
                  {currentOrder.repartidor ? (
                    <h3>
                      {currentOrder.repartidor.name}{" "}
                      {currentOrder.repartidor.lastName}
                    </h3>
                  ) : (
                    <h3>Ningun Repartidor ha aceptado la orden</h3>
                  )}
                  <h2>Origen</h2>
                  <h3>{currentOrder.pickUp}</h3>
                  <h2>Destino</h2>
                  <h3>{currentOrder.deliver}</h3>

                  {currentOrder.status != "Waiting for a driver to accept" ? (
                    <div>
                      <h2>Estado del Pedido</h2>
                      <h3>{currentOrder.status}</h3>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="botonContainer2">
                {currentOrder.repartidor ? (
                  <NavLink
                    to="/user/chat"
                    className="boton"
                    onClick={handleSend}
                  >
                    CHAT
                  </NavLink>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="busqueda">
              <h1>Realiza un pedido</h1>
              <div className="rutas">
                <div className="div1"></div>
                <div className="div2">
                  <Search
                    panTo={panTo}
                    handleChange={handleUserChange}
                    placeH="Where Are You?"
                    RouteDraw={RouteDraw(user, pack)}
                  />
                </div>
                <div className="div3">
                  <Search
                    panTo={panTo}
                    handleChange={handlePackageChange}
                    placeH="Where is Your Package?"
                  />
                </div>
                <div className="div8">
                  {precio && !currentOrder ? <h2>Total: {precio}$</h2> : null}
                </div>
              </div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="botonContainer">
                <button className="boton" onClick={handleSend}>
                  ACCEPT
                </button>
              </div>
            </div>
          )}
          <div className="clear"></div>
        </div>
      </StyledMap>

      <Locate
        panTo={panTo}
        handleUserChange={handleUserChange}
        handleCompleted={handleCompleted}
        currentOrder={currentOrder}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {loading ? (
          <Spinner />
        ) : (
          data.driversAroundMe.map((repartidor) => (
            <Marker
              position={{
                lat: Number(repartidor.latitud),
                lng: Number(repartidor.longitud),
              }}
              icon={{
                url: "/RepartidorFondo.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))
        )}
        {user && !currentOrder ? (
          <Marker
            position={{ lat: user.lat, lng: user.lng }}
            icon={{
              url: "/ClienteMap.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ) : null}
        {pack && !currentOrder ? (
          <div>
            <Marker
              position={{ lat: pack.lat, lng: pack.lng }}
              icon={{
                url: "/PackageMap.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          </div>
        ) : null}
        {currentOrder ? (
          <div>
            <Marker
              position={{
                lat: currentOrder.pickUpLat,
                lng: currentOrder.pickUpLng,
              }}
              icon={{
                url: "/PackageMap.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
            <Marker
              position={{
                lat: currentOrder.deliverLat,
                lng: currentOrder.deliverLng,
              }}
              icon={{
                url: "/ClienteMap.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          </div>
        ) : null}
      </GoogleMap>
    </>
  );
}
function Locate({ panTo, handleUserChange, currentOrder, handleCompleted }) {
  return (
    <StyledMap>
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then((json) => {
                  var addressComponent = json.results[0].address_components[0];
                  console.log(addressComponent);
                  handleUserChange({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: addressComponent,
                  });
                })
                .catch((error) => console.warn(error));
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/ClienteMap.png" alt="compass" />
      </button>

      {currentOrder ? (
        <div>
          {currentOrder.status === "Your package arrived" ? (
            <button onClick={handleCompleted} className="locate2">
              <img src="/GOTITBLUE.png" alt="compass" />
            </button>
          ) : null}
        </div>
      ) : null}
    </StyledMap>
  );
}
function Search({ panTo, handleChange, placeH, RouteDraw }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 10.480594, lng: () => -66.903603 },
      radius: 200 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      handleChange({ lat, lng, address });
      panTo({ lat, lng });
      RouteDraw();
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <StyledMap>
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            style={{ fontFamily: "Roboto" }}
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder={placeH}
          />

          <ComboboxPopover style={{ zIndex: 2500, fontFamily: "Roboto" }}>
            <ComboboxList style={{ zIndex: 2500 }}>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption
                    key={id}
                    value={description}
                    style={{ zIndex: 2500 }}
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </StyledMap>
  );
}
const StyledMap = styled.div`
  .fondoMap {
    display: flex;
    position: relative;
    height: 100vh;
    width: 100vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: transparent;
    overflow: hidden;
  }
  .locate {
    position: absolute;
    top: 5rem;
    right: 1rem;
    background: none;
    border: none;
    z-index: 2010;
  }
  .locate2 {
    position: absolute;
    top: 5rem;
    right: 6rem;
    background: none;
    border: none;
    z-index: 2010;
  }
  .locate img {
    width: 5em;
    cursor: pointer;
  }

  .locate2 img {
    width: 5em;
    cursor: pointer;
  }
  
  .boton {
    border: solid 2px #00507a;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 200px;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: #00507a;
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;
    &:hover {
      opacity: 0.8;
      background: #00507a;
      color: white;
      border-color: #00507a;
    }
    &:focus {
      opacity: 0.8;
      outline: none;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
  @media only screen and (min-width: 735px) {
    .fondoMap {
      display: grid;
      grid-template-columns: 30% 70%;
      grid-auto-rows: 100%;
    }
    .MuiPickersToolbar-toolbar {
      height: 100px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      background-color: rgb(0, 80, 122) !important;
    }
    .MuiGrid-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      background: #fafafa;
      margin-top: -15%;
    }
    .busqueda {
      background-color: #fafafa;
      margin: 20px;
      margin-top: 80px;
      width: 400px;
      z-index: 2020;
      h1 {
        font-size: 60px;
        font-weight: 600;
        color: #fafafa;
        height: 230px;
        background-color: rgb(0, 80, 122);
        margin: 0;
        padding: 40px;
      }
      h2 {
        font-size: 25px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        margin-top: 5%;
        margin-left: 5%;
      }
      .rutas {
        margin: 0;
        padding-top: 10%;
        padding-bottom: 5%;
        padding-left: 9%;
        padding-right: 9%;
        width: 100%;
        height: 35vh;
        background: #fafafa;
        display: grid;
        grid-template-areas:
          "iconos partida partida"
          "iconos llegada llegada"
          "precio precio precio"
      }
      .info {
        margin: 0;
        padding-top: 10%;
        padding-bottom: 15%;
        padding-left: 9%;
        padding-right: 9%;
        width: 100%;
        height: 40vh;
        background: #fafafa;
        display: grid;
        grid-template-areas:
          "partida partida"
      }
      .div6{
        background: transparent;
        width: 100%;
        height: 100%;
        grid-area: partida;
        h2{
          font-size: 15px;
          font-weight: 500;
          color: #1d1d1f;
          margin: 0;
        }
        h3{
          font-size: 18px;
          font-weight: 200;
          color: #1d1d1f;
          margin: 0;
        }
      }
      .div1 {
        background-image: url("/iconos.png");
        background-repeat: no-repeat;
        background-size: 40px;
        z-index: 2030;
        width: 78%;
      }
      .div4 {
        grid-area: iconos;
      }
      .div4 {
        z-index: 2030;
        width: 30%;
      }
      .div1 {
        grid-area: iconos;
      }
      .div8 {
        grid-area: precio;
        background: transparent;
        width: 122%;
        margin-top:8%;
        margin-left: -22%;
        padding:0;
        padding-right:5%;
        height:50%;
        display: flex;
        position: relative;
        justify-content:flex-end;
        align-text:center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        h2{
          font-size: 22px;
          font-weight: 500;
          color: #00507a;
          margin: 0;
        }
      }
      .div2 {
        grid-area: partida;
        background: transparent;
        width: 122%;
        margin-left: -22%;
        margin-top:2%;
        margin-Bottom:4%;
        display: flex;
        position: relative;
        height:100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        .search {
          display: flex;
          position: absolute;
          align-items: center;
          width: 100%;
          height: 100%;
          height: 100%;
          z-index: 2030;
        }
        .search input {
          font-size: 1.5rem;
          height: 90%;
          background: transparent;
          outline: none;
          border: none;
          &:focus {
            outline: none;
            border: none;
          }
        }
        .texto{
          width:100%;
          height:fit-content;
          background:transparent;
          display:flex;
          flex-direction:column;
          position:absolute;
          margin-left:0.1em;
          h2{
          font-size: 18px;
          font-weight: 500;
          color: #1d1d1f;
          margin: 0;
          }
          h3{
            font-size: 22px;
            font-weight: 300;
            color: #1d1d1f;
            margin: 0;
          }
        }
      }
      .div3 {
        grid-area: llegada;
        background: transparent;
        width: 122%;
        margin-left: -22%;
        margin-top:4%;
        margin-bottom:5%;
        display: flex;
        position: relative;
        height:100%;
        .search {
          display: flex;
          position: absolute;
          align-items: center;
          width: 100%;
          height: 100%;
          height: 100%;
          padding:0;
          z-index: 2030;
        }
        .search input {
          font-size: 1.5rem;
          height: 90%;
          width: 100%;
          margin:0;
          background: transparent;
          outline: none;
          border: none;
          &:focus {
            outline: none;
            border: none;
          }
        }
        .texto{
          width:100%;
          height:fit-content;
          background:transparent;
          display:flex;
          position:absolute;
          flex-direction:column;
          margin-left:0.1em;
          h2{
          font-size: 18px;
          font-weight: 500;
          color: #1d1d1f;
          margin: 0;
          }
          h3{
            font-size: 22px;
            font-weight: 300;
            color: #1d1d1f;
            margin: 0;
          }
        }
      }
      .botonContainer {
        width: 100%;
        background: #fafafa;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .botonContainer2 {
        width: 100%;
        background: #fafafa;
        height: 15vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }




  @media only screen and (max-width: 734px) {
    .fondoMap {
      display: grid;
      grid-template-areas:
        "clear"
        "busqueda";
    }
    .MuiPickersToolbar-toolbar {
      height: 100px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      background-color: rgb(0, 80, 122) !important;
      margin-top: 0;
    }
    .MuiGrid-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      background: #fafafa;
      margin-top: 0;
    }
    .busqueda {
      justify-items: center;
      grid-area: busqueda;
      background-color: #fafafa;
      z-index: 2020;
      margin:0;
      height: auto;
      h1 {
        font-size: 30px;
        font-weight: 400;
        color: #fafafa;
        height: 80px;
        background-color: rgb(0, 80, 122);
        margin: 0;
        padding: 20px;
        text-align: center;
      }
      h5 {
        font-size: 20px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        margin-top: 5%;
        margin-left: 15%;
      }
      .rutas {
        margin: auto;
        width: 350px;
        height: 150px;
        grid-auto-rows: 50px;
        background: #fafafa;
        display: grid;
        grid-template-areas:
          "iconos partida partida"
          "iconos llegada llegada"
          "precio precio precio";
      }
      .info{
        padding: 10px;
      }
      .div1 {
        background-image: url("/iconos.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35px;
        z-index: 2030;
        grid-area: iconos;
      }
      .div2 {
        grid-area: partida;
        background: #fafafa;
        display: flex;
        position: relative;
        .search {
          display: flex;
          position: absolute;
          align-items: center;
          width: 100%;
          height: 100%;
          height: 100%;
          z-index: 2030;
        }
        .search input {
          font-size: 20px;
          height: 90%;
          background: transparent;
          outline: none;
          border: none;
          &:focus {
            outline: none;
            border: none;
          }
        }
      }
        .div3 {
          grid-area: llegada;
          background: #fafafa;
          display: flex;
          position: relative;
          .search {
            display: flex;
            position: absolute;
            align-items: center;
            width: 100%;
            height: 100%;
            height: 100%;
            z-index: 2030;
          }
          .search input {
            font-size: 20px;
            height: 90%;
            background: transparent;
            outline: none;
            border: none;
            &:focus {
              outline: none;
              border: none;
            }
          }
        }
      }
      .botonContainer {
        margin: auto;
        width: 100%;
        background: #fafafa;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: baseline;
      }
      .boton {
        width: 150px;
      }
    }
    .clear {
      grid-area: clear;
      height: 52vh;
    
    }
    .div8 {
        grid-area: precio;
        background: transparent;
        height: 50px;
        align-items: center;
        display: flex;
        position: relative;
        justify-content:flex-end;
        align-text:center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        h2{
          font-size: 18px;
          font-weight: 500;
          color: #00507a;
          margin: 0;
        }
      }
    .div6{
        h2{
          font-size: 15px;
          font-weight: 500;
          color: #1d1d1f;
          margin: 0;
        }
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #1d1d1f;
          margin: 0;
        }
      }
  }
`;
