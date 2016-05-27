import React, { Component, PropTypes } from 'react';

export default class Calendar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			year: typeof this.props.year === 'number' ? this.props.year : new Date().getFullYear(),
			month: typeof this.props.month === 'number' ? this.props.month : new Date().getMonth(),
			day: typeof this.props.day === 'number' ? this.props.day : new Date().getDate(),
			today: {
				year: new Date().getFullYear(),
			    month: new Date().getMonth(),
			    day: new Date().getDate()
			},
			type: 'day',
			year_range: 0
		};

		this.openYearList = this.openYearList.bind(this);
		this.openMonthList = this.openMonthList.bind(this);
	}
	/*
	 * 初始化选中状态和默认日期
	 */
	componentDidMount(){
		const activeday = this.getDayDom(this.props.year, this.props.month, this.props.day);
		const today = this.getDayDom(this.state.today.year, this.state.today.month, this.state.today.day);
		if(today){
			today.classList.add('To_Date');
		}
		if(activeday){
			activeday.classList.add('Active_Date');
		}
	}
	/*
	 * 每次更新获取选中日期和默认日期
	 */
	componentDidUpdate(){
		const tbody = this.refs.CalendarDays;
		Array.prototype.forEach.call(tbody.querySelectorAll('.To_Date,.Active_Date'), (dom) => {
			dom.classList.remove('To_Date');
			dom.classList.remove('Active_Date');
		});
		const activeday = this.getDayDom(this.props.year, this.props.month, this.props.day);
		const today = this.getDayDom(this.state.today.year, this.state.today.month, this.state.today.day);
		if(today){
			today.classList.add('To_Date');
		}
		if(activeday){
			activeday.classList.add('Active_Date');
		}
	}
	/*
	 * 点击切换选中日期
	 */
	handleClick(event){
		var td = event.target;
		let dateyear = parseInt(td.getAttribute('data-dateyear'));
		let datemonth = parseInt(td.getAttribute('data-datemonth'));
		let dateday = parseInt(td.getAttribute('data-dateday'));
		if(td.classList.contains('No_Date')) return false;

		//当错误点击或点击当前日期不执行操作
		if((!dateyear && !datemonth && !dateday) ||  (dateyear === this.props.year && datemonth === this.props.month && dateday === this.props.day)){
			return false;
		}
		//日历点击
		if(dateyear > 0 && datemonth > -1 && dateday > 0){
			if(this.props.callback){
				this.props.callback(new Date(dateyear, datemonth, dateday));
			}
			this.props.onSelectDate({year:dateyear,month:datemonth,day:dateday}, this.props.sign);
			if(this.props.Selectclose){
				this.props.onClose(this.props.sign); // 选择后关闭
			}
		}
		//月历点击
		else if(dateyear > 0 && datemonth > -1 && !dateday){
			setTimeout(() => {this.setState({
				type: 'day',
				month: datemonth
			});},0);
		}
		//年历点击
		else if(dateyear > 0 && !datemonth && !dateday){
			setTimeout(() => {this.setState({
				type: 'month',
				year: dateyear
			});},0);
		}
		//日历点击不执行zoom-in动画
		if(this.state.type === 'day') {
			return false;
		}
		//zoom-in动画
		const tbody = this.refs.CalendarDays.querySelector('tbody');
		tbody.classList.add('Calendat-fadein');
		setTimeout(() => {
			tbody.classList.remove('Calendat-fadein');
		},400);
	}
	/*
	 * 给定日期得到对应DOM节点 ( 如无则false )
	 */
	getDayDom(year, month, day){
		const doms = this.refs.CalendarDays.querySelectorAll('td');
		var obj;
		var arr = Array.prototype.filter.call(doms, (dom) => {
			let dateyear = dom.getAttribute('data-dateyear');
			let datemonth = dom.getAttribute('data-datemonth');
			let dateday = dom.getAttribute('data-dateday');

			obj = dateyear == year ? ( !datemonth ? ( !dateday ? dom : false ) : ( datemonth == month ? ( (dateday == day || !dateday) ? dom : false ) : false )) : false;
			if(typeof obj === 'object'){
				return true;
			}
		});
		return arr[0] ? arr[0] : false;
	}
	/*
	 * 加载日历
	 */
	getDay(x, y, first, curMonth, prevMonth) {
		var cur = (x-1)*7 + y;
		var year = this.state.year,
			month = this.state.month,
			day,
			classNames = '';

		first = (first < 2) ? (first + 7) : first;

		//上个月的日期
		if(cur < first){
			day = (prevMonth - (first - cur - 1));
			if(this.state.month === 0){
				year = this.state.year - 1;
				month = 11;
			}
			else {
				month--;
			}
		}
		//下个月的日期
		else if(cur >= (first + curMonth)){
			if(this.state.month === 11){
				year = this.state.year + 1;
				month = 0;
			}
			else {
				month++;
			}
			day = (cur - (first + curMonth - 1));
		}
		//本月的日期
		else {
			day = (cur - first + 1);
			classNames = 'Now_Month';
		}
		classNames += this.is_DateRange(year,month,day) ? '' : ' No_Date';
		return <td key={'Calendar_td_' + cur} data-dateyear={year} data-datemonth={month} data-dateday={day} className={classNames}>{day}</td>;
	}
	/*
	 * 得到日期是否在范围内
	 */
	is_DateRange(year, month, day){
		let cur = new Date(year, month, day);
		let min = this.props.limit[0];
		let max = this.props.limit[1];
		if(cur > min && cur < max){
			return true;
		}
		return false;
	}
	/*
	 * 获得二月日数
	 */
	is_leap(year) {
		return (year%100==0?(year%400==0?29:28):(year%4==0?29:28));
	}
	/*
	 * 初始化日历
	 */
	initCalendar (){
		const date = this.state;
		const first = new Date(date.year,date.month).getDay();
		const total = new Array(31,this.is_leap(date.year),31,30,31,31,30,31,30,31,30,31);
		const curMonth = total[date.month];
		const prevMonth = date.month > 0 ? total[date.month-1] : 31;
		var tbody = [];
		for(let i=1;i<=6;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						let arr = [];
						for(let j=1;j<=7;j++){
							arr.push(this.getDay(i, j, first, curMonth, prevMonth));
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 上下箭头切换日历
	 */
	changeDate (i){
		switch(this.state.type){
			case 'day':
				var nextState = this.state.month + i;
				if(nextState<0){
					this.setState({
						month: 11,
						year: this.state.year-1
					});
				}
				else if(nextState>11){
					this.setState({
						month: 0,
						year: this.state.year+1
					});
				}
				else {
					this.setState({
						month: nextState
					});
				}
			break;
			case 'month':
				var nextState = this.state.year + i;
				this.setState({
					year: nextState
				});
			break;
			case 'year':
				var nextState = this.state.year_range + i*20;
				this.setState({
					year_range: nextState
				});
			break;
		}
		//滑动动画
		const tbody = this.refs.CalendarDays.querySelector('tbody');
		if(tbody.getAttribute('data-slideFlag') === 'true') {
			return false;
		}

		var slideType = i===1 ? 'up' : 'down';
		tbody.classList.add('Calendat-slide' + slideType);
		tbody.setAttribute('data-slideFlag', 'true');
		setTimeout(() => {
			tbody.classList.remove('Calendat-slide' + slideType);
			tbody.setAttribute('data-slideFlag', 'false');
		},400);
	}
	/*
	 * 打开年历
	 */
	openYearList(){
		let tbody = [];
		const start = this.state.year_range;
		var classNames;
		for(let i=1;i<=4;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						let arr = [];
						for(let j=1;j<=5;j++){
							let cur = start + (i-1)*5+j;
							let min = this.props.limit[0];
							let max = this.props.limit[1];
							classNames = 'Year_List';
							if(cur < min.getFullYear() || cur > max.getFullYear()){
								classNames += ' No_Date';
							}
							arr.push(<td key={'Calendar_td_' + ((i-1)*4+j)} data-dateyear={cur} className={classNames}>{cur}</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 打开月历
	 */
	openMonthList(){
		let tbody = [];
		var classNames;
		for(let i=1;i<=3;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						let arr = [];
						for(let j=1;j<=4;j++){
							let cur = (i-1)*4+j;
							let min = this.props.limit[0];
							let max = this.props.limit[1];
							classNames = 'Month_List';
							if((this.state.year < min.getFullYear() || this.state.year > max.getFullYear()) || (this.state.year == min.getFullYear() && cur-1 < min.getMonth()) || (this.state.year == max.getFullYear() && cur-1 > max.getMonth())){
								classNames += ' No_Date';
							}
							arr.push(<td key={'Calendar_td_' + cur} data-dateyear={this.state.year} data-datemonth={cur-1} className={classNames}>{cur}月</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 切换显示状态
	 */
	switchList(string){
		var that = this;

		const start = that.state.year-that.state.year%20;
		that.setState({
			type: string,
			year_range: start
		});

		if(this.state.type === 'year') {
			return false;
		}

		//zoom-out动画
		const tbody = this.refs.CalendarDays.querySelector('tbody');
		tbody.classList.add('Calendat-fadeout');
		setTimeout(() => {
			tbody.classList.remove('Calendat-fadeout');
		},400);
	}
	render() {
		var tbody;
		switch(this.state.type){
			case 'day':
				var thead = (<thead><tr key="Calendar_tr_0">
					<th key="Calendar_th_1">一</th>
					<th key="Calendar_th_2">二</th>
					<th key="Calendar_th_3">三</th>
					<th key="Calendar_th_4">四</th>
					<th key="Calendar_th_5">五</th>
					<th key="Calendar_th_6">六</th>
					<th key="Calendar_th_7">日</th>
				</tr></thead>);
				tbody = this.initCalendar();
				break;
			case 'month':
				tbody = this.openMonthList();
				break;
			case 'year':
				tbody = this.openYearList();
				break;
		}
		return (
			<div className="Calendar-Wrap" style={{'display': this.props.switch ? 'block' : 'none'}}>
				<div className="Calendar-Head">
				    <span className="Calendar-Year" onClick={this.switchList.bind(this, 'year')}>{this.state.type === 'year' ? (this.state.year_range + '-' + (this.state.year_range + 20)) : (this.state.year + '年')}</span>
				    <span className="Calendar-Month" onClick={this.switchList.bind(this, 'month')} style={{'visibility': this.state.type !== 'day' ? 'hidden' : 'visible'}}>{(+this.state.month + 1) + '月'}</span>
					<span className="Switch-Month-Btn" onClick={this.changeDate.bind(this, 1)}></span>
					<span className="Switch-Month-Btn" onClick={this.changeDate.bind(this, -1)}></span>
				</div>
				<table ref="CalendarDays" className="Calendar-Body" onClick={this.handleClick.bind(this)}>
					{thead}
					<tbody>
						{tbody}
					</tbody>
				</table>
			</div>
		);
	}
}

Calendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  switch: PropTypes.bool,
  callback: PropTypes.func,
  sign: PropTypes.number,
  limit: PropTypes.array,
  Selectclose: PropTypes.bool,
  onClose: PropTypes.func,
  onSelectDate: PropTypes.func.isRequired
};

Calendar.defaultProps = {
	year: null,
    month: null,
    day: null,
    limit: [new Date(1900,0,1), new Date(2099,11,31)],
    sign: 0,
    switch: false
};