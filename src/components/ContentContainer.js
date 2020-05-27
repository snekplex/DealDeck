import React from 'react';

import '../scss/ContentContainer.scss';

import SearchContainer from './SearchContainer';

class ContentContainer extends React.Component {
  state = {
    searchTerm: ''
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm });
  }

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
        />
       </div>
     )
  }
}

export default ContentContainer;