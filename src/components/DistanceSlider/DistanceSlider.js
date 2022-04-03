import React from 'react';
import Slider from 'rc-slider/lib/Slider';

// CSS
import './DistanceSlider.css';
import 'rc-slider/assets/index.css';

const DistanceSlider = (props) => {
	return (
		<div className="distance-container">
			<h3 className='slider-header'>How far do you drive each day?</h3>
			<h3 className='driving-distance slider-result'>{numberWithCommas(props.drivingDistance)} km</h3>
			
			<Slider 
				defaultValue={props.defaultValue}
				dots={false}
				marks={{ 10: '10km', 50: '50km', 100: '100km'}}
				max={100}
				min={10}
				step={1}
				onChange={props.onChange}
			/>
		</div>
	);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default DistanceSlider;
