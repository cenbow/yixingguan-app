import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import {getRedirectTo} from "../../utils";

import {patientNav, patientRoute} from '../../router/patient'

import {doctorNav, doctorRoute} from "../../router/doctor";

class Main extends Component {
	state = {
		type: 'doctor'
	};

	navs = patientNav;

	doctorNav = doctorNav;

	patientRoute = patientRoute;

	doctorRoute = doctorRoute;

	render() {
		const {identity, phone} = this.props.user;
		const route = identity === 'patient' ? this.patientRoute : this.doctorRoute;

		if (!phone) {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		if (this.props.location.pathname === '/') {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		return (
			<div>
				<Switch>
					{
						route.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route component={NotFound}/>
				</Switch>
				{
					identity === 'patient' ?
						this.navs.some(nav => nav.pathname === this.props.location.pathname) ? <NavFootPatient navs={this.navs}/> : null
						: this.doctorNav.some(nav => nav.pathname === this.props.location.pathname) ? < NavFootDoc doctorNav={this.doctorNav}/> : null
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
)(Main);

