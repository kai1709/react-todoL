import fetch from 'node-fetch';
import StoreActions from 'actions/store';
import StoreSearch from 'stores/search';
class SearchUsecase {

  constructor() {
  }

  buildPayload(obj) {
    let payload = [];
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        payload.push(`${key}=${obj[key]}`);
      }
    });
    return '?' + payload.join('&');
  }

  async searchProducts(options = { category, baseUrl, secure, page, len,$brand, $name, $price }) {
    options.page = 1;
    let dataReturn = [];
    if (options.category === 0 ) {
      for (let i = 1; i <= 4; i++) {
        if (i === 3) {i = i + 1;}
        options.category = i;
        StoreActions.loadingProducts();
        let secure = options.secure ? 's' : '';
        let baseUrl = options.baseUrl || `http${secure}://${window.location.host}`;
        let { page, len, $name, $price, $brand } = options;
        let res;

        let linkRequest = baseUrl + `/api/v1/category/${options.category}/products` + this.buildPayload({ page, len, $name, $price, $brand });
        console.log('LINK',linkRequest);
        try {
          res = await fetch(baseUrl + `/api/v1/category/${options.category}/products` + this.buildPayload({ page, len, $name, $price, $brand}));
          res = await res.json();
        } catch(e) {
          console.error(e);
          throw new Error("Failed to fetch products from server");
        }
        console.log(baseUrl);
        if (res !== null)
        {
          dataReturn = dataReturn.concat(res);
        }

      }
    }
    else {
        StoreActions.loadingProducts();
        let secure = options.secure ? 's' : '';
        let baseUrl = options.baseUrl || `http${secure}://${window.location.host}`;
        let { page, len, $name, $price, $brand } = options;
        let res;


        let linkRequest = baseUrl + `/api/v1/category/${options.category}/products` + this.buildPayload({ page, len, $name, $price, $brand });
        console.log('LINK',linkRequest);
        try {
          res = await fetch(baseUrl + `/api/v1/category/${options.category}/products` + this.buildPayload({ page, len, $name, $price, $brand }));
          res = await res.json();
          console.log('res',res);
        } catch(e) {
          console.error(e);
          throw new Error("Failed to fetch products from server");
        }
        dataReturn = res;

    }


    console.log('dataReturn',dataReturn);
    StoreActions.receiveProductsList(dataReturn);

    return dataReturn;
  }
}

export default new SearchUsecase();
