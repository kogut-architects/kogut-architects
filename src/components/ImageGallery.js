import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }
  handleOnSelect (e) {
    this.setState({ activeIndex: e });
  }

  render () {
    
    return (
      
      <Carousel activeIndex={this.state.activeIndex} onSelect={(e) => this.handleOnSelect(e)}>
        {this.props.images.map((url, index) => (
          <Carousel.Item key={index} className="carousel-item">
            <img src={`${url}`} alt=""/>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }
}

export default ImageGallery;