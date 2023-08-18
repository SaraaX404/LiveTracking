import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 34.0522,
  lng: -118.2437,
};

const waypoints = [
  { location: { lat: 37.7749, lng: -122.4194 } }, // San Francisco, CA
  { location: { lat: 34.0522, lng: -118.2437 } }, // Los Angeles, CA
  { location: { lat: 41.8781, lng: -87.6298 } },  // Chicago, IL
];

const destination = {
  lat: 29.7604,
  lng: -95.3698,
};

const App: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: center.lat, lng: center.lng },
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  }, []);

  return (
    <div style={{ height: '800px', width: '100%', marginTop:'50px' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
      >
        {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
      </GoogleMap>
    </div>
  );
};

export default App;
