import React from 'react';

import '../scss/CardsContainer.scss';

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img className="card-img" src={this.props.imgUrl} alt={this.props.cardTitle}></img>
        <span className="card-title">{this.props.title}</span>
        <span className="card-price">{this.props.price}</span>
        <span className="card-list-price">{this.props.listPrice}</span>
        <span className="card-savings">{this.props.savings}</span>
      </div>
    )
  }
}

class Cards extends React.Component {
  filteredData = this.props.cardData.filter((data) => {
    return data.productListPrice && data.productSavings
  });
  render() {
    if (this.filteredData.length >= 1) {
      return (
        <div className="cards">
          {
            this.filteredData.map((cardData) => (
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
        </div>
      )
    } else {
      return (
        <div id="cards">
          No deals available
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