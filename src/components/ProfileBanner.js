import React from 'react';
import { Redirect } from 'react-router-dom'
import './ProfileBanner.css'

class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profile_id: props.profile_id,
        redirect: false
    };
}

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/profile/' + this.state.profile_id} />
    }
  }
  render() {
    return (
      <div onClick={this.setRedirect} className="profile-banner">
        {this.renderRedirect()}
        <img className='profile-banner-icon' alt=''>
        </img>
        <text className='profile-banner-username'>
          { this.props.username }
        </text>
      </div>
    );
  }
}

export default ProfileBanner;