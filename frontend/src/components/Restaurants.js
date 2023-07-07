import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
const Restaurants = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'asdasd',
    })

    if (!isLoaded) return <div>Loading...</div>
    return (
      <GoogleMap
        zoom={10}
        center={{lat: 44, lng: -80}}
        mapContainerClassName={map-container}
      ></GoogleMap>
    );

};

export default Restaurants;