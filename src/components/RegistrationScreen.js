import React from 'react'
import { Redirect } from 'react-router-dom'
import './RegistrationScreen.css'

class RegistrationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            formErrors: {
                username: "",
                password: "",
            },
            submitted: false,
            redirect: false,
        };
    }

    formValid = async () => {
        let valid = true;
        let formErrors = this.state.formErrors;
    
        Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false)});
    
        Object.values(["username", "password"]).forEach(val => { val === null && (valid = false)});
    
        const {username} = this.state
    
        let result = await fetch(`http://localhost:3000/users?username=${username}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => result.json())
    
        if (result.length !== 0) {
            valid = false
            formErrors.username = "Username is already taken"
        }
    
        this.setState({formErrors});
        return valid;
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {username, password} = this.state

        if (await this.formValid()) {
            console.log("Form valid")
            fetch("http://localhost:3000/users", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            localStorage.setItem('user', this.state.user_id);
            this.setState({redirect: true});
        } else {
            console.log(this.state.formErrors)
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name) {
            case "username":
                formErrors.username = value.length < 3 
                ? 'minimum 3 characters required' 
                : '';
                break;
            case "password":
                formErrors.password = value.length < 6
                ? 'minimum 6 characters required' 
                : '';
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          const user_id = localStorage.getItem('user');
          return <Redirect to={'/dialog/' + user_id} />
        }
      }

    render() {
        return (
            <div className="registration-base-component">
                {this.renderRedirect()}
                <div className="registration-header">Create your account</div>
                <div className="registration-content">
                    <form className="registration-form">
                        <div className="registration-form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={this.handleChange}></input>
                        </div>
                        <div className="registration-form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handleChange}></input>
                        </div>
                    </form>
                </div>
                <div className="registration-footer">
                    <button type="submit" className="submit-registration-button" onClick={this.handleSubmit}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}


export default RegistrationScreen;