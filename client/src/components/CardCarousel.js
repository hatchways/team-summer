import React, { useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { CardMedia, IconButton } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const CarouselBase = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 420
}));

const arrowStyles = makeStyles({
  arrow: ({ direction }) => ({
    position: 'absolute',
    top: '50%',
    fontSize: 30,
    color: '#ffffff',
    backgroundColor: '#000000',
    borderRadius: '100%',
    outline: 'none',
    [direction]: '0.5em'
  })
});

const Arrow = ({ direction, onClick, ...props }) => {
  const classes = arrowStyles({ direction, ...props });
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <IconButton onClick={onClick} className={classes.arrow}>
      <Icon/>
    </IconButton>
  );
};

const ThumbnailContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 10px)',
  width: '100%'
}));

const ThumbnailImage = styled('img')(({ theme }) => ({
  height: 'auto',
  width: 100
}));



export default (props) => {
  const { images } = props;

  const [currentImage, setCurrentImage] = useState(0);

  const handleNavigate = (direction) => (event) => {
    event.preventDefault();

    const maxIndex = images.length - 1;

    if (currentImage === maxIndex) return setCurrentImage(0);
    if (currentImage === 0) return setCurrentImage(maxIndex);

    if (direction === 'left') return setCurrentImage(currentImage - 1);
  };

  return (
    <React.Fragment>
      <CarouselBase>
        <Arrow direction="left" onClick={handleNavigate('left')}/>
        <CardMedia component="img" image={images[currentImage]}
                   title="Project image"
                   height="400"/>
        <Arrow direction="right" onClick={handleNavigate('right')}/>
      </CarouselBase>
      <ThumbnailContainer style={{width: '100%'}}>
        {images.map((image) => <ThumbnailImage src={image} alt="Project image"/>)}
      </ThumbnailContainer>
    </React.Fragment>
  );
}