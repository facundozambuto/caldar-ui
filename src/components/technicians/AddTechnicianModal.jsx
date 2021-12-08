import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { addTechnician, editTechnician, clearTechnician } from '../../redux/actions/techniciansActions';
import { isNullOrEmty, isPastDate } from '../../utils/helpers/index';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        isLoading: state.technicians.technician.isLoading,
        error: state.technicians.technician.error,
        message: state.technicians.technician.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTechnician: ({ firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth}) => { dispatch(addTechnician({ firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth })) },
        editTechnician: (_id, { firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth }) => { dispatch(editTechnician(_id, { firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth })) },
        clearTechnician: () => { dispatch(clearTechnician()) }
    }
}

function AddTechnicianModal(props) {

    const [selectedTechnician, setSelectedTechnician] = useState({});
    const [isTechnicianSelected, setIsTechnicianSelected] = useState(false);
    useEffect(() => {
        if (props.selectedTechnician) {
            setSelectedTechnician(props.selectedTechnician);
            setIsTechnicianSelected(true);
        }
        props.clearTechnician();
    }, []);

    const [formTechnician, setFormTechnician] = useState({
        firstName: props.selectedTechnician ? props.selectedTechnician.firstName : '',
        lastName: props.selectedTechnician ? props.selectedTechnician.lastName : '',
        startWorkingDate: props.selectedTechnician ? props.selectedTechnician.startWorkingDate : '',
        employeeRecord: props.selectedTechnician ? props.selectedTechnician.employeeRecord : '',
        dateOfBirth: props.selectedTechnician ? props.selectedTechnician.dateOfBirth : '',
        errorMessages: []
    });

    const validateFormTechnician = (cb) => {

        const formPropertiesValidations = {
            "Nombre": !isNullOrEmty(formTechnician.firstName),
            "Legajo": !isNullOrEmty(formTechnician.employeeRecord),
            "Apellido": !isNullOrEmty(formTechnician.lastName),
            "Fecha de Nacimiento": !isNullOrEmty(formTechnician.dateOfBirth),
            "Fecha de Nacimiento": isPastDate(formTechnician.dateOfBirth)
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Campo inválido ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            setFormTechnician({ ...formTechnician, errorMessages: errorMessagesArray });
            return cb('Error al validar el formulario');
        }

        setFormTechnician({ ...formTechnician, errorMessages: [] });
        return cb(null);
    }

    const onEditTechnicianHandler = (event) => {
        event.preventDefault()
        validateFormTechnician((error) => {
            if (!error) {
                props.editTechnician(selectedTechnician._id, { 
                    firstName: formTechnician.firstName,
                    lastName: formTechnician.lastName,
                    startWorkingDate: formTechnician.startWorkingDate,
                    employeeRecord: formTechnician.employeeRecord,
                    dateOfBirth: formTechnician.dateOfBirth 
                });
            }
        });
    }

    const onAddNewTechnicianHandler = (event) => {
        event.preventDefault();

        validateFormTechnician((error) => {
            if (!error) {
                props.addTechnician(
                    {   
                        firstName: formTechnician.firstName,
                        lastName: formTechnician.lastName,
                        startWorkingDate: formTechnician.startWorkingDate,
                        employeeRecord: formTechnician.employeeRecord,
                        dateOfBirth: formTechnician.dateOfBirth
                    });
            }
        });
    }

    return (
        <BaseModal title={isTechnicianSelected ? "Editar Técnico" : "Nuevo Técnico"} show={props.show} handleClose={props.handleClose}>
            <Form>
                <Form.Group controlId="formBasicTechnicianFirstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder={isTechnicianSelected ? "Modificá el nombre del técnico" : "Ingresá el nombre del técnico"}
                        value={formTechnician.firstName} onChange={(e) => { setFormTechnician({ ...formTechnician, firstName: e.target.value }) }} />
                </Form.Group>
                <Form.Group controlId="formBasicTechnicianLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder={isTechnicianSelected ? "Modificá el apellido del empleado" : "Ingresá el apellido del técnico"}
                        value={formTechnician.lastName} onChange={(e) => { setFormTechnician({ ...formTechnician, lastName: e.target.value }) }} />
                </Form.Group>
               
                <Form.Group controlId="formBasicTechnicianEmployeeRecord">
                    <Form.Label>Legajo</Form.Label>
                    <Form.Control type="text" placeholder={isTechnicianSelected ? "Modificá el legajo del técnico" : "Ingresá el legajo del técnico"}
                        value={formTechnician.employeeRecord} onChange={(e) => { setFormTechnician({ ...formTechnician, employeeRecord: e.target.value }) }} />
                </Form.Group>

                {!isTechnicianSelected ?
                    <Form.Group controlId="formBasicTechnicianStartWorkingDate">
                        <Form.Label>Fecha Inicio Actividad</Form.Label>
                        <Form.Control type="date" placeholder={"Ingresá la fecha de inicio de actividad"}
                            value={formTechnician.startWorkingDate} onChange={(e) => { setFormTechnician({ ...formTechnician, startWorkingDate: e.target.value }) }} />
                    </Form.Group> :
                    <Form.Group controlId="formBasicTechnicianStartWorkingDate">
                        <Form.Label>Fecha Inicio Actividad ed</Form.Label>
                        <Form.Control type="date" placeholder={"Modificá la fecha de inicio de actividad"}
                            value={moment(formTechnician.startWorkingDate).format("YYYY-MM-DD")} onChange={(e) => { setFormTechnician({ ...formTechnician, startWorkingDate: moment(formTechnician.startWorkingDate).format("YYYY-MM-DD") }) } } />
                    </Form.Group>
                }
                
                {!isTechnicianSelected ?
                    <Form.Group controlId="formBasicTechnicianDateOfBirth">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" placeholder={"Ingresá la fecha de nacimiento del técnico"}
                            value={formTechnician.dateOfBirth} onChange={(e) => { setFormTechnician({ ...formTechnician, dateOfBirth: e.target.value }) } } />
                    </Form.Group> :
                    <Form.Group controlId="formBasicTechnicianDateOfBirth">
                        <Form.Label>Fecha de Nacimiento ed</Form.Label>
                        <Form.Control type="date" placeholder={"Modificá la fecha de nacimiento del técnico"}
                            value={moment(formTechnician.dateOfBirth).format("YYYY-MM-DD")} onChange={(e) => { setFormTechnician({ ...formTechnician, dateOfBirth: moment(formTechnician.dateOfBirth).format("YYYY-MM-DD") }) } } />
                    </Form.Group>
                }

                <Row>
                    <Col>
                        {!isTechnicianSelected &&
                            <Button variant="success" type="submit" block onClick={onAddNewTechnicianHandler}>
                                Agregar Técnico
                            </Button>
                        }
                        {isTechnicianSelected &&
                            <Button variant="success" type="submit" block onClick={onEditTechnicianHandler}>
                                Editar Técnico
                            </Button>
                        }
                    </Col>
                    <Col>
                        <Button variant="secondary" type="submit" block onClick={props.handleClose}>
                            Cerrar
                        </Button>
                    </Col>
                </Row>
                
                <Row className="mt-5 ml-2">
                    {!props.error && props.message &&
                        <Alert variant="success">
                            {props.message}
                        </Alert>
                    }
                    {(formTechnician.errorMessages.length > 0 || props.error) &&
                        <Fragment>
                            {formTechnician.errorMessages.length > 0 && formTechnician.errorMessages.map((errorMsg, i) =>
                                <Alert variant="danger" key={`inavlid${i}`} >{errorMsg} </Alert>
                            )}

                            {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                        </Fragment>
                    }
                </Row>
                
            </Form>
        </BaseModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTechnicianModal);