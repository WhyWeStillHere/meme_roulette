import { ChatClient } from '../services/ChatClient'

export function RegisterNewChatUser() {
    return async () => {
        let response = null
        try {
            response = await ChatClient("add_chat_user/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({is_free: true})});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function FreeChatUser() {
    return async () => {
        let response = null
        try {
            response = await ChatClient("free_chat_user/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify()});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function CreateChat() {
    return async () => {
        let response = null
        try {
            response = await ChatClient("create_chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({})});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function DeleteChat() {
    return async () => {
        let response = null
        try {
            response = await ChatClient("delete_chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }, 
                body: JSON.stringify({})});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function GetUserDataSmall(user_id) {
    return async () => {
        let response = null
        try {
            response = await ChatClient(`user_info/${user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json"
                }});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function GetMyUserData() {
    return async () => {
        let response = null
        try {
            response = await ChatClient(`my_user_info/`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json"
                }});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}


export function SendMessage(image, chat_id) {
    return async() => {
        let formData = new FormData();
        formData.append('image', image);
        let response = null
        try {
            response = await ChatClient(`messages/${chat_id}`, {
                method: "POST",
                headers: {}, 
                body: formData});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}

export function GetMessages(chat_id) {
    return async() => {
        let response = null
        try {
            response = await ChatClient(`messages/${chat_id}`, {
                method: "GET",
                headers: {}});
        } catch(err) {
            console.log('ERROR:', err)
        }
        return response
    }
}