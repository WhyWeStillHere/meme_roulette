import React from 'react'
import { Redirect } from 'react-router-dom'
import './LoginScreen.css'

const GetUserData = async ({username, password}) => {
    return await fetch(`http://localhost:3000/users?username=${username}&password=${password}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((result) => result.json())
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
            redirect: false
        };
    }

    handleSubmit = async e => {
        e.preventDefault();

        if (formValid(this.state)) {
            const result = await GetUserData(this.state)
            if (result.length > 0) {
                console.log(result[0]["id"])
                localStorage.setItem('user', result[0]["id"]);
                this.setState({redirect: true});
            } else {
                console.log("ERROR!!!")
            }
        } else {
            console.log("ERROR!!!")
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({[name]: value });
    }    
    
    renderRedirect = () => {
        if (this.state.redirect) {
          const user_id = localStorage.getItem('user');
          return <Redirect to={'/dialog/' + user_id} />
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