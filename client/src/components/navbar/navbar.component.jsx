import React, {Component} from 'react';
import './navbar.styles.scss';

import {NavLink} from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

class Navbar extends Component {
    render() {
        return(
            <div className = 'navbar'>
                <NavLink className='logo-container' to='/' >
                    <img className='logo' src='/images/logo.png' alt='' />
                </NavLink>

                <div className='options main-nav'>
                    <NavLink className='option' to='/'>Home</NavLink>
                    <NavLink className='option' activeClassName='selected' to='/shop'>Buy</NavLink>
                    <NavLink className='option' activeClassName='selected' to='/about'>Sell</NavLink>
                    <NavLink className='option' activeClassName='selected' to='/contact'>Rent</NavLink>
                    <NavLink className='option' activeClassName='selected' to='/contact'>Find Agents</NavLink>   
                </div>
                <div className='options'>
                    <NavLink className='option login' activeClassName='selected' to='/my-account'>Sign In</NavLink>
                    <NavLink className='option join' activeClassName='selected' to='/my-account'>
                        <CustomButton inverted>Sign Up</CustomButton>
                    </NavLink>
                </div>
            </div>
        );
    };
};

export default Navbar;