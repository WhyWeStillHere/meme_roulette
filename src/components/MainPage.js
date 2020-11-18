import React from 'react'
import "./MainPage.css"
import Dialog from './Dialog'
import ProfileBanner from './ProfileBanner'
import {Link} from 'react-router-dom'

class MainPage extends React.Component {
    constructor({props, match}) {
        super(props);
        this.state = {
            user_profile_id: match.params.profile_id,
            messeger_profile_id: null
        };
    }

    render() {
        return (
            <Link to={'/dialog/' + this.state.user_profile_id}>
                <Dialog/>
                <div className="profile-badges">
                    <ProfileBanner username="Your name" profile_id={this.state.user_profile_id}/>
                    <ProfileBanner username="Messeger name" profile_id={this.state.messeger_profile_id} />
                </div>
                <button className="next-button">Next</button>
            </Link>
        );
    }
}

export default MainPage;