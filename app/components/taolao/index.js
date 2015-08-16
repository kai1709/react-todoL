import React from 'react';
import SearchUsecase from 'usecases/search';
import StoreSearch from 'stores/search';
class Request extends React.Component {
  constructor (props){
    super(props);
    this.state = StoreSearch.getState();
    console.log('state req á', this.state);
  }
  componentWillMount(){
     StoreSearch.listen (() => {
      this.setState(StoreSearch.getState());

    });
  }
  sendRequest(){
    console.log('nameReq KAI', this.state.nameRequest )
    SearchUsecase.searchProducts({category: this.state.stage, $name: this.state.nameRequest})
  }
  render() {
    return (<div>{this.sendRequest.bind(this)}</div>);
  }
}
export default Request;
