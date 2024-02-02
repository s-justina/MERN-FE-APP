import {useParams} from "react-router-dom";
import {PlaceList} from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl: "https://travel.usnews.com/dims4/USNEWS/4aee1bb/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FEmpire_State_Building_Getty_Zsolt_Hlinka.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: "u1"
    },
    {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl: "https://travel.usnews.com/dims4/USNEWS/4aee1bb/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FEmpire_State_Building_Getty_Zsolt_Hlinka.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: "u2"
    }
]

export const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    return <PlaceList items={loadedPlaces}/>
}