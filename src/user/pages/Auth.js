import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import {Input} from "../../shared/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../util/validators";
import {useForm} from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import {useState} from "react";

export const Auth = () => {
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

    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prev => !prev)
    }

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs)
    }

    return (
        <Card className="authentication">
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
                       validators={[VALIDATOR_MINLENGTH(5)]}
                       errorText="Please enter a valid password, at lease 5 characters.."
                       onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}</Button>
        </Card>
    )
}