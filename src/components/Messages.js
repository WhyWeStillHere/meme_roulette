import React from 'react'
import Message from "./Message"
import "./css/Messages.css"

class Messages extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.messages !== prevProps.messages) {
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }


    render() {
        const messages = this.props.messages.map((message, i) => {
            return (
              <Message
                key={i}
                username={message.username}
                message={message.message}
                image_url={message.image_url}
                fromMe={message.fromMe} />
            );
          });
        return (
            <div className='messages' id='messageList'>
                { messages }
            </div>
        );
    }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;