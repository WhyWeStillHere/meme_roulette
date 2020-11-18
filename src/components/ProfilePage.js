import React from 'react';
import { Redirect } from 'react-router-dom'
import ProfileBanner from './ProfileBanner';
import Settings from './Settings'
import './ProfilePage.css'

class ProfilePage extends React.Component {
  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      const user_id = localStorage.getItem('user');
      return <Redirect to={'/dialog/' + user_id} />
    }
  }

  render() {
    const profile_username = "Default username"
    return (
      <div>
        <div className="profile-page-header">
          <ProfileBanner username={profile_username} />
        </div>
        <button onClick={this.setRedirect} className="goto-message-button">
          {this.renderRedirect()}
          Go to messages
        </button>
        <div className="settings-container">
          <Settings />
        </div>
      </div>
    );
  }
}

export default ProfilePage;