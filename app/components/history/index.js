import React from 'react';
import StoreActions from 'actions/store';
import StoreSearch from 'stores/search';


class History extends React.Component {
  constructor (props) {
    super(props);
    this.state = StoreSearch.getState();
  }

  componentWillMount () {
    StoreSearch.listen (() => {
      this.setState ( StoreSearch.getState() );
    });
  }


  render() {
    console.log(productSeen);
    let productSeen = this.state.productSeen.map ((prod, index) => {
      return (
        <div className="product_seen" key={index}>
          <div style={{"textAlign": "left","width": "205px", "height": "205px"}}>
            <img src={prod.Image} style={{"width": "200px", "height": "200px"}} />
          </div>
          Name: {prod.Name} <br/>
          Trade: {prod.Trademark} <br />
          OS: {prod.OS}
        </div>
      );
    });
    return (
      <div>
        {productSeen}
      </div>
    );
  }
}

export default History;
