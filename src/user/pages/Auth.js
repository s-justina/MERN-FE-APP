import {useContext, useState} from "react";
import Card from "../../shared/components/UIElements/Card";
import {Input} from "../../shared/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../util/validators";
import {useForm} from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {ImageUpload} from "../../shared/components/FormElements/ImageUpload";

import "./Auth.css";


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);


    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prev => !prev)
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_API_BASE_URL}/users/login`,
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    },
                );

                auth.login(responseData.userId, responseData.token);
            } catch (err) {
            }

        } else {
            const formData = new FormData();
            formData.append('email', formState.inputs.email.value);
            formData.append('name', formState.inputs.name.value);
            formData.append('password', formState.inputs.password.value);
            formData.append('image', formState.inputs.image.value);
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_API_BASE_URL}/users/signup`,
                    "POST",
                    formData
                );

                auth.login(responseData.userId, responseData.token);
            } catch (err) {
            }
        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>Login required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <Input id="name"
                                            element="input"
                                            type="text"
                                            label="Name"
                                            validators={[VALIDATOR_REQUIRE()]}
                                            errorText="Please enter a name."
                                            onInput={inputHandler}
                    />}
                    {!isLoginMode &&
                        <ImageUpload id="image" center onInput={inputHandler} errorText="Please provide an image."/>}
                    <Input id="email"
                           element="input"
                           type="email"
                           label="E-Mail"
                           validators={[VALIDATOR_EMAIL()]}
                           errorText="Please enter a valid email address."
                           onInput={inputHandler}
                    />
                    <Input id="password"
                           element="input"
                           type="password"
                           label="Password"
                           validators={[VALIDATOR_MINLENGTH(6)]}
                           errorText="Please enter a valid password, at lease 6 characters.."
                           onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}</Button>
            </Card>
        </>
    )
}

export default Auth;