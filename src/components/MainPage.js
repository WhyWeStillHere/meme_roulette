import React from 'react'
import "./css/MainPage.css"
import Dialog from './Dialog'
import ProfileBanner from './ProfileBanner'
import { CreateChat, DeleteChat, FreeChatUser, GetMessages } from './actions/chat'
import { isOk } from './utils/response_info'

class MainPage extends React.Component {
    constructor({props}) {
        super(props);
        this.state = {
            messeger_profile_id: undefined,
            current_chat_id: null
        };
    }

    nextChat = async (event) => {
        if (this.state.current_chat_id !== null) {
            let response = await DeleteChat()()
            if (isOk(response)) {
                response = await FreeChatUser()()
                this.setState({
                    current_chat_id: null,
                    messeger_profile_id: undefined,
                })
            }
        }
    }

    async componentDidMount() {
        try {
            if (this.state.current_chat_id === null || this.state.current_chat_id === undefined) {
                const response = await CreateChat()()
                if (!isOk(response)) {
                    console.log("ERROR: ", response)
                } else {
                    let chat_data = await response.json()
                    this.setState({current_chat_id: chat_data['id']});
                    this.setState({messeger_profile_id: chat_data['messeger_1_id']});
                }
            }
            setInterval(async () => {
                if (this.state.current_chat_id === null || this.state.current_chat_id === undefined) {
                    const response = await CreateChat()()
                    if (!isOk(response)) {
                        console.log("ERROR: ", response)
                    } else {
                        let chat_data = await response.json()
                        this.setState({current_chat_id: chat_data['chat_id']});
                        this.setState({messeger_profile_id: chat_data['messeger_1_id']});
                    }
                } else {
                    let response = await GetMessages(this.state.current_chat_id)()
                    if (response !== null && !isOk(response) && response.status !== 401) {
                        response = await FreeChatUser()()
                        this.setState({
                            current_chat_id: null,
                            messeger_profile_id: undefined,
                        })
                    }
                }
            }, 10000);
        } catch(e) {
          console.log(e);
        }
    }

    render() {
        return (
            <div className="main-page">
                <Dialog chat_id={this.state.current_chat_id} 
                        messeger_profile_id={this.state.messeger_profile_id}/>
                <div className="profile-badges">
                    <ProfileBanner profile_id={null}/>
                    <ProfileBanner profile_id={this.state.messeger_profile_id} />
                </div>
                <button className="next-button" onClick={this.nextChat}>Next</button>
            </div>
        );
    }
}

export default MainPage;