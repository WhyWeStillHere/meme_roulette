import React from 'react';
import { Redirect } from 'react-router-dom'
import ProfileBanner from './ProfileBanner';
import Settings from './Settings'
import { signOut } from './actions/auth'
import './css/ProfilePage.css'

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profile_id: props.match.params.profile_id,
        redirect: false
    };
    if (this.state.profile_id === 'null') {
      this.state.profile_id = null
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  logout = () => {
    signOut()
    this.setRedirect()
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/dialog'} />
    }
  }

  render() {
    return (
      <div>
        <div className="profile-page-header">
          <ProfileBanner profile_id={this.state.profile_id}/>
        </div>
        <button onClick={this.setRedirect} className="goto-message-button">
          {this.renderRedirect()}
          Go to messages
        </button>
        { this.state.profile_id === null 
          ? <button onClick={this.logout} className="logout-message-button">
              Log out
            </button>
          : <div />}
        <div className="settings-container">
          <Settings />
        </div>
      </div>
    );
  }
}

export default ProfilePage;