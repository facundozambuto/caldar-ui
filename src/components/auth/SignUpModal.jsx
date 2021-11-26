import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import BaseModal from '../shared/BaseModal';
import SignUpForm from './SignUpForm';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

function SignUpModal(props) {
    return (
        <BaseModal title="Crear una cuenta nueva" show={props.show} handleClose={props.handleClose}>
            <SignUpForm successMessage={
                <Fragment>
                    Cuenta creada con éxito<Link to='/signin' onClick={props.handleClose} >Iniciá sesión</Link>
                </Fragment>}>
            </SignUpForm>
        </BaseModal>
    );
}

export default connect(mapStateToProps)(SignUpModal);