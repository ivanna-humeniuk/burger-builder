import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from "../../shared/utility";

import styles from './Auth.module.scss';


const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });

    const [isSignup, setSignup] = useState(true);

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value,
            controls.password.value,
            isSignup);
    }

    const switchAuthModeHandler = () => {
        setSignup(!isSignup)
    }


    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(element => {
        return (
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => inputChangedHandler(event, element.id)}/>
        )
    })

    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null;

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button
                btnType='Danger'
                clicked={switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);