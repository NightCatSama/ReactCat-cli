import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SidebarActions from '../../actions/SidebarAction';

import Icon from '../../components/Icon';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';

import '../../style/index.scss';

export default class Tmp extends Component {
	constructor (props) {
	    super(props);
	    this.toggleSidebar = this.toggleSidebar.bind(this);
	}
	componentDidMount(){
	}
	toggleSidebar(){
		let { displaySidebar } = this.props.actions;
		displaySidebar();
	}
	render() {
		let { displaySidebar } = this.props.actions;
		let slidebarProps = {
			width: 280,
			className: '',
			position: 'absolute-left',
			multiple: false,
			only: true,
			noMask: true,
			show: this.props.store.show,
			onChange: null,
			canCancel: true,
			ref: (ref) => this.sidebar = ref,
			maskClick: displaySidebar,
			style: {
				display: 'block'
			}
		};
		return (
			<Sidebar {...slidebarProps}>
				<h1>
					<span><Icon fixed={true} type="search" />First Item</span>
					<IndexLink to="/" activeClassName="selected" >二级选项</IndexLink>
					<Link to="/moreDay" activeClassName="selected" >二级选项</Link>
					<h2>
						<span>二级菜单选项</span>
						<a href="javascript:;">三级选项</a>
						<a href="javascript:;">三级选项</a>
						<a href="javascript:;">三级选项</a>
					</h2>
				</h1>
				<h1>
					<span><Icon fixed={true} type="heart" />Second Item</span>
					<Link to="/test" activeClassName="selected"><Icon fixed={true} type="bell" />有图标的二级选项</Link>
					<a href="javascript:;">二级选项</a>
					<a href="javascript:;">二级选项</a>
				</h1>
				<h1>
					<span><Icon fixed={true} type="music" />Third Item</span>
					<h2>
						<span>二级菜单选项</span>
						<a href="javascript:;">三级选项</a>
						<a href="javascript:;">三级选项</a>
						<a href="javascript:;">三级选项</a>
					</h2>
					<a href="javascript:;">二级选项</a>
					<a href="javascript:;">二级选项</a>
				</h1>
				<Button size="lg" style={{margin: '20px'}} theme="info" onClick={this.toggleSidebar}>Click!!!</Button>
			</Sidebar>
		);
	}
}

const mapStateToProps = (state) => {
	return {store: state.sidebar};
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(SidebarActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tmp);

Tmp.propTypes = {
	store: PropTypes.object,
	actions: PropTypes.object,
	children: PropTypes.any
};