import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function MainContainer(props){
    return(
        <div className="">
            <Navbar></Navbar>
            {props.children}
            <Footer></Footer>
        </div>
    );
}
export default MainContainer;