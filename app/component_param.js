/*
 * 按钮组件
 */
<Button
	onClick={fn}
	theme="info"	//default 'default' [success, warning, error, info, primary]
	once={true}		//是否一次性按钮
	size="lg"       //[lg, xs, sm]
	type="button"	//default button [button, submit, reset]
	disabled={false} //default false
	show="block"	//default inline-block [hidden => visibility] [other => display]
	align="middle"  // [middle, left, center, right]
	className="btn"
	style={{padding: "10px"}}>

	<Icon
	type="spinner"
	rotate={true}   // default true [旋转和翻转 => 90, 180, 270, horizontal, vertical]
	style={{marginRight: "5px"}}
	className={"diy-icon"}	//自定义类名
	size="lg"		// [ lg(增大 33%), 2x, 3x, 4x, 5x ]
	/>

	I'm Button</Button>


/*
 * Grid组件
 */
<Grid className="header">
	<div xs="100" sm="40" md="100" lg="100" xsOffset... style. className>

	</div>
</Grid>


/*
 * 侧边栏组件
 */
<Sidebar
	width={280}
	className="left"
	position='fixed-left‘
	mode="horizontal"  //default verticality
	multiple={false}
	only={true}
	onChange={this.changeItem}
	canCancel={true}
>

{/*   children-start   */}
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
<Link to="/href">Four Item</Link>
{/*   children-end   */}
</Sidebar>


/*
 * 日历组件
 */
<Calendar
	sign={0}
	Selectclose={true}
	onClose={() => closeDate(0)}
	onSelectDate={(date, sign) => setDate(date, sign)}
	/>

/*
 * 模态框组件
 */
let modalProps = {
			key: 'modal',
			ref: (ref) => this.modal = ref,
			role: 'alert',	//modal
			theme: 'info',  // [success,info,success,error,warning,primary]
			noMask: true, //default false
			size: 'xs',	//default md
			width: 100, //default auto
			top: 100,	//default center
			left: 100,  //default center
			style: {color: '#399BDC'},
			animateEnter: 'zoomIn',
			animateLeave: 'zoomOut',
			onCancel: () => console.log('cancel'),
			onConfirm: () => console.log('confirm')
		}

		<Modal {...modalProps}>
			<Modal.Header>
				<h3><Icon size="2x" type="warning" />This is Header.</h3>
			</Modal.Header>
			<Modal.Body>
				{
				//<p style={{textAlign: 'center', fontSize: '14px'}}>Placerat ut egestas nunc massa tortor velit nascetur placerat tortor placerat scelerisque velit nisi? Mid nec sed ac in lundium. Urna nisi nisi urna? Dignissim montes duis, porta. Placerat penatibus ridiculus lorem vut! Cursus nunc mus? Porta turpis. Dolor! Mus eu urna, nisi integer, lacus! Nisi sed ac mus cum a elit mauris nunc! Tristique ridiculus et? Sit lectus vel! In porttitor scelerisque odio nisi sed, est odio et tincidunt? Nunc adipiscing? Nec, proin, adipiscing nascetur sit tristique? Porta dapibus augue ac, etiam tortor! Adipiscing ultrices lectus placerat, adipiscing lorem. Rhoncus, in enim! Elementum lundium. Elementum! Auctor est eros a turpis mid facilisis aliquam, eros dapibus adipiscing scelerisque, eu elementum, vel cras, in in, adipiscing, vel ultricies arcu, eu amet.</p>
				}
				<p>Are you 确定？</p>
			</Modal.Body>
			<Modal.Footer>
				<Button theme="info" onClick={() => this.modal.confirm()}>确定</Button>
			</Modal.Footer>
		</Modal>