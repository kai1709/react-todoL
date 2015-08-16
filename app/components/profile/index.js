import React from 'react';
import { Link } from 'react-router';
import StoreActions from 'actions/store';
import StoreSearch from 'stores/search';
import SearchUsecase from 'usecases/search';
import Request from 'components/taolao';
class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = StoreSearch.getState();
    console.log('state profile Kai',this.state);
	}

	componentDidMount() {
		StoreSearch.listen(() => {
			this.setState(StoreSearch.getState());
		});
	}
  getCurrentProd (prod) {
    StoreActions.getCurrentProd(prod);
  }
  updateBasket (prod) {
    StoreActions.updateBasket(prod);
  }
  render() {
  let data = {};
  console.log('dataSearch',this.state.dataSearch);
  if (this.state.dataSearch !== null){
    data = this.state.dataSearch.map((item, index) => {
     return (
        <tr key={index}>
          <td><img src={item.Image} className="imagesProduct" /></td>
          <td>
            <div className="detailLeft">
              <div className="something"><h3>Name : {item.Name}</h3></div>
              <h5>Brand : {item.Trademark}</h5>
              <h5>OS : {item.OS}</h5>
            </div>
          </td>
          <td><a> <div className="price">{item.Price}VNĐ</div></a></td>
          <td></td>
          <td><div className="buttonProduct"><button className="ui inverted green button" onClick={this.updateBasket.bind(this,item)}>Order</button><div><button className="ui inverted blue button" onClick={this.getCurrentProd.bind(this,item)}>Details</button></div></div></td>
        </tr>
      );
   });
  }



    return (
      <div>
      <div>
         <table className="ui celled table"><thead><tr><th>Hình ảnh</th><th>Thông tin sản phẩm</th><th>Giá</th><th>Nơi bán</th><th>Đặt mua</th></tr></thead>{data}</table>
      </div>
      </div>
    );
  }
};

export default Profile;
