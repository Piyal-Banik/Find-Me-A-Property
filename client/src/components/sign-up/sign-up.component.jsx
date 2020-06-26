import React, {Component} from 'react';
import axios from 'axios';
import SectionTitle from '../section-title/section-title.component';

import './sign-up.styles.scss'

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            image: undefined
        }
    }

    handleTextChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleFileChange = (event) => {
        this.setState({image: event.target.files[0]});
    }

    restoreState = () => {
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            image: undefined,
            imageKey: Date.now()
        })
    }

    signup = (event) => {
        event.preventDefault();

        var formData = new FormData();
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('email', this.state.email);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('profile-image', this.state.image);

        axios({
            headers: {'Content-Type':'multipart/form-data'},
            url: '/users/signup',
            data: formData,
            method: 'POST'
        })
        .then(response => {
            console.log('Sucess ', response);
            this.restoreState();
        })
        .catch(error => {
            console.log(error);
        })   
    }

    render() {
        return(
            <div className='sign-up container'>
                <SectionTitle className='title' title='Sign Up' />

                <form onSubmit={this.signup} className='form-section container'>
                    <div className='row'>
                        <div className='col-md-2 col-lg-3'></div>
                        <input type='text' name='firstname' className='form-input col-6 col-sm-6 col-md-4 col-lg-3' value={this.state.firstname} onChange={this.handleTextChange} placeholder='First Name' /> 
                        <input type='text' name='lastname' className='form-input col-6 col-sm-6 col-md-4 col-lg-3' value={this.state.lastname} onChange={this.handleTextChange} placeholder='Last Name' />  
                        <div className='col-md-2 col-lg-3'></div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <input type='text' name='email' className='form-input col-12 col-sm-12 col-md-8 col-lg-6' value={this.state.email} onChange={this.handleTextChange} placeholder='Enter Your Email' />                    
                    </div>

                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <input type='text' name='username' className='form-input col-12 col-sm-12 col-md-8 col-lg-6' value={this.state.username} onChange={this.handleTextChange} placeholder='Enter Your Username' />                    
                    </div>
                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <input type='password' name='password' className='form-input col-12 col-sm-12 col-md-8 col-lg-6' value={this.state.password} onChange={this.handleTextChange} placeholder='Enter Your Password' />                    
                    </div>

                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <label htmlFor='profile-image'>Profile Picture</label>
                        <input type='file' name='profile-picture' className='col-7 col-sm-12 col-md-8 col-lg-6' key={this.state.imageKey} onChange={this.handleFileChange} />                    
                    </div>

                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <button className='signin-button button col-12 col-sm-12 col-md-8 col-lg-6'>Sign In</button>
                    </div>
                </form>

                <div className='social-login row'>
                    <div className='col-md-2 col-lg-3'></div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <button className='button facebook'>
                            <i className="fa fa-facebook fa-lg">acebook</i>
                        </button>
                    </div>
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3'>
                        <button className='button google'>
                            <i className="fa fa-google fa-lg">oogle</i>
                        </button>
                    </div>
                    <div className='col-md-2 col-lg-3'></div>
                </div>
            </div>
        )
    }
}

export default SignUp;