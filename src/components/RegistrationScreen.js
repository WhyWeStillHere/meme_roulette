import React from 'react'
import './RegistrationScreen.css'

const formValid = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false)});

    Object.values(rest).forEach(val => { val === null && (valid = false)});

    return valid;
}

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

        console.log(formErrors)

        this.setState({formErrors, [name]: value });
    }

    render() {
        return (
            <div className="registration-base-component">
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