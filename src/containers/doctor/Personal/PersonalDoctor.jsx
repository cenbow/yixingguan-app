import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
	Result,
	WhiteSpace,
	Grid, Toast
} from "antd-mobile";

import Qrcode from 'qrcode.react';

import './PersonalDoctor.less'

const grid = [
	{
		icon: 1,
		name: '统计',
		onClick: (el) => el.props.history.push(`/statistics`)

	},
	{
		icon: 2,
		name: '我的助手',
		onClick: (el) => el.props.history.push(`/my-help`)

	},
	{
		icon: 3,
		name: '钱包',
		onClick: (el) => el.props.history.push(`/doctor-wallet`)
	},
	{
		icon: 4,
		name: '工作室',
		onClick: (el) => el.props.history.push('./doctor-detail')
	},
	{
		icon: 5,
		name: '发布图文',
		onClick: (el) => el.props.history.push('/published')
	},
	{
		icon: 6,
		name: '邀请同行',
		onClick: (el) => el.setState({code_show: true})
	}
];

const grid2 = [
	{
		icon: 7,
		name: '统计',
	},
	{
		icon: 8,
		name: '我的助手'
	},
	{
		icon: 9,
		name: '钱包'
	},
	{
		icon: 4,
		name: '申请工作室',
		onClick: (el, is) => {
			if (is === 1) {
				Toast.fail('正在审核中', 1);
				return
			}
			el.props.history.push(`/doctor-complete-information`)
		}
	},
	{
		icon: 10,
		name: '发布图文'
	},
	{
		icon: 11,
		name: '邀请同行'
	}
];

class MyComponent extends Component {
	state = {
		code_show: false,
	};

	render() {
		const {code_show} = this.state;
		const {is_audit, name, avatar} = this.props.user;

		return (
			<div className={'personal-doctor'}>
				<div onClick={() => this.props.history.push('/doctor-detail')}>
					<Result
						img={<img className='avator' src={avatar} alt=""/>}
						title={<p className={'name'}>{name} <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
					/>
				</div>

				<WhiteSpace/>
				<Grid data={is_audit === 2 ? grid : grid2}
							columnNum={3}
							onClick={dataItem => dataItem.onClick ? dataItem.onClick(this, is_audit) : () => {
							}}
							renderItem={dataItem => (
								<div className={'item'}>
									<img className={'icon'} src={require('./img/' + dataItem.icon + '.png')} alt=""/>
									<div style={{color: is_audit === 2 ? '#000' : '#888', fontSize: '14px', marginTop: '12px'}}>
										<span>{dataItem.name}</span>
									</div>
								</div>
							)}
				/>

				{code_show ?
					<div
						className='code'
						onClick={() => this.setState({code_show: false})}
					>
						<Qrcode
							value={'sadasdasdasdsadassa'}
							renderAs='svg'
							size={200}
							bgColor='#FFFFFF'
							fgColor='#68e3c3'
							level='H'
						/>
					</div> : null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
)(MyComponent);
