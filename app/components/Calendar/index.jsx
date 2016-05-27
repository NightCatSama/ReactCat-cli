import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateActions from '../../actions/DateAction';
import Calendar from './calendar';
import './calendar.scss';

export default class Cal extends Component {
	constructor (props) {
	    super(props);
    	this.state = {
    		switch: this.props.newState.switch
    	};
    	this.onBlur = this.onBlur.bind(this);
	}
	componentDidMount(){
		 window.addEventListener('click', this.onBlur, false);
	}
	componentWillUnmount(){
		window.removeEventListener('click', this.onBlur, false);
	}
	onBlur(evt) {
		const { closeDate } = this.props.actions;
		let el = document.querySelectorAll('.Calendar-Wrap');
		let kg = document.querySelectorAll('.Calendar-Switch');
		let arr = [];
		Array.prototype.forEach.call(el, (dom, i) => {
			if(dom.contains(evt.target)){
				arr[i] = true;
			}
			else {
				arr[i] = false;
			}
		});
		Array.prototype.forEach.call(kg, (dom, i) => {
			if(dom.contains(evt.target)){
				arr[i] = true;
			}
		});
		arr.forEach((a) => {
			if(!a){
				closeDate(this.props.sign);
			}
		});
	}
	render() {
		const { displayDate, setDate, closeDate } = this.props.actions;
		let state = this.props.newState;
		let curDate = state.map((v) => {
			let str = '';
			if(v.year && v.month > -1 && v.day){
				str = v.year + '-' + ((v.month+1)>9 ? (v.month+1) : '0' + (v.month+1)) + '-' + ((v.day)>9 ? (v.day) : '0' + (v.day));
			}
			return str;
		});
		return (
			<div style={{display: 'inline-block', marginLeft: '20px'}}>
				<div className="Calendar">
					<input className="Calendar-Switch" onFocus={() => displayDate(this.props.sign)} onChange={() => {}} value={curDate[this.props.sign]} />
					<Calendar {...state[this.props.sign]} Selectclose={true} sign={this.props.sign} onClose={() => closeDate(this.props.sign)} onSelectDate={(date, sign) => setDate(date, sign)}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {newState: state.calendar};
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(DateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cal);

Cal.defaultProps = {
	sign: 0
};
Cal.propTypes = {
  newState: PropTypes.any,
  actions: PropTypes.any,
  sign: PropTypes.number
};