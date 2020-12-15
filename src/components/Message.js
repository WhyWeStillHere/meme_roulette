import React from 'react';
import './css/Message.css'

class Message extends React.Component {
  render() {
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body'>
          { this.props.message !== '' 
            ? this.props.message
            : <img src={this.props.image_url} alt='' className='message-image'/>}
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;