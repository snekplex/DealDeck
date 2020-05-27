import React from 'react';

import '../scss/SearchContainer.scss';

class SearchContainer extends React.Component {

  onSearchSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="searchContainer">
        <div id="searchItems">
          <form id="searchForm" method="GET" onSubmit={(event) => this.onSearchSubmit(event)}>
            <input 
              id="searchInput" 
              type="text" 
              placeholder="Enter item to search for here..." 
              value={this.props.searchTerm}
              onChange={(event) => this.props.searchSet(event.target.value)}
            />
            <input id="searchSubmitBtn" type="submit" value="Draw"/>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchContainer;