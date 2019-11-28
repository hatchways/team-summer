import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { CardMedia, IconButton } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const CarouselBase = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400
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
      <Icon />
    </IconButton>
  );
};

export default (props) => {
  const handleNavigate = (direction) => (event) => {
    event.preventDefault();
    console.log(direction);
  };

  return (
    <CarouselBase>
      <Arrow direction="left" onClick={handleNavigate('left')}/>
      <CardMedia component="img" image={props.images[0]}
                 title="Project image"
                 height="400"/>
      <Arrow direction="right" onClick={handleNavigate('right')}/>
    </CarouselBase>
  );
}