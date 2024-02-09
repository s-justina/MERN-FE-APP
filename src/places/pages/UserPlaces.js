import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PlaceList} from "../components/PlaceList";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export const UserPlaces = () => {
    const userId = useParams().userId;
    const [loadedPlaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_API_BASE_URL}/places/user/${userId}`);

                setLoadedPlaces(responseData.places);
            } catch (err) {
            }
        }

        fetchPlaces();

    }, [sendRequest, userId])

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
        </>
    )
}