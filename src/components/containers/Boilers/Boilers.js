import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import UserRoute from '../../shared/UserRoute';
import { getAllBoilers } from '../../../redux/actions/boilersActions';
import Spinner from '../../shared/Spinner';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AddBoilerModal from '../../boilers/AddBoilerModal';
import DeleteBoilerModal from '../../boilers/DeleteBoilerModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCog } from '@fortawesome/fontawesome-free-solid';
import styles from './Boilers.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        boilers: state.boilers.list,
        isLoading: state.boilers.isLoading,
        error: state.boilers.error,
        message: state.boilers.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBoilers: () => { dispatch(getAllBoilers()) },
    }
}

function Boilers(props) {

    const { getAllBoilers } = props;
    useEffect(() => {
        getAllBoilers();
    }, [getAllBoilers]);


    const [showAddBoilerModal, setShowAddBoilerModal] = useState(false);
    const toggleAddBoilerModal = () => {
        setShowAddBoilerModal(!showAddBoilerModal);
    }

    const [selectedBoiler, setSelectedBoiler] = useState({});
    const [showEditBoilerModal, setShowEditBoilerModal] = useState(false);
    const toggleEditBoilerModal = () => {
        if (showEditBoilerModal) {
            setSelectedBoiler({});
            setShowEditBoilerModal(false);
        }
        if (!showEditBoilerModal) {
            setShowEditBoilerModal(true);
        }
    }

    const [showDeleteBoilerModal, setShowDeleteBoilerModal] = useState(false);
    const toggleDeleteBoilerModal = () => {
        if (showDeleteBoilerModal) {
            setSelectedBoiler({});
            setShowDeleteBoilerModal(false);
        }
        if (!showDeleteBoilerModal) {
            setShowDeleteBoilerModal(true);
        }
    }

    return (
        <UserRoute>
            <Container fluid="lg">
                <Row>
                    <Col md="12">
                        <h1>Calderas</h1>
                    </Col>
                </Row>

                <Spinner isVisible={props.isLoading} />

                <Row className="row justify-content-center">
                    <Col md="11">
                        {props.boilers && props.boilers.length > 0 &&
                            <Row>
                                <Col md="12">
                                    <div className={styles.panelTable}>
                                        <div className={styles.panelHeading}>
                                            <Row>
                                                <Col xs="6">
                                                    <h3 className={styles.panelTitle}>Menú de Calderas</h3>
                                                </Col>
                                                <Col xs="6" className={styles.textRight}>
                                                    <Button type="button" variant="primary"onClick={toggleAddBoilerModal}><FontAwesomeIcon icon="plus" /> { }Agregar Caldera nueva</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className={styles.panelBody}>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th className={`${styles.theadFirst} ${styles.textCenter}`}><FontAwesomeIcon icon="cog" /></th>
                                                        <th className={`${styles.hiddenXS} ${styles.textCenter}`}>ID</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Alias</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Marca</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Temperatura</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Capacidad</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Fecha Fabricación</th>
                                                        <th className={`${styles.border} ${styles.textCenter}`}>Fecha Alta</th>
                                                    </tr> 
                                                </thead>
                                                <tbody>
                                                    {props.boilers.map(boiler =>
                                                        <tr>
                                                            <td align="center">
                                                                <Button className="mr-1" variant="secondary"><FontAwesomeIcon icon="pencil-alt" onClick={() => {
                                                                    setSelectedBoiler(boiler);
                                                                    toggleEditBoilerModal();
                                                                }}/>{   }
                                                                </Button>
                                                                <Button variant="danger"><FontAwesomeIcon icon="trash" onClick={() => {
                                                                    setSelectedBoiler(boiler);
                                                                    toggleDeleteBoilerModal();
                                                                }}/>
                                                                </Button>
                                                            </td>
                                                            <td className={`${styles.hiddenXS} ${styles.textCenter}`}>{boiler._id}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{boiler.boilerId}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{boiler.brand}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{boiler.temperature}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{boiler.capacity}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{moment(selectedBoiler.madeDate).format("DD-MM-YYYY")}</td>
                                                            <td className={`${styles.border} ${styles.textCenter}`}>{moment(selectedBoiler.created_at).format("DD-MM-YYYY")}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        }
                        
                        {props.boilers && props.boilers.length === 0 &&
                            <div className={styles.textCenter}>No se encontró ninguna caldera. ¡Agrega una!
                                <Col md="12" className={styles.center}>
                                    <Button type="button" variant="primary"onClick={toggleAddBoilerModal}><FontAwesomeIcon icon="plus" /> { }Agregar Caldera nueva</Button>
                                </Col>
                            </div>
                        }
                    </Col>
                </Row>

                {showAddBoilerModal &&
                    <AddBoilerModal show={showAddBoilerModal} handleClose={toggleAddBoilerModal} />
                }

                {showEditBoilerModal &&
                    <AddBoilerModal show={showEditBoilerModal} selectedBoiler={selectedBoiler} handleClose={toggleEditBoilerModal} />
                }

                {showDeleteBoilerModal &&
                    <DeleteBoilerModal show={showDeleteBoilerModal} selectedBoiler={selectedBoiler} handleClose={toggleDeleteBoilerModal} />
                }

            </Container>
        </UserRoute>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Boilers);