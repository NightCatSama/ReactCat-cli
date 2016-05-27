import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';
import './sidebar';

export default class Sidebar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			mode: this.props.mode
		};
		this.FirstItemActive = [];
		this.subscibe = this.subscibe.bind(this);
		this.publish = this.publish.bind(this);
		this.changeItem = this.changeItem.bind(this);
	}
	componentDidMount(){
		let sidebar = this.refs.sidebar;
		sidebar.addEventListener('click', this.changeItem);
	}
	componentWillUnmount(){
		let sidebar = this.refs.sidebar;
		sidebar.removeEventListener('click', this.changeItem);
	}
	changeItem(evt){
		/*
		 * 点击添加selected
		 */
		let elem = evt.target;
		if(elem.tagName === 'A' && !elem.classList.contains('ReactCat-subsidebar')){
			if(this.props.multiple){
				elem.classList.toggle('selected');
			}
			else {
				if(elem.classList.contains('selected')){
					if(this.props.canCancel) elem.classList.remove('selected');
				}
				else {
					let selectors = this.refs.sidebar.querySelectorAll('.selected');
					for(var i=0;i<selectors.length;i++){
						selectors[i].classList.remove('selected');
					}
					elem.classList.add('selected');
				}
			}
		}
		if(this.props.onChange){
			 this.props.onChange(evt.target);
		}
	}
	subscibe(index, fn){
		this.FirstItemActive[index] = {};
		this.FirstItemActive[index].key = index;
		this.FirstItemActive[index].fn = fn;
	}
	publish(index){
		for(var i=0;i<this.FirstItemActive.length;i++){
			if(i != index){
				this.FirstItemActive[i].fn();
			}
		}
	}
	setObserver(){
		return {
			subscibe: (index, fn) => this.subscibe(index, fn),
			publish: (index) => this.publish(index)
		};
	}
	render() {
		// 单一展开
		let observer = this.props.only ? this.setObserver() : {};
		// hover展开
		let hover = this.props.hover || (this.state.mode === 'verticality' ? false : true);
		// style
		let style = Object.assign({}, this.props.style, {width: this.props.width});
		let child = React.Children.map(this.props.children, (child, i) => {
			return <SidebarItem {...observer} active={child.props.active || false} number={i} hover={hover}>{child}</SidebarItem>;
		});
		let classNames = 'ReactCat-sidebar' + (' ReactCat-sidebar-' + this.state.mode) + (this.props.show ? '' : ' ReactCat-sidebar-hide') + (this.props.position ? (' ' + this.props.position) : '') + (this.props.className ? (' ' + this.props.className) : '') + (this.props.hover ? ' ReactCat-sidebar-hover' : '' );
		return (
			<span>
				{this.props.noMask || <Mask show={this.props.show} onclick={this.props.maskClick} />}
				<ul ref="sidebar" className={classNames} style={style}>
					{child}
				</ul>
			</span>
   		);
	}
}


