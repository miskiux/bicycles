import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { toggleCarousel } from '../../redux/shop/shop.actions';

import ViewCarousel from './carousel/carousel.component'

import './item.styles.css';
import classNames from "classnames";


// redux => turn off the header(on back, header is off!)
// 1. changing inner html background to white
// 2. shop page: if(toggleCarousel === true) {dispatch action   

const Item = ({item, toggleCarousel}) => {

//cursor
const [position, setPosition] = useState({x: 0, y: 0});
const [isHover, setIsHover] = useState(false);
const [hidden, setHidden] = useState(false);


//carousel
const [open, setOpen] = useState(true)

//cursor
useEffect(() => {
      addEventListeners();
      return () => removeEventListeners();
   }, []);

const addEventListeners = () => {
       document.addEventListener("mousemove", onMouseMove);
       document.addEventListener("mouseenter", onMouseEnter);
       document.addEventListener("mouseleave", onMouseLeave);
   };

   const removeEventListeners = () => {
       document.removeEventListener("mousemove", onMouseMove);
       document.removeEventListener("mouseenter", onMouseEnter);
       document.removeEventListener("mouseleave", onMouseLeave);
   };

   const onMouseLeave = () => {
       setHidden(true);
   };

   const onMouseEnter = () => {
       setHidden(false);
   };

   const onMouseMove = (e) => {
       setPosition({x: e.clientX, y: e.clientY});
   };

   const cursorClasses = classNames(
       'cursor',
      {
           'cursor--hidden': hidden
       }
   );              

   //carousel pop handler for child
   const handleCarousel = () => {
    setOpen(!open)
   }

const { url } = item
	return (
	<div>
        {
          open ?
          <div>
            <div className='item-wrapper'>
              <div
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => {
                  toggleCarousel();
                  setOpen(!open)
                }}
                className='asset-image'
                style={{
                  backgroundImage: `url(${url[1]})`
                }}
                >
                </div>
                  { isHover ?
                <div 
                className={cursorClasses}
                style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`
                    }}>
                    <span className="image-count">1 / {item.url.length}</span>
                </div> 
                    : ""
               }
               </div>
               
              </div>
            
            : <ViewCarousel item={item} handleCarousel={handleCarousel} />
        }
        
		
	</div>
		)
}

const mapDispatchToProps = (dispatch) => ({
	toggleCarousel: () => dispatch(toggleCarousel())

})

export default connect(null, mapDispatchToProps)(Item);


