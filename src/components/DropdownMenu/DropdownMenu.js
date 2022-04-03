import React from 'react';
import Select from 'react-select';

const DropdownMenu = (props) => {
	// console.log(props)
	const defaultModelValue = 'Enter a model...';

	// const years = getUniqueValues(props, 'year');
	// const make = getUniqueValues(props, 'make');
	// const model = getUniqueValues(props, 'model');

	// console.log(model)
	return (
		<Select options={props.options}
			isDisabled={props.isDisabled}
			placeholder={props.placeholder}
			onChange={props.onChange} />
	);
}

export default DropdownMenu;