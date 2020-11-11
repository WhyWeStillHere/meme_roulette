import React from 'react';
import './StatisticField.css'

class StatisticField extends React.Component {
  render() {
    return (
      <div className="statistic-field">
          {this.props.name}: {this.props.value}
      </div>
    );
  }
}

export default StatisticField;