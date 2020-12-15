 import { ApiClient } from '../services/ApiClient'
 import { RegisterNewChatUser } from './chat'
 import { isOk } from '../utils/response_info'

export function signIn(login, password) {
    return async () => {
        let response = null
        try {
            response = await ApiClient("token/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({username: login, password: password})});

            const { access, refresh } = await response.json()

            window.localStorage.setItem('auth', access)
            window.localStorage.setItem('refresh', refresh)
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function refreshToken() {
    return async () => {
        let response = null
        const refresh = window.localStorage.getItem('refresh')
        try {
            response = await ApiClient("token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({refresh: refresh})});

            const { access } = await response.json()

            window.localStorage.setItem('auth', access)
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function signOut() {
    window.localStorage.clear()
}

export async function isLogin() {
    let auth_token = window.localStorage.getItem('auth')
    if (auth_token === null) {
        return false;
    }

    let response = await ApiClient("token/verify/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        }, 
        body: JSON.stringify({token: auth_token})});
    
    if (response.status === 200) {
        return true;
    }
    return false;
}

export function signUp(login, password) {
    return async () => {
        let response = null
        signOut()
        try {
            response = await ApiClient("users/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({username: login, password: password})});
            
            if (isOk(response)) {
                response = await signIn(login, password)()
                if (isOk(response)) {
                    response = await RegisterNewChatUser()()
                }
            }
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}