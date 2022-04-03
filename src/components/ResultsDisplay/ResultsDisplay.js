import React from 'react';
// import EvDisplay from '../EvDisplay/EvDisplay';
import './ResultsDisplay.css';

const ResultsDisplay = (props) => {
	const afc = calculateAnnualFuelCost(props);

	let resultsDisplay;

	if (props.fuelConsumption) {
		resultsDisplay = <p className="results-display">You’re spending roughly <span className="price">${numberWithCommas(afc)} per day</span> on gas.</p>
	} else {
		resultsDisplay = <p className="results-no-display"><span className="up-arrow">🔝</span> Select a vehicle <span className="up-arrow">🔝</span></p>
	}

	return (
		<div className="results-container">
			{resultsDisplay}	
		</div>
	);
}

function calculateAnnualFuelCost(props) {
	return Math.round(((props.driveDistance / 100) * props.fuelConsumption) * props.gasPrice);
	// return ((props.driveDistance / 100) * props.fuelConsumption) * props.gasPrice;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default ResultsDisplay;