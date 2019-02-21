import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMain from '../HeaderMain/HeaderMain'
import './MyHelper.less'

class myHelper extends Component {
    render() {
    		const arr = [0,1,2]

        return (
            <div>
                <HeaderMain title='我的助手' isAdd/>
								<div className='helpBox'>
									{arr.map((index) =>{
										return (
											<div key={index}>
												<div>
													<img alt='' src='http://hbimg.b0.upaiyun.com/67ff9abc06fccb83a33ea83ad261b58687a1177e1855e-WdQOs0_fw658' />
													<span>x</span>
												</div>
												<p>朱小鱼</p>
											</div>
										)
									})}
								</div>

								<div className='helpWarn'>
									<p>我的助手：</p>
									<span>我的助手可以在您不同微信上对患者进行解答 您的学员可扫描二维码添加，为患者提供建议性解答</span>
								</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(myHelper);
