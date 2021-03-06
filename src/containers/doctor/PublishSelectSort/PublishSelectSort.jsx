import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, WhiteSpace, List, Modal} from "antd-mobile";
import './PublishSelectSort.less'

import {allCanSee} from "../../../redux/publish/action";

const Item = List.Item;

class PublishSelectSort extends Component {
	all = () => {
		this.props.allCanSee()
	};

	render() {
		const {is_open, allow_users} = this.props.whoCanSee;
		const {labelList} = this.props;
		const labels = labelList.map(label => {
			if (label.label_name) {return {label_name: label.label_name, id: label.id}} else {return {label_name: null, id: null}}
		});

		console.log(allow_users);


		return (
			<div className='publish-select-sort'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div
						className={'button'}
						onClick={() => this.props.history.goBack()}
					>完成</div>}
				>谁可以看</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<Item
						thumb={<img src={require(is_open === 1 ? './img/gongkai@3x.png' : './img/gongkai未选择@3x.png')} alt=""/>}
						extra={<span className={is_open === 1 ? 'is_open' : null}>所有患者可看</span>}
						onClick={() => is_open === 1 ? null : Modal.alert('', '此次编辑将清空一下所有分类，是否保留？？？', [
							{text: '不保留', onPress: () => this.props.history.goBack()},
							{text: '保留', onPress: () => this.all()},
						])}
						multipleLine
					>
						<span className={is_open ? 'is_open' : null}>公开</span>
					</Item>
				</List>

				<WhiteSpace/>
				{
					labels.map((label, index) =>

						<List
							key={index}
						>
							<Item
								thumb={<img src={require('./img/fenzu@3x.png')} alt=""/>}
								extra={allow_users.filter(patient => patient.label === label.label_name).length ?
									allow_users.filter(patient => patient.label === label.label_name)[0].names.map(item =>
										<span key={item} className={allow_users.filter(patient => patient.label === label.label_name).length ? 'is_open' : null}>{item}</span>
									) : null}
								multipleLine
								disabled={is_open}
								arrow={'horizontal'}
								onClick={() => this.props.history.push('/publish-person-select/' + label.id)}
							>
								<span className={allow_users.filter(patient => patient.label === label.label_name).length ? 'is_open' : null}>	{label.label_name}</span>
							</Item>
						</List>)
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		labelList: state.labelList,
		whoCanSee: state.whoCanSee
	};
}

export default connect(
	mapStateToProps,
	{
		allCanSee
	}
)(PublishSelectSort);

