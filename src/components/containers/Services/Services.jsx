import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getAllServices } from '../../../redux/actions/servicesActions';
import Spinner from '../../shared/Spinner';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AddServiceModal from '../../services/AddServiceModal';
import DeleteServiceModal from '../../services/DeleteServiceModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCog } from '@fortawesome/fontawesome-free-solid';
import styles from './Services.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import UserRoute from '../../shared/UserRoute';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { parseServicesDate } from '../../../utils/helpers/index';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        services: state.services.list,
        isLoading: state.services.isLoading,
        error: state.services.error,
        message: state.services.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllServices: () => { dispatch(getAllServices()) },
    }
}

const localizer = momentLocalizer(moment)

function Services(props) {

    const { getAllServices } = props;
    useEffect(() => {
        getAllServices();
    }, [getAllServices]);


    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const toggleAddServiceModal = () => {
        setShowAddServiceModal(!showAddServiceModal);
    }

    const [selectedService, setSelectedService] = useState({});
    const [showEditServiceModal, setShowEditServiceModal] = useState(false);
    const toggleEditServiceModal = () => {
        if (showEditServiceModal) {
            setSelectedService({});
            setShowEditServiceModal(false);
        }
        if (!showEditServiceModal) {
            setShowEditServiceModal(true);
        }
    }

    const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
    const toggleDeleteServiceModal = () => {
        if (showDeleteServiceModal) {
            setSelectedService({});
            setShowDeleteServiceModal(false);
        }
        if (!showDeleteServiceModal) {
            setShowDeleteServiceModal(true);
        }
    }

    const [showCalendarMode, setCalendarMode] = React.useState(true);

    const handleCollapse = () => {
        setCalendarMode((prevState) => !prevState);
    };

    return ( 
        <UserRoute>
            <Container fluid="lg">
                <Row>
                    <Col md="12">
                        <h1>Servicios</h1>
                    </Col>
                </Row>

                <Spinner isVisible={props.isLoading} />

                <Row className="row justify-content-center">
                    <Col md="11">
                        {props.services && props.services.length > 0 &&
                            <Row>
                                <Col md="12">
                                    <div className={styles.panelTable}>
                                        <div className={styles.panelHeading}>
                                            <Row>
                                                {showCalendarMode &&
                                                    <Col xs="6">
                                                        <Button type="button" variant="secondary" onClick={handleCollapse}><FontAwesomeIcon icon="table" /> { }Cambiar a Tabla</Button>
                                                    </Col>
                                                }
                                                {!showCalendarMode &&
                                                    <Col xs="6">
                                                        <Button type="button" variant="secondary" onClick={handleCollapse}><FontAwesomeIcon icon="calendar" /> { }Cambiar a Calendario</Button>
                                                    </Col>
                                                }
                                                <Col xs="6" className={styles.textRight}>
                                                    <Button type="button" variant="primary" onClick={toggleAddServiceModal}><FontAwesomeIcon icon="plus" /> { }Agregar servicio nuevo</Button>
                                                </Col>
                                            </Row>
                                        </div>

                                        {showCalendarMode &&
                                            <Calendar localizer={localizer} 
                                            events={parseServicesDate(props.services)}
                                            startAccessor="start"
                                            endAccessor="end"
                                            culture="es"
                                            messages={{
                                                next: 'Siguiente',
                                                previous: 'Anterior',
                                                today: 'Hoy',
                                                month: 'Mes',
                                                week: 'Semana',
                                                day: 'Día',
                                                work_week: 'Semana laboral',
                                                allDay: 'Todo el día',
                                                yesterday: 'Ayer',
                                                tomorrow: 'Mañana',
                                                noEventsInRange: 'No se encontró ningún evento',
                                                showMore: function showMore(total) {
                                                return '+' + total + 'total';
                                                }}}/>
                                        }

                                        {!showCalendarMode &&

                                            <div className={styles.panelBody}>
                                                <table className={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th className={`${styles.theadFirst} ${styles.textCenter}`}><FontAwesomeIcon icon="cog" /></th>
                                                            <th className={`${styles.hiddenXS} ${styles.textCenter}`}>ID</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Cliente</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Descripción</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Fecha Comienzo</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Fecha Fin</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Caldera</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Técnico</th>
                                                            <th className={`${styles.border} ${styles.textCenter}`}>Fecha de Alta</th>
                                                        </tr> 
                                                    </thead>
                                                    <tbody>
                                                        {props.services.map(service =>
                                                            <tr>
                                                                <td align="center">
                                                                    <Button className="mr-1" variant="secondary"><FontAwesomeIcon icon="pencil-alt" onClick={() => {
                                                                        setSelectedService(service);
                                                                        toggleEditServiceModal();
                                                                    }}/>{   }
                                                                    </Button>
                                                                    <Button variant="danger"><FontAwesomeIcon icon="trash" onClick={() => {
                                                                        setSelectedService(service);
                                                                        toggleDeleteServiceModal();
                                                                    }}/>
                                                                    </Button>
                                                                </td>
                                                                <td className={`${styles.hiddenXS} ${styles.textCenter}`}>{service._id}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{service.customer}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{service.title}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{moment(service.start).format("DD-MM-YYYY")}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{moment(service.end).format("DD-MM-YYYY")}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{service.boiler.boilerId}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{service.technician.firstName} {service.technician.lastName}</td>
                                                                <td className={`${styles.border} ${styles.textCenter}`}>{moment(service.created_at).format("DD-MM-YYYY")}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        }
                        
                        {props.services && props.services.length === 0 &&
                            <div className={styles.textCenter}>No se encontró ningún servicio. ¡Agrega uno!
                                <Col md="12" className={styles.center}>
                                    <Button type="button" variant="primary"onClick={toggleAddServiceModal}><FontAwesomeIcon icon="plus" /> { }Agregar servicio nuevo</Button>
                                </Col>
                            </div>
                        }
                    </Col>
                </Row>

                {showAddServiceModal &&
                    <AddServiceModal show={showAddServiceModal} handleClose={toggleAddServiceModal} />
                }

                {showEditServiceModal &&
                    <AddServiceModal show={showEditServiceModal} selectedService={selectedService} handleClose={toggleEditServiceModal} />
                }

                {showDeleteServiceModal &&
                    <DeleteServiceModal show={showDeleteServiceModal} selectedService={selectedService} handleClose={toggleDeleteServiceModal} />
                }

            </Container>
        </UserRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);