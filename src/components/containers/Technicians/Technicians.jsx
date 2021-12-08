import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getAllTechnicians } from '../../../redux/actions/techniciansActions';
import Spinner from '../../shared/Spinner';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AddTechnicianModal from '../../technicians/AddTechnicianModal';
import DeleteTechnicianModal from '../../technicians/DeleteTechnicianModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCog } from '@fortawesome/fontawesome-free-solid';
import styles from './Technicians.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        technicians: state.technicians.list,
        isLoading: state.technicians.isLoading,
        error: state.technicians.error,
        message: state.technicians.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTechnicians: () => { dispatch(getAllTechnicians()) },
    }
}

function Technicians(props) {

    const { getAllTechnicians } = props;
    useEffect(() => {
        getAllTechnicians();
    }, [getAllTechnicians]);


    const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false);
    const toggleAddTechnicianModal = () => {
        setShowAddTechnicianModal(!showAddTechnicianModal);
    }

    const [selectedTechnician, setSelectedTechnician] = useState({});
    const [showEditTechnicianModal, setShowEditTechnicianModal] = useState(false);
    const toggleEditTechnicianModal = () => {
        if (showEditTechnicianModal) {
            setSelectedTechnician({});
            setShowEditTechnicianModal(false);
        }
        if (!showEditTechnicianModal) {
            setShowEditTechnicianModal(true);
        }
    }

    const [showDeleteTechnicianModal, setShowDeleteTechnicianModal] = useState(false);
    const toggleDeleteTechnicianModal = () => {
        if (showDeleteTechnicianModal) {
            setSelectedTechnician({});
            setShowDeleteTechnicianModal(false);
        }
        if (!showDeleteTechnicianModal) {
            setShowDeleteTechnicianModal(true);
        }
    }

    return (
        <Container fluid="lg">
            <Row>
                <Col md="12">
                    <h1>Técnicos</h1>
                </Col>
            </Row>

            <Spinner isVisible={props.isLoading} />

            <Row className="row justify-content-center">
                <Col md="11">
                    {props.technicians && props.technicians.length > 0 &&
                        <Row>
                            <Col md="12">
                                <div className={styles.panelTable}>
                                    <div className={styles.panelHeading}>
                                        <Row>
                                            <Col xs="6">
                                                <h3 className={styles.panelTitle}>Menú de Técnicos</h3>
                                            </Col>
                                            <Col xs="6" className={styles.textRight}>
                                                <Button type="button" variant="primary"onClick={toggleAddTechnicianModal}><FontAwesomeIcon icon="plus" /> { }Agregar técnico nuevo</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={styles.panelBody}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th className={`${styles.theadFirst} ${styles.textCenter}`}><FontAwesomeIcon icon="cog" /></th>
                                                    <th className={`${styles.hiddenXS} ${styles.textCenter}`}>ID</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Nombre</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Apellido</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Fecha de Nacimiento</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Legajo</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Fecha de Inicio Actividad</th>
                                                    <th className={`${styles.border} ${styles.textCenter}`}>Fecha de Alta</th>
                                                </tr> 
                                            </thead>
                                            <tbody>
                                                {props.technicians.map(technician =>
                                                    <tr>
                                                        <td align="center">
                                                            <Button className="mr-1" variant="secondary"><FontAwesomeIcon icon="pencil-alt" onClick={() => {
                                                                setSelectedTechnician(technician);
                                                                toggleEditTechnicianModal();
                                                            }}/>{   }
                                                            </Button>
                                                            <Button variant="danger"><FontAwesomeIcon icon="trash" onClick={() => {
                                                                setSelectedTechnician(technician);
                                                                toggleDeleteTechnicianModal();
                                                            }}/>
                                                            </Button>
                                                        </td>
                                                        <td className={`${styles.hiddenXS} ${styles.textCenter}`}>{technician._id}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{technician.firstName}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{technician.lastName}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{moment(technician.dateOfBirth).format("DD-MM-YYYY")}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{technician.employeeRecord}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{moment(technician.startWorkingDate).format("DD-MM-YYYY")}</td>
                                                        <td className={`${styles.border} ${styles.textCenter}`}>{moment(technician.created_at).format("DD-MM-YYYY")}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    }
                    
                    {props.technicians && props.technicians.length === 0 &&
                        <div className={styles.textCenter}>No se encontró ningún técnico. ¡Agrega uno!
                            <Col md="12" className={styles.center}>
                                <Button type="button" variant="primary"onClick={toggleAddTechnicianModal}><FontAwesomeIcon icon="plus" /> { }Agregar técnico nuevo</Button>
                            </Col>
                        </div>
                    }
                </Col>
            </Row>

            {showAddTechnicianModal &&
                <AddTechnicianModal show={showAddTechnicianModal} handleClose={toggleAddTechnicianModal} />
            }

            {showEditTechnicianModal &&
                <AddTechnicianModal show={showEditTechnicianModal} selectedTechnician={selectedTechnician} handleClose={toggleEditTechnicianModal} />
            }

            {showDeleteTechnicianModal &&
                <DeleteTechnicianModal show={showDeleteTechnicianModal} selectedTechnician={selectedTechnician} handleClose={toggleDeleteTechnicianModal} />
            }

        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Technicians);