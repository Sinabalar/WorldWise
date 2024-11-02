import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useCitiesContext} from "../context/citiesContext.jsx";
import styles from './Map.module.css';
import {useGeolocation} from "../hooks/useGeoLocation.js";
import Button from "./Button.jsx";

function Map() {
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([38.069909, 46.291185]);
    const {cities} = useCitiesContext();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
        isOnHomePosition
    } = useGeolocation();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }, [geoLocationPosition]);



    return (
        <div
            className={styles.mapContainer}
        >{!isOnHomePosition([geoLocationPosition?.lat,geoLocationPosition?.lng],mapPosition) &&
            <Button
                type={'position'}
                onClick={() => (
                    getPosition()
                )}
            >{isLoadingPosition ? 'Loading...' : 'Get your position'}</Button>
        }
            <MapContainer
                center={mapPosition}
                zoom={10}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {
                    cities.map(city => (
                            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                                <Popup>
                                    <span>{city.emoji}</span>
                                    <span>{city.cityName}</span>
                                </Popup>
                            </Marker>
                        )
                    )
                }
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position, 12);
    return null;
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map;