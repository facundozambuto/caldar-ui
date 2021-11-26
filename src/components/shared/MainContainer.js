import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

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