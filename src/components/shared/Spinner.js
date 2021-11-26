import React, { Fragment } from 'react';
import { Col } from 'react-bootstrap';

function Spinner(props) {
    return (
        <Fragment>
            {props.isVisible &&
                <Col className="text-center">
                    <img width="300px" src={require('../../assets/images/loading.gif')} />
                </Col>
            }
        </Fragment>
    );
}

export default Spinner;