import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { addService, editService, clearService } from '../../redux/actions/servicesActions';
import { getAllBoilers } from '../../redux/actions/boilersActions';
import { getAllTechnicians } from '../../redux/actions/techniciansActions';
import { isNullOrEmty, isPastDate } from '../../utils/helpers/index';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        isLoading: state.services.service.isLoading,
        error: state.services.service.error,
        message: state.services.service.message,
        boilers: state.boilers.list,
        technicians: state.technicians.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addService: ({ customer, title, start, end, boilerId, technicianId }) => { dispatch(addService({ customer, title, start, end, boilerId, technicianId  })) },
        editService: (_id, { customer, title, start, end, boilerId, technicianId }) => { dispatch(editService(_id, { customer, title, start, end, boilerId, technicianId })) },
        clearService: () => { dispatch(clearService()) },
        getAllBoilers: () => { dispatch(getAllBoilers()) },
        getAllTechnicians: () => { dispatch(getAllTechnicians()) }
    }
}

function AddServiceModal(props) {

    const [selectedService, setSelectedService] = useState({});
    const [isServiceSelected, setIsServiceSelected] = useState(false);
    const [boilerType, setBoilerType] = useState('');
    const [technician, setTechnician] = useState('');

    const { getAllBoilers } = props;
    useEffect(() => {
        getAllBoilers();
    }, [getAllBoilers]);

    const { getAllTechnicians } = props;
    useEffect(() => {
        getAllTechnicians();
    }, [getAllTechnicians]);

    useEffect(() => {
        if (props.selectedService) {
            setSelectedService(props.selectedService);
            setIsServiceSelected(true);
        }
        props.clearService();
    }, []);

    const [formService, setFormService] = useState({
        customer: props.selectedService ? props.selectedService.customer : '',
        title: props.selectedService ? props.selectedService.title : '',
        start: props.selectedService ? props.selectedService.start : '',
        end: props.selectedService ? props.selectedService.end : '',
        boilerId: props.selectedService ? props.selectedService.boiler._id : '',
        technicianId: props.technicianId ? props.selectedService.technician._id : '',
        errorMessages: []
    });

    const validateFormService = (cb) => {

        const formPropertiesValidations = {
            "Cliente": !isNullOrEmty(formService.customer),
            "Descripción": !isNullOrEmty(formService.title),
            "Caldera": !isNullOrEmty(formService.boilerId),
            "Técnico": !isNullOrEmty(formService.technicianId),
            "Fecha de Inicio": !isNullOrEmty(formService.start),
            "Fecha de Inicio": !isPastDate(formService.start),
            "Fecha de Fin": !isNullOrEmty(formService.end),
            "Fecha de Fin": !isPastDate(formService.end)
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Campo inválido ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            setFormService({ ...formService, errorMessages: errorMessagesArray });
            return cb('Error al validar el formulario');
        }

        setFormService({ ...formService, errorMessages: [] });
        return cb(null);
    }

    const onEditServiceHandler = (event) => {
        event.preventDefault()
        validateFormService((error) => {
            if (!error) {
                props.editService(selectedService._id, { 
                    customer: formService.customer,
                    title: formService.title,
                    start: formService.start,
                    end: formService.end,
                    boilerId: formService.boilerId,
                    technicianId: formService.technicianId 
                });
            }
        });
    }

    const onAddNewServiceHandler = (event) => {
        event.preventDefault();

        validateFormService((error) => {
            if (!error) {
                props.addService(
                    {   
                        customer: formService.customer,
                        title: formService.title,
                        start: formService.start,
                        end: formService.end,
                        boilerId: formService.boilerId,
                        technicianId: formService.technicianId 
                    });
            }
        });
    }

    return (
        <BaseModal title={isServiceSelected ? "Editar Servicio" : "Nuevo Servicio"} show={props.show} handleClose={props.handleClose}>
            <Form>
                <Form.Group controlId="formBasicServiceCustomer">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control type="text" placeholder={isServiceSelected ? "Modificá el nombre del cliente" : "Ingresá el nombre del cliente"}
                        value={formService.customer} onChange={(e) => { setFormService({ ...formService, customer: e.target.value }) }} />
                </Form.Group>
                <Form.Group controlId="formBasicServiceTitle">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder={isServiceSelected ? "Modificá la descripción del servicio" : "Ingresá la descripción del servicio"}
                        value={formService.title} onChange={(e) => { setFormService({ ...formService, title: e.target.value }) }} />
                </Form.Group>
               
                {!isServiceSelected ?
                    <Form.Group controlId="formBasicServiceStart">
                        <Form.Label>Fecha de Inicio de Servicio</Form.Label>
                        <Form.Control type="date" placeholder={"Ingresá la fecha de inicio del servicio"}
                            value={formService.start} onChange={(e) => { setFormService({ ...formService, start: e.target.value }) } } />
                    </Form.Group> :
                    <Form.Group controlId="formBasicServiceStart">
                        <Form.Label>Fecha de Inicio de Servicio</Form.Label>
                        <Form.Control type="date" placeholder={"Modificá la fecha de inicio del servicio"}
                            value={moment(formService.start).format("YYYY-MM-DD")} onChange={(e) => { setFormService({ ...formService, start: moment(formService.start).format("YYYY-MM-DD") }) } } />
                    </Form.Group>
                }

                {!isServiceSelected ?
                    <Form.Group controlId="formBasicServiceEnd">
                        <Form.Label>Fecha de Fin de Servicio</Form.Label>
                        <Form.Control type="date" placeholder={"Ingresá la fecha de fin del servicio"}
                            value={formService.end} onChange={(e) => { setFormService({ ...formService, end: e.target.value }) } } />
                    </Form.Group> :
                    <Form.Group controlId="formBasicServiceEnd">
                        <Form.Label>Fecha de Fin de Servicio</Form.Label>
                        <Form.Control type="date" placeholder={"Modificá la fecha de fin del servicio"}
                            value={moment(formService.end).format("YYYY-MM-DD")} onChange={(e) => { setFormService({ ...formService, end: moment(formService.end).format("YYYY-MM-DD") }) } } />
                    </Form.Group>
                }
                
                {!isServiceSelected && props.boilers && props.boilers.length > 0 ?
                    <Form.Group controlId="formBasicServiceBoiler">
                        <Form.Label>Caldera</Form.Label>
                        <Form.Control as="select" value={formService.boilerId} onChange={e => {
                                setBoilerType(e.target.value);
                                setFormService({ ...formService, boilerId: e.target.value })
                            }}>
                            {props.boilers.map(boiler => (
                                <option value={boiler._id}>{boiler.boilerId}</option>
                            ))}
                        </Form.Control>
                    </Form.Group> :
                    <Form.Group controlId="formBasicServiceBoiler">
                        <Form.Label>Caldera</Form.Label>
                        <Form.Control as="select" value={formService.boilerId} onChange={e => {
                                    setBoilerType(e.target.value);
                                    setFormService({ ...formService, boilerId: e.target.value })
                                }}>
                                {props.boilers.map(boiler => (
                                    <option value={boiler._id}>{boiler.boilerId}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                }

                {!isServiceSelected && props.technicians && props.technicians.length > 0 ?
                    <Form.Group controlId="formBasicServiceTechnician">
                        <Form.Label>Técnico</Form.Label>
                        <Form.Control as="select" value={formService.technicianId} onChange={e => {
                                console.log("e.target.value", e.target.value);
                                setTechnician(e.target.value);
                                setFormService({ ...formService, technicianId: e.target.value })
                            }}>
                            {props.technicians.map(technician => (
                                <option value={technician._id}>{technician.firstName} {technician.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group> :
                    <Form.Group controlId="formBasicServiceTechnician">
                        <Form.Label>Técnico</Form.Label>
                        <Form.Control as="select" value={formService.technicianId} onChange={e => {
                                    console.log("e.target.value", e.target.value);
                                    setTechnician(e.target.value);
                                    setFormService({ ...formService, technicianId: e.target.value })
                                }}>
                                {props.technicians.map(technician => (
                                   <option value={technician._id}>{technician.firstName} {technician.lastName}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                }

                <Row>
                    <Col>
                        {!isServiceSelected &&
                            <Button variant="success" type="submit" block onClick={onAddNewServiceHandler}>
                                Agregar Servicio
                            </Button>
                        }
                        {isServiceSelected &&
                            <Button variant="success" type="submit" block onClick={onEditServiceHandler}>
                                Editar Servicio
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
                    {(formService.errorMessages.length > 0 || props.error) &&
                        <Fragment>
                            {formService.errorMessages.length > 0 && formService.errorMessages.map((errorMsg, i) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddServiceModal);