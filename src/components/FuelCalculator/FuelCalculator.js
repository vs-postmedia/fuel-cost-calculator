import axios from 'axios';
import { csvParse } from 'd3-dsv';
import React, { Component } from 'react';
import DistanceSlider from '../DistanceSlider/DistanceSlider';
import Footer from '../Footer/Footer';
import GasSlider from '../GasSlider/GasSlider';
import VehicleSelector from '../VehicleSelector/VehicleSelector';
import ResultsDisplay from '../ResultsDisplay/ResultsDisplay';

// css
import './FuelCalculator.css';


export class EvCalculator extends Component {
	constructor(props) {
		super(props);
    	this.updateDistanceSlider = this.updateDistanceSlider.bind(this);
    	this.updateGasPrice = this.updateGasPrice.bind(this);
    	this.updateIceYear = this.updateIceYear.bind(this);
    	this.updateIceMake = this.updateIceMake.bind(this);
    	this.updateIceModel = this.updateIceModel.bind(this);
	}

	state = {
		current_make: '',
		current_model: '',
		current_year: '',
		disable_make_selector: false,
		disable_model_selector: true,
		driving_distance: 25,
		gas_price: 1.85,
		power_price: 0,
		subsidy: {
			federal: false,
			provincial: false
		},
		vehicle: {
			ice: {}
		},
		vehicle_selected: {},
		vehicle_data: {ice: {}}
	}

	async componentDidMount() {
		// fetch data file but never take a cached version
		axios.get(this.props.dataUrl)
			.then(response => csvParse(response.data))
			.then(data => {
				this.setState({
					vehicle_data: {
						ice: data.filter(d => d.fuel_type !== 'B')
					}
				})
			})
			.catch(err => console.log(err));
	}

	getComboMax(data) {
		return data.reduce((max, d) => d.fc_comb_l100 > max ? d.fc_comb_l100 : max, data[0].fc_comb_l100);
	}

	updateDistanceSlider(val) {
		this.setState({
			driving_distance: val
		});
	}

	updateGasPrice(val) {
		this.setState({
			gas_price: val
		});
	}

	updateIceYear(val) {
		const ice = this.state.vehicle_data.ice.filter(d => d.year === val.value);
		
		this.setState({
			current_make: '',
			current_model: '',
			current_year: val.value,
			vehicle: { 
				ice: ice
			}
		});
	}

	updateIceMake(val) {
		const ice = this.state.vehicle_data.ice.filter(d => d.year === this.state.current_year && d.make === val.value);

		this.setState({
			current_make: val.value,
			current_model: '',
			disable_model_selector: false,
			vehicle: { 
				ice: ice
			}
		});
	}

	updateIceModel(val, e) {
		const ice = this.state.vehicle_data.ice.filter(d => d.year === this.state.current_year && d.make === this.state.current_make && d.model === val.value);

		console.log(ice, e)

		this.setState({
			current_model: val.value,
			vehicle: { 
				fuel_consumption: this.getComboMax(ice),
				ice: ice 
			}
		});
	}

	render() {
		let vehicleSelector, resultsDisplay;

		if (this.state.vehicle_data.ice.length > 0) {
			vehicleSelector = <VehicleSelector 
					currentMake={this.state.current_make}
					currentModel={this.state.current_model}
					currentYear={this.state.current_year}
					disableMakeSelector={this.state.disable_make_selector}
					disableModelSelector={this.state.disable_model_selector}
					ice_data_subset={this.state.vehicle.ice}
					ice_data={this.state.vehicle_data.ice}
					setYearHandler={this.updateIceYear}
					setMakeHandler={this.updateIceMake}
					setModelHandler={this.updateIceModel}>
				</VehicleSelector>

			resultsDisplay = <ResultsDisplay
					driveDistance={this.state.driving_distance}
					evData={this.state.vehicle_data.ev}
					fuelConsumption={this.state.vehicle.fuel_consumption}
					gasPrice={this.state.gas_price}
				></ResultsDisplay>
		} else {
			vehicleSelector = null;
			resultsDisplay = null;
		}

		return (
			<div className='ev-calculator'>
				<DistanceSlider
					defaultValue={this.state.driving_distance}
					drivingDistance={this.state.driving_distance}
					onChange={this.updateDistanceSlider}
				></DistanceSlider>

				<GasSlider
					defaultValue={this.state.gas_price}
					gasPrice={this.state.gas_price}
					onChange={this.updateGasPrice}
				></GasSlider>

				{vehicleSelector}
				{resultsDisplay}

				<Footer></Footer>
			</div>
		);
	}
}

export default EvCalculator;