import React from 'react';
import Slider from 'rc-slider/lib/Slider';

// CSS
import './GasSlider.css';
import 'rc-slider/assets/index.css';

const DistanceSlider = (props) => {
	return (
		<div className="gas-slider-container">
			<h3 className='slider-header'>What’s the price of gas?</h3>
			<h3 className='gas-price slider-result'>${props.gasPrice}/litre</h3>
			
			<Slider 
				defaultValue={props.defaultValue}
				dots={false}
				min={1.50}
				max={2.50}
				marks={{1.5: '$1.50', 2:'$2.00', 2.5:'$2.50' }}
				step={0.01}
				onChange={props.onChange}
			/>
		</div>
	);
}


export default DistanceSlider;
