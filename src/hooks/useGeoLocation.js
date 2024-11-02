import {useState} from "react";

export function useGeolocation(defaultPosition = null) {
    const [position, setPosition] = useState(defaultPosition);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPosition = function () {

        if (!navigator.geolocation) {
            setError("Your browser does not support geolocation");
            return;
        }


        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );

    }
        function isOnHomePosition(arr1, arr2) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] === arr2[i]) return true
            }
        }
    return {position, isLoading, error, getPosition, isOnHomePosition};

}
