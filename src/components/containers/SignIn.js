import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import { Container, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function SignIn(props) {
    return (
        <Fragment>
            {props.isAuth && <Redirect to="/"></Redirect>}
            {!props.isAuth &&
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5" className="bg-light bg-gradient p-4 rounded">
                            <SignInForm></SignInForm>
                        </Col>
                    </Row>
                </Container>
            }
        </Fragment>
    );
}

export default connect(mapStateToProps)(SignIn);