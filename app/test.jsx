import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SidebarActions from './actions/SidebarAction';

//import 'whatwg-fetch';

import Icon from './components/Icon';
import Button from './components/Button';
import Modal from './components/Modal';

export default class Test extends Component {
	constructor (props) {
	    super(props);
	    this.toggleModal = this.toggleModal.bind(this);
	}
	componentWillMount() {
		this.router = this.context.router;
	}
	componentDidMount(){
	}
	toggleModal(){
		this.modal.toggle(true);
	}
	render() {
		let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			theme: 'info',
			size: 'sm',
			role: 'alert',
			top: 100,
			noMask: false,
			// onCancel: () => this.router.replace('/'),
			// onConfirm: () => this.router.replace('/test')
		};
		let calendar = this.props.store.calendar[0];
		let str = '';
		if(calendar && calendar.year){
			str = '你选中的时间为 ' + calendar.year + '-' + (+calendar.month+1) + '-' + calendar.day;
		}
		else {
			str = 'Excuse me ?';
		}
		let { displaySidebar } = this.props.actions;
		return (
			<div>
				<span>{ this.props.children }</span>
				<Button size="lg" style={{margin: '20px'}} theme="info" onClick={this.toggleModal}>Click Me!!!</Button>
				<Button size="lg" style={{margin: '20px 0'}} theme="success" onClick={displaySidebar}>Open Sidebar!!!</Button>
				<Modal {...modalProps}>
					<Modal.Header>
						<h2><Icon type="exclamation-circle" size="2x" />我是模态框头部.</h2>
					</Modal.Header>
					<Modal.Body>
						<p>{ str }</p>
					</Modal.Body>
					<Modal.Footer>
						<Button theme="info" onClick={() => this.modal.confirm()}>Sure</Button>
						<Button onClick={() => this.modal.cancel()}>Nope</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {store: state};
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(SidebarActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);

Test.propTypes = {
  children: PropTypes.any,
  actions: PropTypes.any,
  history: PropTypes.object,
  store: PropTypes.any
};

Test.contextTypes = {
  router: PropTypes.object.isRequired
};