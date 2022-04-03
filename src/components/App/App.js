import React from 'react';
import FuelCalculator from '../FuelCalculator/FuelCalculator';
import './App.css';

const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/misc/gas-cost-calculator-data.csv'

function App() {
	return (
	  	<div className="App">
	  		<h1>Gas cost calculator</h1>
	  		<FuelCalculator dataUrl={dataUrl}></FuelCalculator>
	  	</div>
	);
}

export default App;
