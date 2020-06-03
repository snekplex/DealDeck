import React from 'react';

import '../scss/CardsContainer.scss';

class Card extends React.Component {
  render() {
    return (
      <div className="card" onClick={() => window.open(this.props.url, '_blank') }>
        <img className="card-img" src={this.props.imgUrl} alt={this.props.cardTitle}></img>
        <span className="card-title">{this.props.title}</span>
        <span className="card-price">Current Price: {this.props.price}</span>
        <span className="card-list-price">List Price: {this.props.listPrice}</span>
        <span className="card-savings">Savings: {this.props.savings}</span>
      </div>
    )
  }
}

class Cards extends React.Component {
  render() {
    var filteredData = [];
    if (this.props.cardData) {
      filteredData = this.props.cardData.filter((data) => {
        return data.productListPrice && data.productSavings
      });
    }
    if (filteredData.length >= 1) {
      return (
        <div className="cards">
          {
            filteredData.map((cardData) => (
              <Card
                key={cardData.productUrl}
                url={cardData.productUrl}
                imgUrl={cardData.productImgUrl}
                title={cardData.productTitle}
                price={cardData.productPrice}
                listPrice={cardData.productListPrice}
                savings={cardData.productSavings}
              />
            ))
          }
          <button
            className="back-to-top-btn" 
            onClick={() => window.scrollTo(0, 0)}>
            Back To Top
          </button>
        </div>
      )
    } else {
      return (
        <div id="cards">
          <span className="loading-text">
            No deals available
          </span>
        </div>
      )
    }
  }
}

class CardsContainer extends React.Component {
  render() {
    return (
      <div id="cardsContainer">
        <Cards cardData={this.props.data}/>
      </div>  
    )
  }
}

export default CardsContainer;