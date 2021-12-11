import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { deleteService, clearService } from '../../redux/actions/servicesActions';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isLoading: state.services.service.isLoading,
        error: state.services.service.error,
        message: state.services.service.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteService: (serviceId) => { dispatch(deleteService(serviceId)) },
        clearService: () => { dispatch(clearService()) }
    }
}

function DeleteServiceModal(props) {

    const [selectedService, setSelectedService] = useState({});
    const [isServiceSelected, setIsServiceSelected] = useState(false);
    useEffect(() => {
        if (props.selectedService) {
            setSelectedService(props.selectedService);
            setIsServiceSelected(true);
        }
        props.clearService();
    }, []);

    const onDeleteServiceHandler = (event) => {
        event.preventDefault()
        props.deleteService(selectedService._id);
    }

    return (
        <BaseModal title="Eliminar Caldera" show={props.show} handleClose={props.handleClose}>
            <Form>
                {isServiceSelected && !props.error && !props.message &&
                    <Form.Group controlId="formBasicServiceName">
                        <Form.Label>¿Estás seguro de querer eliminar el servicio {selectedService.title} del cliente {selectedService.customer}?</Form.Label>
                    </Form.Group>
                }
                <Row>
                    <Col>
                        {isServiceSelected && !props.error && !props.message &&
                            <Button variant="danger" type="submit" block onClick={onDeleteServiceHandler}>
                                Aceptar
                            </Button>
                        }
                    </Col>
                    <Col>
                        <Button variant="secondary" type="submit" block onClick={props.handleClose}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>

                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }

                {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
            </Form>
        </BaseModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteServiceModal);