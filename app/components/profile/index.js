import React from 'react';
import { Link } from 'react-router';
import StoreActions from 'actions/store';
import StoreSearch from 'stores/search';

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = StoreSearch.getState();
	}

	componentWillMount() {
		StoreSearch.listen(() => {
			this.setState(StoreSearch.getState());
		});
	}


  render() {

   let data = this.state.dataSearch.map((item, index) => {
     return (
        <tr key={index} className="trProduct">
          <td className="imagesProduct"><img src={item.Image} className="image_link" /></td>
          <td className="infoProduct">
            <div className="detailLeft">
              <div className="something"><h3>Name : {item.Name}</h3></div>
              <h5>Brand : {item.Trademark}</h5>
              <h5>OS : {item.OS}</h5>
            </div>
            <div className="detailRight">

            </div>
          </td>
          <td className="priceProduct"><a> <div className="price">{item.Price}</div></a></td>
          <td className="sellerProduct"><p></p></td>
          <td><div className="buttonProduct"><button className="ui inverted green button">Order</button><p><a >Details</a></p></div></td>
        </tr>
      );
   });

    return (
      <div>
         <table className="tableProduct"><tr className="trProduct1"><td className="imagesProduct"></td><td className="infoProduct"></td><td className="priceProduct"></td><td className="sellerProduct"></td></tr>{data}</table>
      </div>
    );
  }
};

export default Profile;
