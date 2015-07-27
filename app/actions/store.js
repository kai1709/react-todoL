import Alt from 'utils/alt';

class StoreActions {
	constructor() {
		this.generateActions('storeSearch', 'filterOption', 'changeWelcomeMessage','searchBrand','filterFeature','displayFilterData');
	}
}
export default Alt.createActions(StoreActions);
