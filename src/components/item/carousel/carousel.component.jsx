import React, {useState} from 'react';
import { connect } from 'react-redux';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { toggleCarousel } from '../../../redux/shop/shop.actions';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './carousel.styles.scss'


//distinguishing vertical pics
// numbering of pics

const ViewCarousel = ({item, handleCarousel, toggleCarousel}) => {

const { url } = item

let imgStyles={
  width: 100+"%",
  height: "auto"
}

const [x, setX] = useState(0)

const goLeft = () => {
  x === 0 ? 
  setX(-100 * (url.length - 1)) :
  setX(x + 100)
}
 
const goRight = () => {
  x === -100*(url.length - 1) ?
  setX(0) :
  setX(x - 100)
}


	return (
    <div>
      <div className='remove-button' onClick={() => {
        handleCarousel();
        toggleCarousel();
      }}
      >&#10005;</div>
    		<div className="slider">
          {
            url.map((image, index) => {
              return(
                <div key={index} className="slide" style={{transform:`translateX(${x}%)`}}>
                  <img src={image} alt="Alt text" style={imgStyles}
                    />
                </div>
                )
            })
          }
      <button id="goLeft" onClick={goLeft}>
      <ChevronLeftIcon style={{ fontSize: 40 }}  />
      </button>
       <button id="goRight" onClick={goRight}>
        <ChevronRightIcon style={{ fontSize: 40 }} />
        </button>
		  </div>
    </div>

		)
}

const mapDispatchToProps = dispatch => ({
  toggleCarousel: () => dispatch(toggleCarousel())
})

export default connect(null, mapDispatchToProps)(ViewCarousel);

