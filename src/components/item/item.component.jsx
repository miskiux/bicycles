import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { toggleCarousel } from '../../redux/shop/shop.actions'

import './item.styles.css';
import classNames from "classnames";


// redux => turn off the header and logo

const Item = ({item, toggleCarousel}) => {

//cursor
const [position, setPosition] = useState({x: 0, y: 0});
const [isHover, setIsHover] = useState(false);
const [hidden, setHidden] = useState(false);
 
//cursor
useEffect(() => {
      addEventListeners();
      return () => removeEventListeners();
   }, []);

const addEventListeners = () => {
       window.addEventListener("mousemove", onMouseMove);
       window.addEventListener("mouseenter", onMouseEnter);
      window.addEventListener("mouseleave", onMouseLeave);
   };

   const removeEventListeners = () => {
       window.removeEventListener("mousemove", onMouseMove);
       window.removeEventListener("mouseenter", onMouseEnter);
       window.removeEventListener("mouseleave", onMouseLeave);
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

   //toggling Hover on image
   const toggleHoverState = () => {
   	setIsHover(!isHover)
   }

   const cursorClasses = classNames(
       'cursor',
      {
           'cursor--hidden': hidden
       }
   );    




const { url } = item
	return (
	
		<div className='item-wrapper'>
			<div
				onMouseOver={toggleHoverState}
				onMouseLeave={toggleHoverState}
				onClick={toggleCarousel}
				className='asset-image'
				style={{
					backgroundImage: `url(${url[1]})`
				}}
				>
			</div>
		{/* POINTER */}
			{ isHover ?
				<div 
	   					className={cursorClasses}
	   					style={{
	   				        left: `${position.x}px`,
	   				        top: `${position.y}px`
   			          }}></div> 
   			         	: ""
			}
		{/* POP UP */}
		</div>
	
		)

}

const mapDispatchToProps = (dispatch) => ({
	toggleCarousel: () => dispatch(toggleCarousel())

})

export default connect(null, mapDispatchToProps)(Item);


