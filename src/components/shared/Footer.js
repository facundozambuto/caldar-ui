import React, { Fragment } from 'react';
import './Footer.css';

function Footer(props){
    return(
        <Fragment>
            <section id="footer" class="fixed-bottom">
                <div class="container">
                    <div class="row text-center text-xs-center text-sm-left text-md-left">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <h5>Facundo Zambuto - MCGA 2021 - UAI - 2° Parcial</h5>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <ul class="list-unstyled quick-links">
                                <li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>Repo Github</a></li>
                                <li><a href="https://www.fiverr.com/share/qb8D02"><i class="fa fa-angle-double-right"></i>Heroku</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
export default Footer;