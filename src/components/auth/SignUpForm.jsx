import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { signUp, clearSignUp } from '../../redux/actions/authActions';
import { isNullOrEmty } from '../../utils/helpers/index';
import Spinner from '../shared/Spinner';

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.signUp.isLoading,
        error: state.auth.signUp.error,
        message: state.auth.signUp.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearSignUp: () => { dispatch(clearSignUp()) },
        signUp: ({ username, password }) => { dispatch(signUp({ username, password })) }
    }
}

function SignUpForm(props) {

    const { clearSignUp, signUp } = props;
    useEffect(() => {
        clearSignUp();
    }, [clearSignUp]);

    const [formUser, setFormUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        errorMessages: []
    });

    
    const onSignUpHandler = (event) => {
        event.preventDefault();

        const formPropertiesValidations = {
            "Usuario": !isNullOrEmty(formUser.username),
            "Contraseña": !isNullOrEmty(formUser.password),
            "Confirmación de Contraseña": !isNullOrEmty(formUser.confirmPassword),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Campo inválido: ${propertyName}`;
        });

        if (formUser.password !== formUser.confirmPassword) {
            errorMessagesArray.push(`Las contraseñas no coinciden`);
        }

        if (errorMessagesArray.length > 0) {
            return setFormUser({ ...formUser, errorMessages: errorMessagesArray });
        }

        setFormUser({ ...formUser, errorMessages: [] });

        signUp({ username: formUser.username, password: formUser.password });
    }

    return (
        <Form>
            {((!props.error && !props.message) || (props.error && props.message)) &&
                <Fragment>
                    {(formUser.errorMessages.length > 0 || props.error) &&
                        <Fragment>
                            {formUser.errorMessages.length > 0 && formUser.errorMessages.map((errorMsg, i) =>
                                <Alert variant="danger" key={`inavlid${i}`} >{errorMsg}</Alert>
                            )}

                            {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                        </Fragment>
                    }

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" placeholder="Ingresá un usuario" value={formUser.username} onChange={(e) => { setFormUser({ ...formUser, username: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingresá una contraseña" value={formUser.password} onChange={(e) => { setFormUser({ ...formUser, password: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Confirmar contraseña" value={formUser.confirmPassword} onChange={(e) => { setFormUser({ ...formUser, confirmPassword: e.target.value }) }} />
                    </Form.Group>

                    <Spinner isVisible={props.isLoading}></Spinner>

                    <Button variant="primary" type="submit" block onClick={onSignUpHandler}>
                        Confirmar
                    </Button>

                    <Form.Text className="">
                        {props.children}
                    </Form.Text>

                </Fragment>}

            {!props.error && props.message &&
                <Alert variant="success">
                    {props.successMessage}
                </Alert>
            }
        </Form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);