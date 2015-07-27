import React from 'react';
import { Link } from 'react-router';
import ProductOption from 'stores/productOption';
class FilterOption extends React.component {
	constructor(props){
		super(props);
		this.state = ProductOption.getState();
	}
	componentWillMount(){
		ProductOption.listen(() => {
			this.setState(ProductOption.getState());
		});
	}
	render(){
			return (
				<div>{this.state.arrayFilter}</div>
			)
	}
}
export default FilterOption;
