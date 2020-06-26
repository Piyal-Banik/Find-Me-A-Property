import React, { useState } from 'react';
import './navbar.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink} from 'reactstrap';
  
const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <Navbar className = 'navbar container-fluid' expand="md">
            <NavbarBrand className='logo-container col-3 col-sm-1' to='/' >
                <img className='logo' src='/images/logo.png' alt='' />
            </NavbarBrand>
            <NavbarToggler className='navbar-dark' onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className='options mr-auto main-nav' navbar>
                    <NavLink className='option' href='/'>Home</NavLink>
                    <NavLink className='option' activeClassName='selected' href='/shop'>Buy</NavLink>
                    <NavLink className='option' activeClassName='selected' href='/about'>Sell</NavLink>
                    <NavLink className='option' activeClassName='selected' href='/contact'>Rent</NavLink>
                    <NavLink className='option' activeClassName='selected' href='/contact'>Find Agents</NavLink>   
                </Nav>

                <Nav className='options' navbar>
                    <NavLink className='option login d-none d-md-block' activeClassName='selected' href='/my-account'>Sign In</NavLink>
                    <NavLink className='option join d-none d-md-block' activeClassName='selected' href='/my-account'>
                        <CustomButton inverted>Sign Up</CustomButton>
                    </NavLink>
                    <NavLink className='option mobile-join-option d-block d-md-none' activeClassName='selected' to='/my-account'>Login or Sign Up</NavLink>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Navigation;