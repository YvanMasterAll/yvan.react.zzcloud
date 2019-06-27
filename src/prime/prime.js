import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fa'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch';
import './prime.css';

//Class Prime
class Prime extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			refreshing: true,
			data: []
		}
	}
	onRefresh() {
		//防止重复提交
		if(this.state.refreshing)
		{
			return;
		}
		this.fetchData();
		this.setState({
			refreshing: true
		})
	}
	fetchData() {
		let e = this;
		//fetch('//offline-news-api.herokuapp.com/stories',
		let postData = "op=getactivities";
		fetch('http://localhost:9090',{
			method: 'POST',
		    mode: 'cors',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    body: postData
		    //body: JSON.stringify(postData)
		})
	    .then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
	        return response.json()
	    })
	    .then(function(activities) {
	    	e.setState({
				refreshing: false,
				data: activities
	    	})
	    }).catch(function(error){
	    	console.log(error)
	    });
	}
	componentWillMount() {
		this.fetchData();
	}
	render() {
		const {refreshing} = this.state;
		const activities = [
			{
				timestamp: new Date().getTime(),
				text: "Ate lunch",
				user: {
					id: 1, name: "Nate", avatar: "./asserts/images/Nate.png"
				},
				comments: [
					{
						from: "Ali", text: "Me too!"
					}
				]
			},
			{
				timestamp: new Date().getTime(),
				text: "Woke up early for a beautiful run",
				user: {
					id: 2, name: "Ali", avatar: "./asserts/images/Ali.png"
				},
				comments: [
					{
						from: "Nate", text: "I am so jealous!"
					}
				]
			}
		];
		return (
			<div className="box box-prime">
				<TitleBar title="TimeLine" />
				<Content refreshRequest={refreshing} activities={this.state.data} />
				<Clock title="Clock" />
				<Refresh refresh={this.onRefresh.bind(this)} />
			</div>
		);
	}
}

//Class TitleBar
class TitleBar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '',
			searchVisible: false
		}
	}
	showSearch() {
		this.setState({
			searchVisible: !this.state.searchVisible
		});
	}
	updateValue(evt) {
		this.setState({
			value: evt.target.value
		})
	}
	render() {	
		let searchInputClasses = ["input", "input-search"];
		if(this.state.searchVisible)
		{
			searchInputClasses.push("active");
		}
		return (
			<div className="prime-titlebar">
				<div className="menu"><FontAwesome name="navicon" className="fa-md"/></div>
				<div className="title">{this.props.title}</div>
				<SearchBar searchVisible={this.state.searchVisible} showSearch={this.showSearch.bind(this)} updateValue={this.updateValue.bind(this)} />
			</div>
		);
	}
}
TitleBar.propTypes = {
	title: PropTypes.string
}

//Class SearchBar
class SearchBar extends React.Component {
	submitForm(evt) {
		evt.preventDefault(); //阻止默认的表单提交
	}
	render() {	
		let searchInputClasses = ["input", "input-search"];
		if(this.props.searchVisible)
		{
			searchInputClasses.push("active");
		}
		return (
			<div className="searchbar">
				<form onSubmit={this.submitForm.bind(this)}>
					<div className={searchInputClasses.join(' ')}><input type="text" placeholder="Search ..." onChange={this.props.updateValue} /></div>
					<div className="search" onClick={this.props.showSearch} ><FontAwesome name="search" className="fa-md"/></div>
				</form>
			</div>
		);
	}
}
SearchBar.propTypes = {
	searchVisible: PropTypes.bool,
	showSearch: PropTypes.func,
	updateValue: PropTypes.func
}

//Class Content
class Content extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	activities: []
		// }
	}
	// updateDate() {
	// 	this.setState({
	// 		activities: this.props.data //这里的数据应该从请求里获得
	// 	})
	// }
	// componentWillReceiveProps(nextProps) {
	// 	if(nextProps.refreshRequest !== this.props.refreshRequest && nextProps.refreshRequest === false)
	// 	{
	// 		this.updateDate()
	// 	}
	// }
	render() {
		//const {loading, activities} = this.state;
		const {refreshRequest, activities} = this.props;
		return (
			<div className="prime-content">
			{refreshRequest && <div className="loading"><FontAwesome spin name="spinner" className="fa-md"/></div>}
			{!refreshRequest && activities.map((activity) => {
				return(
					<Dialog key={activity.user.id} activity={activity} />
				)
			})}
			</div>
		);
	}
}
Content.propTypes = {
	activities: PropTypes.array,
	refreshRequest: PropTypes.bool,
	onComponentRefresh: PropTypes.func
}

