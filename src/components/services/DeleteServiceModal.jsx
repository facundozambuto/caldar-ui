import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { deleteTechnician, clearTechnician } from '../../redux/actions/techniciansActions';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isLoading: state.technicians.technician.isLoading,
        error: state.technicians.technician.error,
        message: state.technicians.technician.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTechnician: (technicianId) => { dispatch(deleteTechnician(technicianId)) },
        clearTechnician: () => { dispatch(clearTechnician()) }
    }
}

function DeleteTechnicianModal(props) {

    const [selectedTechnician, setSelectedTechnician] = useState({});
    const [isTechnicianSelected, setIsTechnicianSelected] = useState(false);
    useEffect(() => {
        if (props.selectedTechnician) {
            setSelectedTechnician(props.selectedTechnician);
            setIsTechnicianSelected(true);
        }
        props.clearTechnician();
    }, []);

    const onDeleteTechnicianHandler = (event) => {
        event.preventDefault()
        props.deleteTechnician(selectedTechnician._id);
    }

    return (
        <BaseModal title="Eliminar Caldera" show={props.show} handleClose={props.handleClose}>
            <Form>
                {isTechnicianSelected && !props.error && !props.message &&
                    <Form.Group controlId="formBasicTechnicianName">
                        <Form.Label>¿Estás seguro de querer eliminar al técnico {selectedTechnician.firstName} {selectedTechnician.lastName}?</Form.Label>
                        <Form.Text>Si eliminás al técnico, puede que servicios asociadas al mismo, también se eliminen.</Form.Text>
                    </Form.Group>
                }
                <Row>
                    <Col>
                        {isTechnicianSelected && !props.error && !props.message &&
                            <Button variant="danger" type="submit" block onClick={onDeleteTechnicianHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTechnicianModal);