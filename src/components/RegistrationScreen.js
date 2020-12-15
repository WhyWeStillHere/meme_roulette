import React from 'react'
import { Redirect } from 'react-router-dom'
import './css/RegistrationScreen.css'
import { signUp } from './actions/auth'
import { isOk } from './utils/response_info';

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


    formValid = () => {
        let valid = true;
        let formErrors = this.state.formErrors;
    
        Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false)});
    
        Object.values(["username", "password"]).forEach(val => { val === null && (valid = false)});
    
        this.setState({formErrors});
        return valid;
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {username, password} = this.state
        let formErrors = this.state.formErrors

        if (this.formValid()) {
            let result = await signUp(username, password)()

            if (isOk(result)) {
                this.setState({redirect: true});
            } else if (result.status === 400) {
                formErrors.username = "Username is already taken"
            } else {
                formErrors.password = "Server error"
            }
        } else {
        }
        this.setState({formErrors});
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name) {
            case "username":
                formErrors.username = value.length < 3 
                ? 'Minimum 3 characters required' 
                : '';
                break;
            case "password":
                formErrors.password = value.length < 6
                ? 'Minimum 6 characters required' 
                : '';
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/dialog'} />
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
                            <small type="error-text" className="error-text">{this.state.formErrors.username}</small>
                        </div>
                        <div className="registration-form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.handleChange}></input>
                            <small type="error-text" className="error-text">{this.state.formErrors.password}</small>
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