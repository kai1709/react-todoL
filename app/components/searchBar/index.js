import StoreSearch from 'stores/search';
import React from 'react';
import { Link } from 'react-router';
import StoreActions from 'actions/store';
import Profile from 'components/profile';
import { Combobox } from 'react-pick';
import SearchUsecase from 'usecases/search';
import Tabs from 'components/tabs';
class SearchBar extends React.Component {
	constructor (props) {
		super(props);
		this.state = Object.assign({value: ""}, StoreSearch.getState());
				StoreActions.getNameAutoComplete();
	}
	componentWillMount ()	{
		StoreSearch.listen (() => {
			this.setState(StoreSearch.getState());
			console.log('StoreSearch', StoreSearch.getState());
		});
	}
	updateSearchMess (e){
		// let searchMess = this.refs['searchfield'].getDOMNode().value.trim();
		let searchMess = this.state.value.trim();
		if (!searchMess.length) {
			alert('Please input something ');
			return;
		}
		console.log('searchMess',searchMess);

    SearchUsecase.searchProducts({ category : this.state.stage, $name : searchMess});
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
	}
	_onChanngeCheckbox(options, checked) {
		console.log(options, checked);
		StoreActions.displayFilterData(options, checked);
	}

	capitalize (value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
	getOptionsForInputValue(inputValue) {
		inputValue = this.capitalize(inputValue);
		this.setState({value: inputValue});
    return new Promise((resolve, reject) => {
      resolve(
        this.state.nameAutoComplete.filter((person) => person.indexOf(inputValue) === 0)
        );
    });
  }
  handleChange(newValue) {
  	this.setState({value: newValue});
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
						TOI MUA
				</div>
				<div >
					<div className="ui search">
						<div className="ui input">
							<div className ="ui right icon input loading">
								<Combobox autoFocus={true} className="inputSearch" placeholder="Search what you want here..." onKeyUp={this.pressKey.bind(this)} getOptionsForInputValue={this.getOptionsForInputValue.bind(this)} onChange={this.handleChange.bind(this)} onCancle value={this.state.value} />

							</div>
						</div>
					</div>
				<div className="searchField">
						<button className="ui inverted white button" onClick={this.updateSearchMess.bind(this)}>SEARCH</button>
					</div>
				</div>
				<div className="filterList">
					<table className="ui striped table">
							{filterlist}
					</table>
				</div>
				<div className="listProduct">
					{!existed? <div></div>: <div><Tabs /></div>}
				</div>
			</div>
		);
	}
}
export default SearchBar;
