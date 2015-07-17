import React from 'react';

import DataActions from 'actions/data';
import DataStore from 'stores/data';

class Welcome extends React.Component {

	constructor(props) {
		super(props);
		this.state = DataStore.getState();
	}

	componentWillMount() {
		DataStore.listen(() => {
			this.setState(WelcomeStore.getState());
		});
	}

	updateMessage(e) {
		this.setState({message: e.target.value});
		WelcomeActions.changeWelcomeMessage(e.target.value);
	}

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Welcome!</h1>
        <p>{this.state.message}</p>
        <input onChange={this.updateMessage} />
      </div>
    );
  }
};

export default Welcome;