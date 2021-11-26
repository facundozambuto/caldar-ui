import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function Home(props) {

    const [showSignUpModal, SetShowSignUpModal] = useState(false);
    
    const toggleShowSignUpModal = () => {
        SetShowSignUpModal(!showSignUpModal);
    }

    return (
        <Container>
            {!props.isAuth && 
                <Row className="justify-content-md-center">
                    <Col md="12" className="bg-success bg-gradient rounded">
                        <h3 className="text-center p-5 rounded text-white">
                            PARCIAL 2 - MCGA - FACUNDO ZAMBUTO
                        </h3>
                    </Col>
                    <Col md="12" className="bg-success bg-gradient rounded text-center p-5">
                        <Button onClick={toggleShowSignUpModal} className="mr-3" variant="primary">Registrarse</Button>
                        <Button onClick={window.location.href = '/signin'} variant="secondary">Iniciar Sesión</Button>
                    </Col>
                </Row>
            }
            
            {props.isAuth &&
                <Row className="justify-content-center">
                    <Col className="p-2 bg-success bg-gradient rounded">
                        <h3 className="text-center p-5 rounded text-white">
                            CALDAR 2021 - MCGA - FACUNDO ZAMBUTO
                        </h3>
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default connect(mapStateToProps)(Home);