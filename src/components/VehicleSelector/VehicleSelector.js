import React from 'react';
import Select from 'react-select';
import './VehicleSelector.css';

const VehicleSelector = (props) => {
	const years = getUniqueValues(props, 'year');
	const make = getUniqueValues(props, 'make');
	const model = getUniqueValues(props, 'model');

	return (
		<div className='vehicle-selector'>
			<h3>What car do you drive?</h3>
			<Select className='half-width' options={years} 
				placeholder={'Year...'}
				onChange={props.setYearHandler} />
			<Select className='half-width' options={make} 
				isDisabled={props.disableMakeSelector}
				placeholder={'Make...'}
				onChange={props.setMakeHandler}/>
			<Select className='full-width' options={model}
				isDisabled={props.disableModelSelector}
				placeholder={'Enter a model...'}
				onChange={props.setModelHandler}/>
		</div>
	);
}

function getUniqueValues(props, variable) {
	let ice_data, selector_object;

	if (variable === 'year') {
		ice_data = props.ice_data;
	} else if (variable === 'make') {
		ice_data = props.ice_data.filter(d => d.year === props.currentYear);
	} else if (variable === 'model') {
		ice_data = props.ice_data.filter(d => d.year === props.currentYear && d.make === props.currentMake);
	} else {
		ice_data = props.ice_data;
	}

	// get an array of unique values for selected variable
	const array = [...new Set(ice_data.map(d => d[variable]))];
	// create an options array for the select item, sorting years in reverse
	if (variable === 'year') {
		selector_object = array.map(d => { return {value: d, label: d.toString()}}).sort((a, b) => b.value - a.value);
	} else {
		selector_object = array.map(d => { return {value: d, label: d.toString()}}).sort((a, b) => a.value - b.value);
	}

	return selector_object;
}

export default VehicleSelector;