//Class Dialog
class Dialog extends React.Component {
	render()
	{
		const {activity} = this.props;
		return (
			<div className="dialog">
			{/*	<div className="mark" style={{background: 'url(' + require('' + activity.user.avatar) +  ') no-repeat'}}></div> */}
				<div className="mark" style={{background: `url(${require(`${activity.user.avatar}`)}) no-repeat`}}></div> 
				<div className="content">
					<div className="time">{activity.timestamp}</div>
					<div className="activity">{activity.text}</div>
				</div>
			</div>
		)
	}
}
Dialog.propTypes = {
	activity: PropTypes.object
}

////Class Clock
//Clock's Pure Component
const Hour = (props) => {
	let {hours} = props;
	if ({hours} === 0) { hours = 12; }
	if (props.twelveHours) { hours = hours - 12; }
	return (<span>{hours}</span>)
}
const Minute = ({minutes}) => (<span>{minutes < 10 && '0'}{minutes}</span>)
const Second = ({seconds}) => (<span>{seconds < 10 && '0'}{seconds}</span>)
const Separator = ({separator}) => (<span>{separator || ':'}</span>)
const Ampm = ({hours}) => (<span style={{display: 'inline-block'}, {marginLeft: '10px'}}>{hours >= 12? "pm":"am"}</span>)
//Clock's Time Formatter
const Formatter = ({format, state}) => {
	let children = format.split('').map((e, idx) => {
		if(e === 'h') {
			return <Hour/>
		} else if (e === 'm') {
			return <Minute/>
		} else if (e === 's') {
			return <Second/>
		} else if (e === 'p') {
			return <Ampm />
		} else {
			return <Separator/>
		}
	})

	return (
		<span>
			{React.Children
				.map(children, c => React.cloneElement(c, state))
			}
		</span>
	)
}
//Clock
class Clock extends React.Component {
	constructor(props) {
		super(props); //必须

		this.state = this.getTime();
	}
	getTime() {
		const time = new Date();
		return {
			hours: time.getHours(),
			minutes: time.getMinutes(),
			seconds: time.getSeconds(),
			ampm: time.getHours() >= 12 ? "pm" : "am"
		}
	}
	setTimer() {
		this.timer = setTimeout(this.updateClock.bind(this) ,1000);
	}
	updateClock() {
		this.setState(this.getTime, this.setTimer);
	}
	componentDidMount() {
		this.setTimer()
	}
	componentWiiUnmount() {
		if(this.timer)
		{
			clearTimeout(this.timer)
		}
	}
	render() {
		const { hours, minutes, seconds, ampm } = this.state;
		return (
			// <div className="prime-clock">
			// 	{
			// 		hours === 0 ? 12 :
			// 			(hours > 12) ?
			// 				hours - 12 : hours
			// 	}:{
			// 		minutes > 9 ? minutes : `0${minutes}`
			// 	}:{
			// 		seconds > 9 ? seconds : `0${seconds}`
			// 	} {ampm}
			// </div>
			<div className="prime-clock">
				<Formatter format='h:m:sp' state={this.state} />
			</div>
		)
	}
}
//定义类 Clock 接收的 props 属性类型
Clock.propTypes = {
	name: PropTypes.string,
	count: PropTypes.number,
	isOn: PropTypes.bool,
	onDisplay: PropTypes.func,
	symbol: PropTypes.symbol,
	user: PropTypes.object,
	name: PropTypes.node,

	counts: PropTypes.array,
	users: PropTypes.arrayOf(PropTypes.object),
	alarmColor: PropTypes.oneOf(['red', 'blue']),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),

	basicObject: PropTypes.object,
	numbers: PropTypes.objectOf(PropTypes.numbers),
	messages: PropTypes.instanceOf(Dialog),
	contactList: PropTypes.shape({
		name: PropTypes.string,
		phone: PropTypes.string
	}),

	displayEle: PropTypes.element,

	title: PropTypes.string.isRequired,

	// userWithName: (props, propName, componentName) => {
	// 	if (!props[propName] || !props[propName].name) {
	// 		return new Error(
	// 			`Invalid ${propName}: No name property defined for component ${componentName}`
	// 		)
	// 	}
	// },
	// usersWithNames: React.PropTypes.arrayOf((props, proName, componentName) => {
	// 	if (!props[propName] || !props[propName].name) {
	// 		return new Error(
	// 			`Invalid ${propName}: No name property defined for component ${componentName}`
	// 		)
	// 	}
	// })
}
//默认值
Clock.defaultProps = {
	isOn: true,
	title: ""
}

//Class Refresh
//刷新组件
class Refresh extends React.Component {
	render() {
		const {refresh} = this.props;
		return (
			<div className="prime-refresh">
				<div className="refresh unselectable" onClick={refresh}>
					<FontAwesome name="refresh" className="fa-md"/>
					<span>Refresh</span>
				</div>
			</div>
		)
	}
}
Refresh.propTypes = {
	refresh: PropTypes.func
}

export default Prime;