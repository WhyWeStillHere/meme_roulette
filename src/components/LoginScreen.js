import React from 'react'
import './LoginScreen.css'

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
            submitted: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log("SUBMIT!!!")
        } else {
            console.log("ERROR!!!")
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({[name]: value });
    }

    render() {
        return (
            <div className='login-base-component'>
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