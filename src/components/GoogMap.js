import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '1000px',
  height: '500px'
};

function GoogMap(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `{process.env.REACT_APP_MAP_API_KEY}`
  })

  const [map, setMap] = React.useState(null)

  const center = {
    lat: props.latitude,
    lng: props.longitude
  };

  const onLoad = React.useCallback(function callback(map) {
    map.setCenter(center);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
  ) : <></>
}

export default GoogMap;
