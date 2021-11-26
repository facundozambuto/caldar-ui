import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout:() => {dispatch(logout())}
    }
}

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logOutButtonHandler = () => {
      props.logout();
  }

  return (
	<div className="mb-4">
		{props.isAuth &&
			<IconContext.Provider value={{ color: '#fff' }}>
				<div className='navbar d-flex justify-content-between'>
					<Link to='#' className='menu-bars'>
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
					<Button className="float-right" variant="danger" onClick={logOutButtonHandler} id="logout-button">Cerrar sesión</Button>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbar-toggle'>
							<Link to='#' className='menu-bars'>
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
							<li key={index} className={item.cName}>
								<Link to={item.path}>
								{item.icon}
								<span>{item.title}</span>
								</Link>
							</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		}     
	</div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);