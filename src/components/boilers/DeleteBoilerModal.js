import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { deleteBoiler, clearBoiler } from '../../redux/actions/boilersActions';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        isLoading: state.boilers.boiler.isLoading,
        error: state.boilers.boiler.error,
        message: state.boilers.boiler.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBoiler: (boilerId) => { dispatch(deleteBoiler(boilerId)) },
        clearBoiler: () => { dispatch(clearBoiler()) }
    }
}

function DeleteBoilerModal(props) {

    const [selectedBoiler, setSelectedBoiler] = useState({});
    const [isBoilerSelected, setIsBoilerSelected] = useState(false);
    useEffect(() => {
        if (props.selectedBoiler) {
            setSelectedBoiler(props.selectedBoiler);
            setIsBoilerSelected(true);
        }
        props.clearBoiler();
    }, []);

    const onDeleteBoilerHandler = (event) => {
        event.preventDefault()
        props.deleteBoiler(selectedBoiler._id);
    }

    return (
        <BaseModal title="Eliminar Caldera" show={props.show} handleClose={props.handleClose}>
            <Form>
                {isBoilerSelected && !props.error && !props.message &&
                    <Form.Group controlId="formBasicBoilerName">
                        <Form.Label>¿Estás seguro de querer eliminar la caldera {selectedBoiler.boilerId} de la marca {selectedBoiler.brand}?</Form.Label>
                        <Form.Text>Si eliminás la caldera, puede que servicios asociadas a la misma, también se eliminen.</Form.Text>
                    </Form.Group>
                }
                <Row>
                    <Col>
                        {isBoilerSelected && !props.error && !props.message &&
                            <Button variant="danger" type="submit" block onClick={onDeleteBoilerHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBoilerModal);