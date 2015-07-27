import Alt from 'utils/alt';
import StoreActions from 'actions/store';
import { data } from './data.json';
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
    this.data = data;
    this.dataSearch = [];
    this.filterOptions = [];
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
  filterFeature(payload) {
    let [option, checked] = payload;
    if (checked) {
      this.filterOptions.push(option);
      return;
    }
    else {
      for(let i = 0; i < this.filterOptions.length; i++) {
        if (option === this.filterOptions[i]) {
          console.log('i', i );
          this.filterOptions.splice(i,1);
        }
      }
    }
  }
  displayFilterData() {
    console.log(this.filterOptions);
    this.dataSearch = [];
    for (let i = 0; i < this.filterOptions.length; i++) {
      for (let x = 0; x < this.data.length; x++) {
        for (let k in this.data[x]) {
          if (this.filterOptions[i] === this.data[x][k]) {
            this.dataSearch.push(this.data[x]);
          }
        }
      }
    }
    console.log(this.dataSearch.length);
  }
}
export default Alt.createStore(StoreSearch, 'StoreSearch');

