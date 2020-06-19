import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
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
            <div className='sign-up'>
                <form onSubmit={this.signup}>
                    <label htmlFor='firstname'>First Name</label>
                    <br />
                    <input type='text' name='firstname' value={this.state.firstname} onChange={this.handleTextChange}/>
                    <br /> <br />

                    <label htmlFor='lastname'>Last Name</label>
                    <br />
                    <input type='text' name='lastname' value={this.state.lastname} onChange={this.handleTextChange}/>
                    <br /> <br />

                    <label htmlFor='username'>User Name</label>
                    <br />
                    <input type='text' name='username' value={this.state.username} onChange={this.handleTextChange}/>
                    <br /> <br />

                    <label htmlFor='password'>Password</label>
                    <br />
                    <input type='password' name='password' value={this.state.password} onChange={this.handleTextChange}/>
                    <br /> <br />

                    <label htmlFor='profile'>Profile Picture</label>
                    <br />
                    <input type='file' name='profile-image' key={this.state.imageKey} onChange={this.handleFileChange}/>
                    <br /> <br />

                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;