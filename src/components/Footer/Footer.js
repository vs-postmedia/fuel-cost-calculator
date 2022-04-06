import React from 'react';
import './Footer.css';


const Footer = (props) => {
	return (
		<footer>
			<p className="source">Source:  <a href="https://open.canada.ca/data/en/dataset/98f1a129-f628-4ce4-b24d-6f16bf24dd64" target="_blank">Natural Resources Canada</a></p>
			<p className="source">NOTE: Fuel costs are calculated using the combined (highway and city) fuel consumption ratings provided by Natural Resources Canada and are rounded to the nearest dollar.</p>
		</footer>
	)
};

export default Footer;

