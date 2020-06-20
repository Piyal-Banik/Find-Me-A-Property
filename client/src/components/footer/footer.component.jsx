import React from 'react';
import './footer.styles.scss';
import {NavLink} from 'react-router-dom';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';

const Footer = (props) => (
    <div className='footer'>
        <div className='footer-section'>
            <h3>PAGES</h3>
            <hr className='divider'/>
            <div className='pages'>
                <NavLink className='option' to='/'>Home</NavLink>
                <hr />
                <NavLink className='option' to='/shop'>SHOP</NavLink>
                <hr />
                <NavLink className='option' to='/about'>ABOUT</NavLink>
                <hr />
                <NavLink className='option' to='/contact'>CONTACT</NavLink>
                <hr />
                <NavLink className='option' to='/account'>MY ACCOUNT</NavLink>
            </div>
        </div>

        <div className='footer-section contact-us'>
            <h3>Our Location</h3>
            <hr className='divider'/>
            <span>3015 Grand Ave, Coconut Grove, Merrick, FL 12345</span>
            <span className='fa fa-phone'> +123-456-789</span>
            <span className='fa fa-envelope'> abc@email.com</span>
        </div>

        <div className='footer-section'>
            <h3>Newsletter</h3>
            <hr className='divider'/>
            <FormInput className='form-input' placeholder='Your Email (required)' />

            <CustomButton inverted>Sign Up</CustomButton>
        </div>
    </div>
);

export default Footer;