import ReactTabs from 'react-tabs';
import React from 'react';
import Profile from 'components/profile';
import StoreSearch from 'stores/search';
import History from 'components/history';
import Basket from 'components/basket';


class Tabs extends React.Component {
  constructor (props) {
    super(props);
    this.state = StoreSearch.getState();

  }
  componentWillMount () {
    StoreSearch.listen (() => {
      this.setState(StoreSearch.getState());
    });
  }
  handleSelect (index,last){

  }
  render() {
    let Tab = ReactTabs.Tab;
    let Tabs = ReactTabs.Tabs;
    let TabPanel = ReactTabs.TabPanel;
    let TabList = ReactTabs.TabList;


    return (
      <div>

        <Tabs onSelect={this.handleSelect}>
          <TabList >
            <Tab>Products</Tab>
            {this.state.visibleDetail ? <Tab> Detail </Tab> : {}}
            {this.state.visibleBasket ? <Tab> Basket </Tab> : {}}
          </TabList>
          <TabPanel>
            <Profile />
          </TabPanel>
          {this.state.visibleDetail ? <TabPanel ><History /></TabPanel> : {}}
          {this.state.visibleBasket ? <TabPanel ><Basket /></TabPanel> : {}}
        </Tabs>
      </div>)
  }
}
export default Tabs;
