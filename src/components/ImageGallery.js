import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ImageGallery = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  // useEffect will be run when the list of images change thus we set the initial index of the images to the first one
  useEffect(() => {
    //console.log('useEffect');
    setActiveIndex(0);
  }, [props.images]);
  return (
    <Carousel activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e)}>
      {props.images.map((url, index) => (
        <Carousel.Item key={index} className="carousel-item">
          <img src={url + '-/resize/1100x500/'} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageGallery;