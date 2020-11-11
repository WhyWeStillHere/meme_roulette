import React from 'react'
import {Link} from 'react-router-dom';
import './AuthorizationScreen.css'

function AuthorizationScreen() {
    return (
        <div className='authorization_page'>
            <span class="circle_icon"></span>
            <Link to="/sign_up">
                <button className='sign_up_button'>Sign up</button>
            </Link>
            <Link to="/login">
                <button className='login_button'>Login</button>
            </Link>
        </div>
    )
}

export default AuthorizationScreen;