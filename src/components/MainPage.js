import React from 'react'
import "./MainPage.css"
import Dialog from './Dialog'
import ProfileBanner from './ProfileBanner'

class MainPage extends React.Component {   
    render() {
        return (
            <div>
                <Dialog/>
                <div className="profile-badges">
                    <ProfileBanner username="Your name" />
                    <ProfileBanner username="Messeger name" />
                </div>
                <button className="next-button">Next</button>
            </div>
        );
    }
}

export default MainPage;