export class SidebarItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			active: this.props.active
		};
		this.queue = [];
		this.toggleList = this.toggleList.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		let elem = this.refs.subSidebar;
		if(elem && elem.style.display === 'block'){
			elem.parentNode.classList.add('ReactCat-sidebar-open');
		}
		//订阅唯一
		if(this.props.subscibe){
			var fn = () => {
				this.toggleList(-1);
			};
			this.props.subscibe(this.props.number, fn);
		}
	}
	handleClick(type){
		if(this.props.publish){
			this.props.publish(this.props.number);
		}
		this.toggleList(type);
	}
	toggleList(type){
		let that = this;
		let elem = that.refs.subSidebar;
		let promise = new Promise((resolve) => {
			if(type === -1){
				that.slideUp(elem);
			}
			else if(type === 1){
				that.slideDown(elem);
			}
			else {
				that.slideToggle(elem, resolve, that.slideToggle.bind(that, elem, resolve, type));
			}
		});
		promise.then(() => {
			elem.parentNode.classList.toggle('ReactCat-sidebar-open');
			elem.classList.remove('ReactCat-sidebar-animate');
			elem.style.height = '';
			that.setState({
				active: !that.state.active
			});
			if(this.queue.length > 0){
				(this.queue.shift())();
			}
		}).catch(() => {
			return false;
		});
	}
	Quad_easeIn(t, b, c, d) {
        return c * (t /= d) * t + b;
    }
	slideToggle(el, resolve, fn){
		if(el.classList.contains('ReactCat-sidebar-animate')){
			this.queue.push(fn);
			return false;
		}
		el.style.display = 'block';
		let active = this.state.active,
			mode = active ? -1 : 1,
			h = el.offsetHeight;
		el.style.height = active ? h + 'px' : 0;
		let d = 500,
			b = parseFloat(el.style.height),
			c = b ? (0-b) : (h-b),
			count = d / 60;
		if(this.props.hover) el.style.overflow = 'hidden';
		let tick = () => {
			let current_height = this.Quad_easeIn(d - (count-- * 60), b, c, d);
			el.style.height = current_height + 'px';
			if ((mode === 1 && current_height < h) || (mode === -1 && current_height > 0)) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
			else {
				resolve();
				if(this.props.hover) el.style.overflow = 'visible';
			}
		};
		tick();
	}
	slideUp(el){
		this.queue.length = 0;
		let h = el.offsetHeight;
		if( h === 0 ) return false;
		let d = 500,
			b = h,
			c = 0-b,
			count = d / 60;
		if(this.props.hover) el.style.overflow = 'hidden';
		let tick = () => {
			let current_height = this.Quad_easeIn(d - (count-- * 60), b, c, d);
			el.style.height = current_height + 'px';
			if (current_height > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
			else {
				el.parentNode.classList.remove('ReactCat-sidebar-open');
				el.classList.remove('ReactCat-sidebar-animate');
				el.style.display = 'none';
				el.style.height = 'auto';
				if(this.props.hover) el.style.overflow = 'visible';
				this.setState({
					active: false
				});
			}
		};
		tick();
	}
	slideDown(el){
		this.queue.length = 0;
		if( el.style.display !== 'none' ) return false;
		el.style.display = 'block';
		let h = el.offsetHeight;
		el.style.height = 0;
		let d = 500,
			b = 0,
			c = h-b,
			count = d / 60;
		if(this.props.hover) el.style.overflow = 'hidden';
		let tick = () => {
			let current_height = this.Quad_easeIn(d - (count-- * 60), b, c, d);
			el.style.height = current_height + 'px';
			if (current_height < h) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
			else {
				el.parentNode.classList.add('ReactCat-sidebar-open');
				el.classList.remove('ReactCat-sidebar-animate');
				el.style.height = 'auto';
				if(this.props.hover) el.style.overflow = 'visible';
				this.setState({
					active: true
				});
			}
		};
		tick();
	}
	render (){
		let item = this.props.children;
		let child = Array.prototype.slice.call(item.props.children);
		if(typeof item.type === 'function' || (item.type && item.type.charAt(0) !== 'h')){
			let classNames = item.props.selected ? 'selected' : '';
			return <li className={classNames}>{item}</li>;
		}
		else {
			let title = child.shift();
			let hover = this.props.hover ? {
				onMouseEnter: () => { this.toggleList(1); },
				onMouseLeave: () => { this.toggleList(-1); }
			} : {};
			let click = !this.props.hover ? {
				onClick: this.handleClick
			} : {};
			let classNames = 'ReactCat-sidebar-item' + item.type.charAt(1);
			return (<li className={classNames} {...hover}>
				<a href="javascript:;" className="ReactCat-subsidebar" {...click}>{title}</a>
				<ul ref="subSidebar" style={{display: this.state.active ? 'block' : 'none'}}>{
					React.Children.map(child, (child) => {
						return <SidebarItem active={child.props.active || false} hover={this.props.hover}>{child}</SidebarItem>;
					})
				}</ul>
			</li>);
		}
	}
}

Sidebar.propTypes = {
	show: PropTypes.bool,
	noMask: PropTypes.bool,
	position: PropTypes.string,
	style: PropTypes.object,
	hover: PropTypes.bool,
	mode: PropTypes.string,
	maskClick: PropTypes.func,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	className: PropTypes.string,
	only: PropTypes.bool,
	multiple: PropTypes.bool,
	canCancel: PropTypes.bool,
	onChange: PropTypes.func,
	children: PropTypes.node
};


SidebarItem.propTypes = {
	hover: PropTypes.bool,
	active: PropTypes.bool,
	publish: PropTypes.func,
	number: PropTypes.number,
	subscibe: PropTypes.func,
	children: PropTypes.node
};

Sidebar.defaultProps = {
	hover: false,
	mode: 'verticality',
	width: '100%',
	show: false,
	noMask: false,
	only: true,
	multiple: false,
	canCancel: false,
	onChange: null
};