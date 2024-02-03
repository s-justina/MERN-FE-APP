import {useParams} from "react-router-dom";
import {Input} from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../util/validators";
import {useForm} from "../../shared/hooks/form-hook";

import "./PlaceForm.css"
import {useEffect, useState} from "react";

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

export const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            }
        },
        false
    )

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        setFormData({
            title: {
                value: identifiedPlace.title,
                isValid: true
            },
            description: {
                value: identifiedPlace.description,
                isValid: true
            }
        }, true)

        setIsLoading(false)
    }, [setFormData, identifiedPlace])

    const placeUpdateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find a place!</h2>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input id="title"
                   element="input"
                   type="text"
                   label="Title"
                   validators={[VALIDATOR_REQUIRE()]}
                   errorText="Please enter a valid title."
                   onInput={inputHandler}
                   initialValue={formState.inputs.title.value}
                   initialValid={formState.inputs.title.isValid}
            />
            <Input id="description"
                   element="input"
                   type="textarea"
                   label="Description"
                   validators={[VALIDATOR_MINLENGTH(5)]}
                   errorText="Please enter a valid description (min. 5 characters)."
                   onInput={inputHandler}
                   initialValue={formState.inputs.description.value}
                   initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    )
}