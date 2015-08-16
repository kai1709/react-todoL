import Alt from 'utils/alt';

class StoreActions {
  constructor() {
		this.generateActions('loadingProducts', 'receiveProductsList', 'storeSearch', 'filterOption', 'changeWelcomeMessage','searchBrand','filterFeature','displayFilterData','getNameAutoComplete', 'getCurrentProd', 'updateBasket');
	}
}
export default Alt.createActions(StoreActions);
