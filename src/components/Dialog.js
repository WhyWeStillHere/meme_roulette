import React from 'react'
import ImageUploader from 'react-images-upload';
import Messages from './Messages'
import "./Dialog.css"

const default_messages = [{username: "User1", message: "Message 1", fromMe: false}, 
{username: "User2", message: "Message 2", fromMe: true}, {username: "User1", message: "Message 3", fromMe: false}, 
{username: "User1", message: "All work and no play makes Jack a dull boy\n All work and no play makes Jack a dull boy\nAll work and no play makes Jack a dull boy\nAll work and no play makes Jack a dull boy\n", fromMe: false}];

class Dialog extends React.Component {       
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <div>
                <div className="message-display">
                    <Messages messages={default_messages}/>
                </div>
                <div className="dialog-footer">
                    <button className="send-button">Send meme</button>
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        labelClass="attach-label"
                        className="attach-container"
                        buttonClassName="attach-button"
                        buttonText='Attach file'
                        singleImage={true}
                        onChange={this.onDrop}
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