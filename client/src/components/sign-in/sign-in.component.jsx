import React, {Component} from 'react';
import axios from 'axios';
import './sign-in.styles.scss';
import SectionTitle from '../section-title/section-title.component';


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    signIn = (event) => {
        event.preventDefault();
        
        axios({
            url: '/users/signin',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            method: 'POST'
        })
        .then(response => {
            console.log(response.data.user);
            this.restoreState();
            var user = {user: response.data.user, token: response.data.token}
            this.props.addCurrentUser(user);
        })
        .catch(error => console.log(error))
    }

    handleTextChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    restoreState = () => {
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return(
            <div className='container'>
                <SectionTitle className='title' title='Log In' />

                <form onSubmit={this.signIn} className='container'>
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
        );
    };
};

export default SignIn;