import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Geocoder from "react-native-geocoding";
import { useMutation } from "@apollo/react-hooks";
import { useSubscription } from "@apollo/react-hooks";
import {
  UPDATE_LOCATION_DRIVER,
  ORDER_PICKED_UP,
  ORDER_ARRIVED,
} from "../helpers/graphql/mutations/index";
import { COMPLETE_ORDER } from "../helpers/graphql/subscriptions/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
  zIndex: "1",
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

export default function MapR() {
  const [directions, setDirections] = React.useState(null);

  const dispatch = useDispatch();

  //DRIVER DATA HERE
  const {
    _id,
    role,
    name,
    lastName,
    available,
    latitud,
    longitud,
    currentOrder,
  } = useSelector((state) => ({
    ...state.User,
  }));

  const [
    changeLocation,
    { data: dataL, error: errorL, loading: loadingL },
  ] = useMutation(UPDATE_LOCATION_DRIVER);

  const [orderPickedUp, { data, error, loading }] = useMutation(
    ORDER_PICKED_UP
  );

  const [
    orderArrived,
    { data: dataA, error: errorA, loading: loadingA },
  ] = useMutation(ORDER_ARRIVED);

  const { data: dataS, error: errorS, loading: loadingS } = useSubscription(
    COMPLETE_ORDER,
    {
      variables: {
        driverId: _id.toString(),
      },
    }
  );

  useEffect(() => {
    if (dataS && dataS.orderComplete) {
      console.log("useEffect here");
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: null,
        },
      });
      console.log("useEffect passed");
    }
  }, [dataS, dispatch]);

  // const { dataA } = await orderArrived({
  //   variables: {
  //     orderId: currentOrder_id.toString(),
  //   },
  // });

  // useEffect(() => {
  //   if (dataA && dataA.orderArrived) {
  //     dispatch({
  //       type: "UPDATE_USER",
  //       payload: {
  //         currentOrder: dataA.orderArrived,
  //       },
  //     });
  //   }
  // }, [dataA, dispatch]);

  // const [
  //   orderCompleted,
  //   { data: dataC, error: errorC, loading: loadingC },
  // ] = useMutation(ORDER_COMPLETED);

  // useEffect(() => {
  //   if (dataC && dataC.orderCompleted) {
  //     dispatch({
  //       type: "UPDATE_USER",
  //       payload: {
  //         currentOrder: null,
  //       },
  //     });
  //   }
  // }, [dataC, dispatch]);

  // Completed

  console.log("latitud" + latitud);
  console.log("longitud" + longitud);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCM4qSOvs4NukQZxy366IuzW41Ymugauqo",
    libraries,
  });

  Geocoder.init("AIzaSyCM4qSOvs4NukQZxy366IuzW41Ymugauqo");
  const [markers, setMarkers] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [pack, setPackage] = React.useState(null);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
            handleLocationChange({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: addressComponent,
            });
          })
          .catch((error) => console.warn(error));
        panTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          false
        );
      },
      () => null
    );

    if (currentOrder) {
      const directionsService = new window.google.maps.DirectionsService();
      const service = new window.google.maps.DistanceMatrixService();
      console.log("Entree");
      if (currentOrder.status === "Picking up package") {
        console.log(
          "Recogiendo",
          latitud,
          longitud,
          currentOrder.pickUpLat,
          currentOrder.pickUpLng
        );
        directionsService.route(
          {
            origin: {
              lat: Number(latitud),
              lng: Number(longitud),
            },
            destination: {
              lat: Number(currentOrder.pickUpLat),
              lng: Number(currentOrder.pickUpLng),
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
      if (currentOrder.status === "Delivering package") {
        directionsService.route(
          {
            origin: {
              lat: Number(currentOrder.pickUpLat),
              lng: Number(currentOrder.pickUpLng),
            },
            destination: {
              lat: Number(currentOrder.deliverLat),
              lng: Number(currentOrder.deliverLng),
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
    }
  }, []);

  const onMapClick = React.useCallback((e) => {
    setMarkers({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  });

  const handleLocationChange = async ({ lat, lng, address }) => {
    setLocation({ lat, lng, address });
    console.log("Location");
    console.log(location);

    const { dataL } = await changeLocation({
      variables: {
        lat: lat.toString(),
        lng: lng.toString(),
      },
    });

    dispatch({
      type: "UPDATE_USER",
      payload: {
        lat: lat.toString(),
        lng: lng.toString(),
      },
    });
  };

  const panTo = React.useCallback(({ lat, lng }, bol) => {
    mapRef.current.panTo({ lat, lng }, false);
    mapRef.current.setZoom(14);
    console.log(bol);
    if (
      currentOrder &&
      currentOrder.status === "Picking up package" &&
      bol == true
    ) {
      console.log("Pan");
      const directionsService = new window.google.maps.DirectionsService();
      console.log("Entree");
      handleLocationChange({
        lat: Number(currentOrder.pickUpLat),
        lng: Number(currentOrder.pickUpLng),
        address: currentOrder.pickUp,
      });
      directionsService.route(
        {
          origin: {
            lat: lat,
            lng: lng,
          },
          destination: {
            lat: Number(currentOrder.deliverLat),
            lng: Number(currentOrder.deliverLng),
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
    if (
      currentOrder &&
      currentOrder.status === "Picking up package" &&
      bol == false
    ) {
      console.log("Pan");
      const directionsService = new window.google.maps.DirectionsService();
      console.log("Entree");
      directionsService.route(
        {
          origin: {
            lat: lat,
            lng: lng,
          },
          destination: {
            lat: Number(currentOrder.pickUpLat),
            lng: Number(currentOrder.pickUpLng),
          },
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const handleGotIt = async (e) => {
    panTo(
      {
        lat: Number(currentOrder.pickUpLat),
        lng: Number(currentOrder.pickUpLng),
      },
      true
    );
    const { data } = await orderPickedUp({
      variables: {
        orderId: currentOrder._id.toString(),
      },
    });

    if (data && data.orderPickedUp) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: data.orderPickedUp,
        },
      });
    }
  };
  const handleCompleted = async (e) => {
    panTo(
      {
        lat: Number(currentOrder.deliverLat),
        lng: Number(currentOrder.deliverLng),
      },
      true
    );
    const { data: dataA } = await orderArrived({
      variables: {
        orderId: currentOrder._id.toString(),
      },
    });

    if (dataA && dataA.orderArrived) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: dataA.orderArrived,
        },
      });
    }
  };

  return (
    <>
      <Locate
        panTo={panTo}
        handleLocationChange={handleLocationChange}
        currentOrder={currentOrder ? currentOrder : null}
        handleGotIt={handleGotIt}
        handleCompleted={handleCompleted}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {latitud && longitud && !currentOrder ? (
          <Marker
            position={{ lat: Number(latitud), lng: Number(longitud) }}
            icon={{
              url: "/RepartidorFondo.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ) : null}

        {latitud && longitud && currentOrder ? (
          <div>
            {currentOrder.status === "Picking up package" ? (
              <Marker
                position={{ lat: Number(latitud), lng: Number(longitud) }}
                icon={{
                  url: "/RepartidorFondo.png",
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ) : null}
          </div>
        ) : null}

        {currentOrder ? (
          <div>
            <Marker
              position={{
                lat: Number(currentOrder.pickUpLat),
                lng: Number(currentOrder.pickUpLng),
              }}
              icon={{
                url:
                  currentOrder.status === "Picking up package"
                    ? "/PackageMap.png"
                    : "/RepartidorFondo.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />

            <Marker
              position={{
                lat: Number(currentOrder.deliverLat),
                lng: Number(currentOrder.deliverLng),
              }}
              icon={{
                url:
                  currentOrder.status === "Your package arrived"
                    ? "/RepartidorFondo.png"
                    : "/ClienteMap.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
            {currentOrder.status != "Your package arrived" ? (
              <DirectionsRenderer
                directions={directions}
                options={{ suppressMarkers: true }}
              />
            ) : null}
          </div>
        ) : null}
      </GoogleMap>
    </>
  );
}

function Locate({
  panTo,
  handleLocationChange,
  currentOrder,
  handleGotIt,
  handleCompleted,
}) {
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
                  handleLocationChange({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: addressComponent,
                  });
                })
                .catch((error) => console.warn(error));
              panTo(
                {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                false
              );
            },
            () => null
          );
        }}
      >
        <img src="/RepartidorFondo.png" alt="compass" />
      </button>
      {currentOrder ? (
        <div>
          {currentOrder.status === "Picking up package" ? (
            <button
              onClick={() => {
                handleGotIt();
              }}
              className="locate2"
            >
              <img src="/GOTIT.png" alt="compass" />
            </button>
          ) : null}
          {currentOrder.status === "Delivering package" ? (
            <button onClick={handleCompleted} className="locate2">
              <img src="/IMHERE.png" alt="compass" />
            </button>
          ) : null}
        </div>
      ) : null}
    </StyledMap>
  );
}

const StyledMap = styled.div`
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
    width: 15vw;
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
`;
