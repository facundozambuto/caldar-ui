import React, { Fragment } from 'react';
import './Footer.css';

function Footer(props){
    return(
        <Fragment>
            <section id="footer" className="fixed-bottom">
                <div className="container">
                    <div className="row text-center text-xs-center text-sm-left text-md-left">
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>Facundo Zambuto - MCGA 2021 - UAI - Final</h5>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <ul className="list-unstyled quick-links">
                                <li><a href="https://github.com/facundozambuto/caldar2021/"><i className="fa fa-angle-double-right"></i>Repo API</a></li>
                                <li><a href="https://caldar2021-api.herokuapp.com/"><i className="fa fa-angle-double-right"></i>Heroku API</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <ul className="list-unstyled quick-links">
                                <li><a href="https://github.com/facundozambuto/caldar-ui"><i className="fa fa-angle-double-right"></i>Repo React</a></li>
                                <li><a href="https://caldar-ui.herokuapp.com/"><i className="fa fa-angle-double-right"></i>Heroku</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
export default Footer;