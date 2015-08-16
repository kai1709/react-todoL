import Alt from 'utils/alt';
import StoreActions from 'actions/store';
import SearchUseCase from 'usecases/search';
import { autocomplete } from './AutoComplete.json';
class StoreSearch {
	constructor() {
		this.bindActions(StoreActions);
    this.currentFilters = [];
    this.options = {
      'phone': [ {"Brand" : ["Apple", "Sony"]}, "CPU", {"Ram" : ["2GB","4GB","8GB"]}, {"OS" : ["iOS", "Android","Windowns Phone"]}],
      'tablet': ["Screen", 'OS', 'Ram', 'Camera', 'Battery'],
      'all': ['']
    };
    this.mappers = [
      {'key': 'all', 'value': ['dau xanh', 'rau ma']},
      {'key': 'phone', 'value': ['dien thoai', 'dt', 'dien_thoai','mobile','Sony','Apple','dienthoai', 'điện thoại','DIEN THOAI', 'DT', 'DIEN_THOAI', 'MOBILE', 'phone'
      , 'DIENTHOAI']},
      {'key': 'tablet', 'value': ['may tinh bang', 'tablet', 'mtb', 'maytinhbang','may_tinh_bang']}
    ];
    this.lol = false;
    this.data = {};
    this.dataSearch = [];
    this.filterOptions = [];
    this.value = '';
    this.autocomplete = autocomplete;
    this.nameAutoComplete = [];
    this.loadingProducts = false;
    this.stage = 1;
    this.basket =[];
    this.productSeen = [];
    this.boolSeen = false;
    this.visibleDetail = false;
    this.visibleBasket = false;
    this.boolClassVisible = false;
    this.nameRequest = '';
    this.brand = '';
	}
  getCurrentProd (payload) {
    this.visibleDetail =true;
    this.currentProduct = payload;
    this.boolSeen = this.productSeen.some((prod) => this.prod.Name === payload.Name);
    if (this.boolSeen === false) {
      this.productSeen.push(payload);
    }
  }
  updateBasket(payload) {
    this.visibleBasket = true;
    console.log('basket',payload);
    this.basket.push(payload);
    console.log('this basket', this.basket);

  }
  showSeen () {
    this.boolClassVisible =true;
  }
  loadingProducts() {
    this.loadingProducts = true;
  }
  receiveProductsList(products) {
    this.dataSearch = products.data;
    console.log('asdasdasdasd');
    console.log('dataSearchStore',this.dataSearch);
  }
	storeSearch(searchmess) {
    this.lol = true;

    let found = this.mappers.some((mapper, index) => {
      let existed = mapper['value'].indexOf(searchmess) !== -1;
      if (existed) {
        searchmess = mapper['key'];
      }
      return existed;
    });


    if (!found) {
      searchmess = 'all';
    }
    this.currentFilters = this.options[searchmess];
	}

  searchBrand(searchmess) {
    for (let i = 0; i< this.data.length; i++) {
      for(let x in this.data[i]) {
        if (searchmess === this.data[i][x]) {
          this.dataSearch.push(this.data[i]);
        }
      }
    }
  }
  getNameAutoComplete (){
      for (let i = 0; i < this.autocomplete.length; i++) {
        this.nameAutoComplete.push(this.autocomplete[i].Name);
      }
      console.log(this.nameAutoComplete);
  }
  filterFeature(payload) {

  }
  displayFilterData(payload) {
    let [option, checked] = payload;
    if (checked) {
      let a = option.toLowerCase();
      this.filterOptions.push(a);
    }
    else {
      for(let i = 0; i < this.filterOptions.length; i++) {
        let a = option.toLowerCase();
        if (a === this.filterOptions[i]) {
          this.filterOptions.splice(i,1);
        }
      }
    }
    console.log('a',this.filterOptions);
    this.dataSearch = [];
    this.nameRequest = '';
    if (this.filterOptions.length === 1){
      this.nameRequest = this.filterOptions[0];
      setTimeout( () => { console.log('kec',this.stage); console.log('kac',this.nameRequest);SearchUseCase.searchProducts({category: this.stage, $brand: this.nameRequest});}, 1);
    }
    else if (this.filterOptions.length === 2)
    {
      this.nameRequest = this.filterOptions[0] + '|' + this.filterOptions[1];
      setTimeout( () => { console.log('kec',this.stage); console.log('kac',this.nameRequest);SearchUseCase.searchProducts({category: this.stage, $brand: this.nameRequest});}, 1);

}    console.log('nameRequest',this.nameRequest);
    console.log('stage', this.stage);

  }
  changeWelcomeMessage(value){
    this.value = value;
  }

}
export default Alt.createStore(StoreSearch, 'StoreSearch');

