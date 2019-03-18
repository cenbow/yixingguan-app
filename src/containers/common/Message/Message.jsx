import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, InputItem} from "antd-mobile";

import {sendRoomText} from "../../../redux/chat/action";
import {reqChatUserInfo} from "../../../api";

import './Message.less';

class Message extends Component {
	state = {
		inputType: 'input',
		input: '',
		menuShow: false
	};

	componentDidMount() {
		const id = this.props.match.params.to;
		reqChatUserInfo(id)
			.then(
				res=>{
					console.log(res);
				}
			)
	}

	sendMessage(e, username) {
		const {input} = this.state;
		if (e.key !== 'Enter' || e.keyCode !== 13 || !input) {
			return
		}
		const id = this.props.match.params.to;
		this.setState({input: ''});
		this.props.sendRoomText(input, id, username);
	}

	changeInputType = (inputType) => {
		console.log(inputType);
		this.setState(
			{
				inputType: inputType === 'input' ? 'speak' : 'input'
			})
	};

	handleChange = (name, val) => {
		this.setState(
			{
				[name]: val
			}
		)
	};

	showKeyboard = () => {
		window.scrollTo(0, document.body.scrollHeight);
		this.setState({
			menuShow: false
		})
	};

	render() {
		const {input, inputType, menuShow} = this.state;
		const {identity} = this.props.user;
		const {username} = this.props.user;
		const {chatMsg} = this.props;
		const msg = chatMsg.filter(chat => chat.chat_room === this.props.match.params.to);

		return (
			<div className={'message'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>{this.props.match.params.to}</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*聊天内容*/}
				<div className={'chat'}>
					{msg.map(chat =>
						<div key={chat.time}>
							<div className={username === chat.username ? 'to' : 'from'}>
								<img src={require('./img/biaoqing@3x.png')} alt=""/><span>{chat.message}</span>
							</div>
							<WhiteSpace/>
						</div>
					)}
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*打赏*/}
				<div className={'bottom-input'}>
					{identity === 'patient' ?
						<div className={'tip'}
								 onClick={() => this.props.history.push('/tips/' + this.props.match.params.to)}
						>
							<img src={require('./img/分组@3x.png')} alt=""/>
						</div>
						: null
					}

					{/*输入框*/}
					<div className={'speak-input-wrap'}>
						<div className={'voice'}>

							<img
								src={require('./img/jianpan-@3x.png')}
								onClick={() => this.changeInputType(inputType)}
								alt=""/>
							{
								inputType === 'input' ? <div style={{width: '70%'}}>
										<InputItem
											placeholder={'请输入...'}
											onChange={val => this.handleChange('input', val)}
											onFocus={this.showKeyboard}
											onBlur={this.showKeyboard}
											onKeyDown={e => this.sendMessage(e, username)}
											value={input}
										/>
									</div> :
									< div className={'speak'}>
										按住说话
									</div>
							}
							<img src={require('./img/biaoqing@3x.png')} alt=""/>
							<img src={require('./img/tianjia-3@3x.png')}
									 onClick={() => this.setState({menuShow: !menuShow})}
									 alt=""/>
						</div>

						{/*弹出框*/}
						<div className={'alert'} style={{height: menuShow ? 110 : 0}}>
							<img src={require('./img/拍照@3x.png')} alt=""/>
							<img src={require('./img/相册@3x.png')} alt=""/>
						</div>


					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		chatMsg: state.chatMsg
	};
}

export default connect(
	mapStateToProps,
	{
		sendRoomText
	}
)(Message);
