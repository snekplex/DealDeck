import React from 'react';

import '../scss/ContentContainer.scss';

import * as apiService from '../services/api';

import SearchContainer from './SearchContainer';

class ContentContainer extends React.Component {
  state = {
    searchTerm: '',
    pageNum: 1,
    deals: []
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm });
  }

  onSearchSubmit = async (event) => {
    event.preventDefault();
    const deals = await apiService.getApiDeals(this.state.searchTerm, this.state.pageNum);
    this.setState({ deals });
  };

  render() {
     return (
       <div id="contentContainer">
         <div id="titleAndSlogan">
            <span id="projectTitle">
              DealDeck
            </span>
            <span id="projectSlogan">
              See if you have been dealed a steal
            </span>
         </div>
         <SearchContainer 
          searchTerm={this.state.searchTerm}
          searchSet={this.setSearchTerm}
          searchSubmit={this.onSearchSubmit}
        />
       </div>
     )
  }
}

export default ContentContainer;