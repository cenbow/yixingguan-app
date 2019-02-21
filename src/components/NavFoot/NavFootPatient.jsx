import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import './nav-foot.less'

class NavFootPatient extends PureComponent {

	static propTypes = {
		navs: PropTypes.array.isRequired
	};

	render() {
		const {navs} = this.props;

		navs.forEach(nav => nav.isActive = this.props.location.pathname === nav.pathname);
		return (
			<div>
				<div className={'white-space'}>{null}</div>
				<div className="nav-foot">

					{
						navs.map(nav =>
								<span
									className={nav.isActive ? 'active' : null}
									key={nav.pathname}
									onClick={() => this.props.history.replace(nav.pathname)}
								>
						 <img src={require(`./img/${nav.selectedIcon}`)} alt='' style={{display: nav.isActive ? 'block' : 'none'}}/>
									<img src={require(`./img/${nav.icon}`)} alt='' style={{display: nav.isActive ? 'none' : 'block'}}/>
									{nav.path}
						</span>
						)
					}
				</div>
			</div>
		);
	}
}

export default withRouter(NavFootPatient);