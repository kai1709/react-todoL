import React from 'react';
import { Link } from 'react-router';
import DataActions from 'actions/data';
import DataStore from 'stores/data';

class profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = DataStore.getState();
	}

	componentWillMount() {
		DataStore.listen(() => {
			this.setState(WelcomeStore.getState());
		});
	}


  render() {

  			let data = this.state.data.map((item, index) => {
					return (<tr key={index} className="trProduct">
						<td className="imagesProduct"><img src={item.image_link} className="image_link" /></td>
						<td className="infoProduct">
										<p>{item.name}</p>
										<p>{item.author}</p>
										<p>{item.publisher}</p>
						</td>
							<td className="priceProduct"><a>{item.price} đ</a></td>
							<td className="sellerProduct"><p>Phương Nam</p></td>
							<td><div className="buttonProduct"><button className="buttondatmua">Đặt Mua</button><p><a href={item.html}>Xem Chi Tiết</a></p></div></td>
						</tr>
						);
						});

    return (
      <div>
        <h1>Welcome!</h1>
        <table className="tableProduct">{data}</table>
      </div>
    );
  }
};

export default profile;