import React from 'react';

import '../scss/ContentContainer.scss';

import * as apiService from '../services/api';

import SearchContainer from './SearchContainer';
import ResultsContainer from './ResultsContainer';

class ContentContainer extends React.Component {
  state = {
    searchTerm: '',
    pageNum: 1,
    deals: [],
    gettingApiData: false
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm });
  }

  onSearchSubmit = async (event) => {
    event.preventDefault();
    this.setState({ gettingApiData: true });
    const deals = await apiService.getApiDeals(this.state.searchTerm, this.state.pageNum);
    this.setState({ deals });
    this.setState({ gettingApiData: false });
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
          <ResultsContainer
            isLoading={this.state.gettingApiData}
            results={this.state.deals}
          />
       </div>
     )
  }
}

export default ContentContainer;