import React from 'react';
import StoreActions from 'actions/store';
import StoreSearch from 'stores/search';

class Basket extends React.Component {

  constructor (props) {
    super(props);
    this.state = StoreSearch.getState();
  }

  componentDidMount () {
    StoreSearch.listen (() => {
      this.setState(StoreSearch.getState());
    });
  }

  render() {
    console.log(basket);
    let basket = this.state.basket.map ((prod, index) => {
      return (
        <div key={index}>
          <tr>
            <td>{index}</td>
            <td>{prod.Name}</td>
            <td>{prod.Price}</td>
          </tr>
        </div>
      );
    });

    return (
      <div>
        <table>
          <tr>
            <th>Index</th>
            <th>Product</th>
            <th>Cost</th>
          </tr>

            {basket}

        </table>
      </div>
    );
  }
}

export default Basket;
