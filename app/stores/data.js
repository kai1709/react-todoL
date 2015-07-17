import Alt from 'utils/alt';
import { data } from './data.json';
import DataActions from 'actions/data';
console.log("DCM" + data);

class DataStore {
	constructor() {
		this.bindActions(DataActions);
		this.data = data;

		this.message = 'Hello world';
	}

	changeWelcomeMessage(message) {
		this.message = message || 'Hello world';
	}
}

export default Alt.createStore(DataStore, 'DataStore');