import React, { Component, PropTypes } from 'react';
import './grid.scss';

let prefix = 'ReactCat-Grid-';

export default class Grid extends Component {
	constructor (props) {
		super(props);
		this.state = {
			SCREEN_WIDTH:  document.body.clientWidth
		};
		this.reSize = this.reSize.bind(this);
	}
	componentDidMount(){
		window.addEventListener('resize', this.reSize);
	}
	componentWillUnmount(){
		window.removeEventListener('resize', this.reSize);
	}
	reSize(){
		this.setState({
			SCREEN_WIDTH: document.body.clientWidth
		});
	}
	render() {
		let that = this;
		let WrapClass = 'ReactCat-Grid-Wrap' + (this.props.className ? (' ' + this.props.className) : '')  + ( this.props.align ? (' ' + prefix + this.props.align) : '');
		let child = React.Children.map(this.props.children, (child) => {
			let { xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset } = child.props;
			let styles = child.props.wrapStyle || {};
			const SCREEN_WIDTH = that.state.SCREEN_WIDTH;
			if(SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 992){
				 styles['width'] = (sm?sm + '%':0);
				 styles['marginLeft'] = (smOffset?smOffset:0) + '%';
			}
			else if(SCREEN_WIDTH >= 992 && SCREEN_WIDTH < 1200){
				styles['width'] = (md?md + '%':0);
				styles['marginLeft'] = (mdOffset?mdOffset:0) + '%';
			}
			else if(SCREEN_WIDTH >=  1200){
				styles['width'] = (lg?lg + '%':0);
				styles['marginLeft'] = (lgOffset?lgOffset:0) + '%';
			}
			else{
				styles['width'] = (xs?xs + '%':0);
				styles['marginLeft'] = (xsOffset?xsOffset:0) + '%';
			}
			if(styles['width'] == 0){
				styles['width'] = (lg?lg:md?md:sm?sm:xs) + '%';
			}
			let classNames = 'ReactCat-Grid' + ' ReactCat-Grid-' + child.type + (child.props.className ? (' ' + child.props.className) : '');
			return <span className={classNames} style={styles}>{child}</span>;
		});
		return (
			<div className={WrapClass} style={this.props.style}>{child}</div>
   		);
	}
}

Grid.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  align: PropTypes.string,
  children: PropTypes.node
};