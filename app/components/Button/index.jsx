import React, { Component, PropTypes } from 'react';
import './button.scss';
let prefix = 'ReactCat-btn-';

export default class Button extends Component {
	constructor (props) {
		super(props);
		this.state = {
			disabled: this.props.disabled ? this.props.disabled : false
		};
		this.handClick = this.handClick.bind(this);
	}
	handClick(){
		if(this.props.onClick){
			this.props.onClick();
		}
		if(this.props.once){
			this.setState({
				disabled: true
			});
		}

	}
	render() {
		let classNames = prefix + (this.props.theme ? this.props.theme : 'default') + (this.props.className ? (' ' + this.props.className) : '') + ( this.props.align ? (' ' + prefix + this.props.align) : '') + ( this.props.size ? (' ' + prefix + this.props.size) : '');
		let styles = this.props.style || {};
		switch(this.props.show){
			case 'hidden':{
				styles['visibility'] = 'hidden';
				break;
			}
			default: {
				styles['display'] = this.props.show;
				break;
			}
		}
		return (
			<button
				ref = {(ref) => this.button = ref}
				onClick={this.handClick.bind(this)}
				style={styles}
				type={this.props.type || 'button'}
				className={classNames}
				disabled={this.state.disabled}
				>
				{this.props.children}
			</button>
		);
	}
}

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  show: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  align: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  once: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};