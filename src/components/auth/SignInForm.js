import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { signIn, clearSignIn } from '../../redux/actions/authActions';
import { isNullOrEmty } from '../../utils/helpers/index';
import { Redirect } from 'react-router-dom'
import Spinner from '../shared/Spinner';
import SignUpModal from './SignUpModal';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.signIn.isLoading,
        error: state.auth.signIn.error,
        message: state.auth.signIn.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSignIn: () => { dispatch(clearSignIn()) },
        signIn: ({ username, password }) => { dispatch(signIn({ username, password })) }
    }
}

function SignInForm(props) {

    const [showSignUpModal, SetShowSignUpModal] = useState(false);
    const toggleShowSignUpModal = () => {
        SetShowSignUpModal(!showSignUpModal);
    }

    const { clearSignIn } = props;
    useEffect(() => {
        clearSignIn();
    }, [clearSignIn]);

    const [formUser, setFormUser] = useState({
        username: '',
        password: '',
        errorMessages: []
    });

    const onSignInHandler = (event) => {
        event.preventDefault();

        const formPropertiesValidations = {
            "Username": !isNullOrEmty(formUser.username),
            "Password": !isNullOrEmty(formUser.password),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Invalid ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            return setFormUser({ ...formUser, errorMessages: errorMessagesArray });
        }

        setFormUser({ ...formUser, errorMessages: [] });

        props.signIn({ username: formUser.username, password: formUser.password });
    }

    return (
        <Fragment>
            {props.isAuth &&
                <Redirect to='/'></Redirect>
            }
            <Form>
                {(formUser.errorMessages.length > 0 || props.error) &&
                    <Fragment>
                        {formUser.errorMessages.length > 0 && formUser.errorMessages.map((errorMsg, i) =>
                            <Alert variant="danger" key={`inavlid${i}`} >{errorMsg}</Alert>)}

                        {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                    </Fragment>
                }

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingresá tu usuario" value={formUser.username} onChange={(e) => { setFormUser({ ...formUser, username: e.target.value }) }} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingresá tu contraseña" value={formUser.password} onChange={(e) => { setFormUser({ ...formUser, password: e.target.value }) }} />
                </Form.Group>

                <Spinner isVisible={props.isLoading}></Spinner>

                <Button variant="primary" type="submit" block onClick={onSignInHandler}>
                    Inicia sesión
                </Button>

                <Form.Text className="text-center">
                    <Button variant="outline-primary" onClick={toggleShowSignUpModal} size="sm">Registrate</Button>
                </Form.Text>
                
                <SignUpModal show={showSignUpModal} handleClose={toggleShowSignUpModal}></SignUpModal>

            </Form>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);