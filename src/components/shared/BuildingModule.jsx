import React from 'react';
import { Container } from 'react-bootstrap';
import UserRoute from '../shared/UserRoute';

function BuildingModule(props){
    return(
        <UserRoute>
            <Container>
                <h1>Módulo en construcción</h1>
            </Container>
        </UserRoute>
    );
}

export default BuildingModule;