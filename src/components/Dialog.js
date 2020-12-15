import React from 'react'
import Messages from './Messages'
import ImageUploader from 'react-images-upload';
import { GetMessages, SendMessage, GetMyUserData, GetUserDataSmall } from './actions/chat'
import { isOk } from './utils/response_info'
import "./css/Dialog.css"

const default_chat_messages = [{username: "God", message: "Send your first message!", fromMe: false}];
const default_empty_chat_messages = [{username: "God", message: "You are so alone(", fromMe: false}];

class Dialog extends React.Component {       
    constructor(props) {
        super(props);
        this.state = {
            chat_id: props.chat_id,
            prepared_image: null,
            messages: default_empty_chat_messages,
            empty_chat: true,
            my_id: null,
            my_username: null,
            messeger_id: props.messeger_profile_id,
            messeger_username: null
        };
    }

    ParseMessages = (messages) => {
        let result_messages = []
        for (let i = 0; i < messages.length; ++i) {
            let nw_message = {}
            if (messages[i].author === this.state.my_id) {
                nw_message['username'] = this.state.my_username
                nw_message['fromMe'] = true
            } else {
                nw_message['username'] = this.state.messeger_username
                nw_message['fromMe'] = false
            }
            nw_message['image_url'] = messages[i].image_url
            if (messages[i].image_url === null) {
                continue
            }
            nw_message['message'] = ''
            result_messages = [...result_messages, nw_message]
        }
        return result_messages
    }
   
    PreparePicture = (images) => {
        this.setState({prepared_image: images[0]})
    }

    SendMessage = async (event) => {
        if (this.state.prepared_image !== null && this.state.chat_id !== null) {
            const response = await SendMessage(this.state.prepared_image, this.state.chat_id)()
            if (isOk(response)) {
                this.setState({prepared_image: null})
                const messages_data = await response.json()
                const nw_messages = this.ParseMessages(messages_data)
                if (nw_messages.length > 0) {
                    this.setState({messages: nw_messages})
                }
            }
        }
    }

    async componentDidMount() {
        const response = await GetMyUserData()()
        if (isOk(response)) {
            const my_data = await response.json()
            this.setState({my_id: my_data['id'], 
                           my_username: my_data['username']})
        }

        setInterval(async () => {
            if (this.state.chat_id !== null && this.state.chat_id !== undefined) {
                const response = await GetMessages(this.state.chat_id)()
                if (isOk(response)) {
                    const messages_data = await response.json()
                    const nw_messages = this.ParseMessages(messages_data)
                    if (nw_messages.length > this.state.messages.length || this.state.empty_chat === true) {
                        this.setState({messages: nw_messages, empty_chat: false})
                    }
                }
            }
        }, 1000)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.chat_id !== prevProps.chat_id) {
            if (this.props.chat_id === null || this.props.chat_id === undefined) {
                this.setState({
                    chat_id: null,
                    prepared_image: null,
                    messages: default_empty_chat_messages,
                    my_id: null,
                    my_username: null,
                    empty_chat: true,
                });
            } else {
                this.setState({
                    chat_id: this.props.chat_id,
                    messages: default_chat_messages,
                    empty_chat: true,
                })
            }
        }
        if (this.props.messeger_profile_id !== prevProps.messeger_profile_id && this.props.messeger_profile_id !== undefined) {
            const response = await GetUserDataSmall(this.props.messeger_profile_id)()
            if (isOk(response)) {
                const user_data = await response.json()
                this.setState({messeger_id: user_data['id'], 
                               messeger_username: user_data['username']})
            }
        }
    }

    render() {
        return (
            <div>
                <div className="message-display">
                    <Messages messages={this.state.messages}/>
                </div>
                <div className="dialog-footer">
                    <button className="send-button" onClick={this.SendMessage}>Send meme</button>
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        labelClass="attach-label"
                        className="attach-container"
                        buttonClassName="attach-button"
                        buttonText='Attach file'
                        singleImage={true}
                        onChange={this.PreparePicture}
                        withLabel={false}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={5242880}
                    />
                </div>
            </div>
        );
    }
}

export default Dialog;