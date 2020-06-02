import React from 'react';
import Loader from 'react-loader-spinner';

import '../scss/ResultsContainer.scss';

import CardsContainer from './CardsContainer';

class ResultsContainer extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div id="resultsContainer">
          <Loader
            type="TailSpin"
            color="#000000"
            width={250}
            height={250}
            timeout={60000}
          ></Loader>
          <span className="loading-text">
            Loading deals...
          </span>
        </div>
      )
    } else {
      return (
        <div id="resultsContainer">
          <CardsContainer data={this.props.results}/>
        </div>
      )
    }
  }
}

export default ResultsContainer;