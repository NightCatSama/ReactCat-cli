import React, { Component, PropTypes } from 'react';
import './modal.scss';

export default class Body extends Component {
	constructor (props) {
		super(props);
	}
	render() {
		return (
			<div className="ReactCat-Modal-Body">{this.props.children}</div>
		);
	}
}

Body.propTypes = {
  children: PropTypes.any
};