import React from 'react';
import { Redirect } from 'react-router-dom'
import './ProfileBanner.css'

class ProfileBanner extends React.Component {
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
      return <Redirect to='/profile' />
    }
  }
  render() {
    return (
      <div onClick={this.setRedirect} className="profile-banner">
        {this.renderRedirect()}
        <img className='profile-banner-icon'>
        </img>
        <div className='profile-banner-username'>
          { this.props.username }
        </div>
      </div>
    );
  }
}

export default ProfileBanner;