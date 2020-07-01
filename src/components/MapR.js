import React from "react";
import styled from "styled-components";
import Geocoder from "react-native-geocoding";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_LOCATION_DRIVER } from "../helpers/graphql/mutations/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
  height: "100%",
  width: "100%",
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
  //DRIVER DATA HERE
  const { role, name, lastName, available, latitud, longitud } = useSelector(
    (state) => ({
      ...state.User,
    })
  );

  const [
    changeLocation,
    { data: dataL, error: errorL, loading: loadingL },
  ] = useMutation(UPDATE_LOCATION_DRIVER);

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

  const dispatch = useDispatch();

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
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

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Locate panTo={panTo} handleLocationChange={handleLocationChange} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {location ? (
          <Marker
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: "/RepartidorFondo.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ) : null}
      </GoogleMap>
    </>
  );
}

function Locate({ panTo, handleLocationChange }) {
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
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/RepartidorFondo.png" alt="compass" />
      </button>
    </StyledMap>
  );
}

const StyledMap = styled.div`
z-index:10;
  .search {
      position:relative;
      width:100%
      max-width:400px;
      z-index:1000;
      
  }

  .search input {
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 100%;
  }



  .locate {
    position: absolute;
    top: 5rem;
    right: 1rem;
    background: none;
    border: none;
    z-index: 2010;
  }
  .locate img {
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
