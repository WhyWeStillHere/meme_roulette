import React from 'react'
import { Redirect } from 'react-router-dom'
import './css/LoginScreen.css'
import { signIn } from './actions/auth'
import { isOk } from './utils/response_info'

const GetUserData = async ({username, password}) => {
    return await signIn(username, password)()
}

const formValid = state => {
    let valid = true;

    Object.values(state).forEach(val => { val === null && (valid = false)});

    return valid;
}

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            submitted: false,
            redirect: false,
            error: ''
        };
    }

    handleSubmit = async e => {
        e.preventDefault();

        if (formValid(this.state)) {
            const result = await GetUserData(this.state)
            if (result === null) {
                this.setState({error: "Server error"});
            } else {
                if (isOk(result)) {
                    this.setState({redirect: true});
                } else {
                    this.setState({error: "Incorrent login or password"});
                }
            }
        } else {
            this.setState({error: "Incorrent login or password"});
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({[name]: value });
    }    
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/dialog'} />
        }
      }

    render() {
        return (
            <div className='login-base-component'>
                {this.renderRedirect()}
                <div className="imgcontainer">
                    <span className='circle-icon'></span>
                </div>
                <div className="login-content">
                    <div className="login-form">
                        <div className="login-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" onChange={this.handleChange}></input>
                        </div>
                        <div className="login-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                        </div>
                        <small type="error-text" className="login-error-text">{this.state.error}</small>
                        <button type="submit" className="login-button" onClick={this.handleSubmit}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;