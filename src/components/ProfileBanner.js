import React from 'react';
import { Redirect } from 'react-router-dom'
import { GetMyUserData, GetUserDataSmall } from './actions/chat'
import './css/ProfileBanner.css'

class ProfileBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profile_id: props.profile_id,
        username: "Loading...",
        redirect: false
    };
  }

  async componentDidMount() {
    try {
      let response = null
      const profile_id = this.state.profile_id
      if (profile_id === undefined) {
        this.setState({username: "Finding person..."});
      } else if (profile_id === null) {
        response = await GetMyUserData()()
      } else {
        response = await GetUserDataSmall(profile_id)()
      }
      if (response !== null && response.status === 200) {
          const user_data = await response.json()
          this.setState({username: user_data['username']});
      }
    } catch(e) {
      console.log(e);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.profile_id !== prevProps.profile_id) {
      try {
        let response = null
        this.state.profile_id = this.props.profile_id
        const profile_id = this.state.profile_id
        if (profile_id === undefined) {
          this.setState({username: "Finding person..."});
        } else if (profile_id === null) {
          response = await GetMyUserData()()
        } else {
          response = await GetUserDataSmall(profile_id)()
        }
        if (response !== null && response.status === 200) {
            const user_data = await response.json()
            this.setState({username: user_data['username']});
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  setRedirect = () => {
    if (this.state.profile_id !== undefined) {
      this.setState({
        redirect: true
      })
    }
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
        <div className='profile-banner-username'>
          { this.state.username }
        </div>
      </div>
    );
  }
}

export default ProfileBanner;