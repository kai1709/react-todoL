import StoreSearch from 'stores/search';
import React from 'react';
import { Link } from 'react-router';
import StoreActions from 'actions/store';
import Profile from 'components/profile';

// import { Combobox } from 'react-autocomplete';

class SearchBar extends React.Component {
	constructor (props) {
		super(props);
		this.state = Object.assign(StoreSearch.getState(), {showHint: false});
	}
	componentWillMount ()	{
		StoreSearch.listen (() => {
			this.setState(StoreSearch.getState());
			console.log('currentFilters', StoreSearch.getState().currentFilters);
		});
	}
	updateSearchMess (e){
		let searchMess = this.refs['searchfield'].getDOMNode().value.trim();
		if (!searchMess.length)
		{
			alert('Error');
			return;
		}
		this.refs['searchfield'].getDOMNode().value = '';
		StoreActions.storeSearch(searchMess);
		StoreActions.searchBrand(searchMess);
	}
	pressKey (e){
		e.preventDefault();
		if(event.keyCode === 13)
		{
			this.updateSearchMess();
			return;
		}
		else if (event.keyCode === 27)
		{
			this.refs['searchfield'].getDOMNode().value ='';
		}
	}
	_onChanngeCheckbox(options, checked) {
		// event.preventDefault();
		/*console.log(event.target.checked);
		console.log(options)*/
		console.log(options, checked);
		StoreActions.filterFeature(options, checked);
		StoreActions.displayFilterData();
	}
	render() {
		let existed = this.state.lol;
		// console.log(this.state.currentFilters);
		let filterlist = this.state.currentFilters.map((filter, i) => {
							if (typeof filter === "object")
							{
								// console.log(Object.getOwnPropertyNames(filter));
								let arrayOptions = [];
								for (let keys in filter)
								{
									arrayOptions = filter[keys];
									// console.log(arrayOptions);
								}
								let option = arrayOptions.map((options,x) => {
									return (<div key={x} className="item"><div className="listOption"><input type="checkbox"  onChange={(e) => this._onChanngeCheckbox(options, e.target.checked)} className="ui checkbox" /><label>{options}</label></div></div>)
								})
								return (

										<thead><tr><th>{Object.getOwnPropertyNames(filter)}</th></tr>
										<tr><th>{option}</th></tr></thead>
								)
							}
							return (

										<thead><tr><th>{filter}</th></tr></thead>

							);
						});
		return (
			<div  className="bodyPage" style={{textAlign: 'center'}}>
				<div className="searchBar">
						WANNA
				</div>
				<div >
					<div className="ui search">
						<div className="ui input">
							<div className ="ui right icon input loading">
								<input autoFocus={true} className="inputSearch" placeholder="Search what you want here..." ref='searchfield' onKeyUp={this.pressKey.bind(this)} autoComplete  onFocus={(e) => this.setState({showHint: true})} onBlur={(e) => this.setState({showHint: false})} />
								<i className="search icon"></i>
							</div>
						</div>
					</div>
				<div className="searchField">
						<button className="ui inverted red button" onClick={this.updateSearchMess.bind(this)}>SEARCH</button>
					</div>
				</div>
				<div className="filterList">
					<table className="ui striped table">
							{filterlist}
					</table>
				</div>
				<div className="listProduct">
					{!existed? <div></div>: <div><Profile /></div>}
				</div>
			</div>
		);
	}
}
export default SearchBar;
