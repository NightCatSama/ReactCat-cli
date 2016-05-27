import React, { Component, PropTypes } from 'react';
import 'font-awesome/css/font-awesome';
let prefix = 'fa-';

export default class Icon extends Component {
	constructor (props) {
		super(props);
	}
	render() {
		let { type, size, style, className, fixed } = this.props;
		let classNames = 'fa ' + prefix + type + ' ' + (className ? className : '');
		if(size){
			classNames += ' ' + prefix + size;
		}
		if(fixed){
			classNames += ' fa-fw';
		}
		switch(typeof this.props.rotate){
			case 'boolean': {
				classNames += this.props.rotate ? ' fa-spin' : '';
				break;
			}
			case 'string': {
				classNames += ' fa-flip-' + this.props.rotate;
				break;
			}
			case 'number': {
				classNames += ' fa-rotate-' + this.props.rotate;
				break;
			}
		}
		return (
			<i
				style={style}
				className={classNames}>
			</i>
		);
	}
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  rotate: PropTypes.number,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
};