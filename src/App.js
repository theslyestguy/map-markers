import './App.css';
import GoogMap from './components/GoogMap.js';
import axios from 'axios';
import { useState, useRef } from 'react';

function App() {
  const [currentAddress, setAddress] = useState('Atlanta, GA');
  const [lat, setLat] = useState(33.748752);
  const [lng, setLng] = useState(-84.3876);
  const cityInputRef = useRef(null);
  
  const updateFromApi = (address) => {
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOG_API_KEY}`;
    axios.get(apiUrl).then(res => {
      if (res.data.results.length > 0) {
        const locationData = res.data.results[0].geometry.location;
        setLat(locationData.lat);
        setLng(locationData.lng);
      }
    });
  };

  const updateCity = () => {
    setAddress(cityInputRef.current.value);
  };

  updateFromApi(currentAddress);

  return (
    <div className="App">
      <header className="App-header">
        <GoogMap latitude={lat} longitude={lng}></GoogMap>
        <input type='text' id='cityInput' defaultValue={currentAddress} ref={cityInputRef} />
        <button onClick={updateCity}>Show City</button>
      </header>
    </div>
  );
}

export default App;
