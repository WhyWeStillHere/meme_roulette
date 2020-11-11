import React from 'react';
import StatisticField from './StatisticField'
import './Settings.css'

class Settings extends React.Component {
  render() {
    return (
      <div>
          <div className="selection-bar">
              <div className="settings-badge">
                  <div className="settings-option">Statistic</div>
              </div>
          </div>
          <div className="info-panel">
              <div>
                  <StatisticField name = "Memes sended" value = {0} />
                  <StatisticField name = "Memes recieved" value = {0} />
                  <StatisticField name = "Contacts made" value = {0} />
              </div>
          </div>
      </div>
    );
  }
}

export default Settings;