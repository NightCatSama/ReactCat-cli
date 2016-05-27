import React, { Component, PropTypes } from 'react';
import './modal.scss';

export default class Header extends Component {
	constructor (props) {
		super(props);
	}
	render() {
		return (
			<div className="ReactCat-Modal-Header">{this.props.children}</div>
		);
	}
}

Header.propTypes = {
  children: PropTypes.any
};