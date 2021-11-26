import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import { addBoiler, editBoiler, clearBoiler } from '../../redux/actions/boilersActions';
import { isNullOrEmty } from '../../utils/helpers/index';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        isLoading: state.boilers.boiler.isLoading,
        error: state.boilers.boiler.error,
        message: state.boilers.boiler.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBoiler: ({ boilerId, brand, temperature, capacity, madeDate}) => { dispatch(addBoiler({ boilerId, brand, temperature, capacity, madeDate })) },
        editBoiler: (_id, { boilerId, brand, temperature, capacity, madeDate }) => { dispatch(editBoiler(_id, { boilerId, brand, temperature, capacity, madeDate })) },
        clearBoiler: () => { dispatch(clearBoiler()) }
    }
}

function AddBoilerModal(props) {

    const [selectedBoiler, setSelectedBoiler] = useState({});
    const [isBoilerSelected, setIsBoilerSelected] = useState(false);
    useEffect(() => {
        if (props.selectedBoiler) {
            setSelectedBoiler(props.selectedBoiler);
            setIsBoilerSelected(true);
        }
        props.clearBoiler();
    }, []);

    const [formBoiler, setFormBoiler] = useState({
        boilerId: props.selectedBoiler ? props.selectedBoiler.boilerId : '',
        brand: props.selectedBoiler ? props.selectedBoiler.brand : '',
        temperature: props.selectedBoiler ? props.selectedBoiler.temperature : '',
        capacity: props.selectedBoiler ? props.selectedBoiler.capacity : '',
        madeDate: props.selectedBoiler ? props.selectedBoiler.madeDate : '',
        errorMessages: []
    });

    const validateFormBoiler = (cb) => {

        const formPropertiesValidations = {
            "Alias": !isNullOrEmty(formBoiler.boilerId),
        };

        const errorMessagesArray = Object.keys(formPropertiesValidations).filter(propertyName => {
            return !formPropertiesValidations[propertyName];
        }).map(propertyName => {
            return `Campo inválido ${propertyName}`;
        });

        if (errorMessagesArray.length > 0) {
            setFormBoiler({ ...formBoiler, errorMessages: errorMessagesArray });
            return cb('Error al validar el formulario');
        }

        setFormBoiler({ ...formBoiler, errorMessages: [] });
        return cb(null);
    }

    const onEditBoilerHandler = (event) => {
        event.preventDefault()
        validateFormBoiler((error) => {
            if (!error) {
                props.editBoiler(selectedBoiler._id, { 
                    boilerId: formBoiler.boilerId,
                    brand: formBoiler.brand,
                    temperature: formBoiler.temperature,
                    capacity: formBoiler.capacity,
                    madeDate: formBoiler.madeDate 
                });
            }
        });
    }

    const onAddNewBoilerHandler = (event) => {
        event.preventDefault();

        validateFormBoiler((error) => {
            if (!error) {
                props.addBoiler(
                    {   
                        boilerId: formBoiler.boilerId,
                        brand: formBoiler.brand,
                        temperature: formBoiler.temperature,
                        capacity: formBoiler.capacity,
                        madeDate: formBoiler.madeDate
                    });
            }
        });
    }

    return (
        <BaseModal title={isBoilerSelected ? "Editar Caldera" : "Nueva caldera"} show={props.show} handleClose={props.handleClose}>
            <Form>
                <Form.Group controlId="formBasicBoilerName">
                    <Form.Label>Alias</Form.Label>
                    <Form.Control type="text" placeholder={isBoilerSelected ? "Modificá el alias de la caldera" : "Ingresá el alias de la caldera"}
                        value={formBoiler.boilerId} onChange={(e) => { setFormBoiler({ ...formBoiler, boilerId: e.target.value }) }} />
                </Form.Group>
                <Form.Group controlId="formBasicBoilerBrand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder={isBoilerSelected ? "Modificá la marca de la caldera" : "Ingresá la marca de la caldera"}
                        value={formBoiler.brand} onChange={(e) => { setFormBoiler({ ...formBoiler, brand: e.target.value }) }} />
                </Form.Group>
                <Form.Group controlId="formBasicBoilerTemperature">
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control type="number" placeholder={isBoilerSelected ? "Modificá la temperatura de la caldera" : "Ingresá la temperatura de la caldera"}
                        value={formBoiler.temperature} onChange={(e) => { setFormBoiler({ ...formBoiler, temperature: e.target.value }) }} />
                </Form.Group>
                <Form.Group controlId="formBasicBoilerCapacity">
                    <Form.Label>Capacidad</Form.Label>
                    <Form.Control type="number" placeholder={isBoilerSelected ? "Modificá la capacidad de la caldera" : "Ingresá la capacidad de la caldera"}
                        value={formBoiler.capacity} onChange={(e) => { setFormBoiler({ ...formBoiler, capacity: e.target.value }) }} />
                </Form.Group>
                
                {!isBoilerSelected ?
                    <Form.Group controlId="formBasicBoilerMadeDate">
                        <Form.Label>Fecha de Fabricación</Form.Label>
                        <Form.Control type="date" placeholder={"Ingresá la fecha de fabricación de la caldera"}
                            value={formBoiler.madeDate} onChange={(e) => { setFormBoiler({ ...formBoiler, madeDate: e.target.value }) } } />
                    </Form.Group> :
                    <Form.Group controlId="formBasicBoilerMadeDate">
                        <Form.Label>Fecha de Fabricación</Form.Label>
                        <Form.Control type="date" placeholder={"Modificá la fecha de fabricación de la caldera"}
                        value={moment(formBoiler.madeDate).format("YYYY-MM-DD")} onChange={(e) => { setFormBoiler({ ...formBoiler, madeDate: moment(formBoiler.madeDate).format("YYYY-MM-DD") }) } } />
                    </Form.Group>
                }

                <Row>
                    <Col>
                        {!isBoilerSelected &&
                            <Button variant="success" type="submit" block onClick={onAddNewBoilerHandler}>
                                Agregar Caldera
                            </Button>
                        }
                        {isBoilerSelected &&
                            <Button variant="success" type="submit" block onClick={onEditBoilerHandler}>
                                Editar Caldera
                            </Button>
                        }
                    </Col>
                    <Col>
                        <Button variant="secondary" type="submit" block onClick={props.handleClose}>
                            Cerrar
                        </Button>
                    </Col>
                </Row>
                
                {!props.error && props.message &&
                    <Alert variant="success">
                        {props.message}
                    </Alert>
                }
                {(formBoiler.errorMessages.length > 0 || props.error) &&
                    <Fragment>
                        {formBoiler.errorMessages.length > 0 && formBoiler.errorMessages.map((errorMsg, i) =>
                            <Alert variant="danger" key={`inavlid${i}`} >{errorMsg} </Alert>
                        )}

                        {props.error && props.message && <Alert variant="danger">{props.message}</Alert>}
                    </Fragment>
                }
            </Form>
        </BaseModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoilerModal);