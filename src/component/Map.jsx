import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet"
import {useState} from "react";
import {useCitiesContext} from "../context/citiesContext.jsx";
import city from "./City.jsx";

function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {cities} = useCitiesContext();

    return (
        <div
            className={styles.mapContainer}
        >
            <MapContainer
                center={mapPosition}
                zoom={6}
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
            </MapContainer>
        </div>
    );
}

export default Map;