import React from 'react';
import { Combobox } from 'react-pick';

let data = ['Cao Son', 'Hoang Binh', 'Anh Nam','Cao Sang'];

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: null};
  }
  getOptionForInputValue(inputValue) {
    return new Promise((resolve, reject) => {
      inputValue = inputValue.toLowerCase();
      resolve(
        data.map((person) => person.toLowerCase()).filter((person) => person.indexOf(inputValue) === 0)
        );
    });
  }
  handleChange (newValue) {
    console.log(newValue);
    this.setState({value: newValue});
  }
  render () {
    return (
      <div>
        <Combobox getOptionsForInputValue={this.getOptionForInputValue.bind(this)} onChange={this.handleChange.bind(this)} value={this.state.value}/>
        <p>Selection: {this.state.value} </p>
      </div>
    )
  }
}

export default AutoComplete;
