import {commonRoute} from "./common";

import DoctorIndex from "../containers/Index/DoctorIndex";
import PersonalDoctor from "../containers/Personal/PersonalDoctor";
import NewPatient from "../containers/NewPatient/NewPatient";
import DoctorCompleteInformation from "../containers/CompleteInformation/DoctorCompleteInformation";
import DoctorDetail from "../containers/Detail/DoctorDetail";
import DoctorWallet from "../containers/Wallet/DoctorWallet";
import PatientDetail from "../containers/Detail/PatientDetail";
import Statistics from "../containers/Statistics/Statistics";
import MyHelper from "../containers/MyHelper/MyHelper";
import Publish from "../containers/Publish/Publish";
import PublishSelectSort from "../containers/PublishSelectSort/PublishSelectSort";
import PublishPersonSelect from "../containers/PublishPersonSelect/PublishPersonSelect";
import PublishPreview from "../containers/PublishPreview/PublishPreview";
import Published from "../containers/Published/Published";
import PublishDetail from "../containers/PublishDetail/PublishDetail";

export const doctorNav = [
	{
		pathname: '/doctor-index',
		path: '患者',
		isActive: false,
		icon: 'patient-@3x.png',
		selectedIcon: 'patient-s@3x.png',
		component: DoctorIndex,
		show: true
	},
	{
		pathname: '/doctor-personal',
		path: '我的',
		isActive: false,
		icon: 'my.svg',
		selectedIcon: 'my-s.svg',
		component: PersonalDoctor,
		show: true
	}
];

export const doctorRoute = [
	...doctorNav,
	...commonRoute,
	{
		pathname: '/new-patient',
		component: NewPatient
	},
	{
		pathname: '/doctor-complete-information',
		component: DoctorCompleteInformation
	},
	{
		pathname: '/doctor-detail',
		component: DoctorDetail
	},
	{
		pathname: '/doctor-wallet',
		component: DoctorWallet
	},
	{
		pathname: '/patient-detail/:patientId',
		component: PatientDetail
	},
	{
		pathname: '/statistics',
		component: Statistics
	},
	{
		pathname: '/my-help',
		component: MyHelper
	},
	{
		pathname: '/publish',
		component: Publish
	},
	{
		pathname: '/published',
		component: Published
	},
	{
		pathname: '/publish-select-sort',
		component: PublishSelectSort
	},
	{
		pathname:'/publish-person-select/:label_id',
		component:PublishPersonSelect
	},
	{
		pathname:'/publish-preview',
		component:PublishPreview
	},
	{
		pathname:'/publish-detail/:article_id',
		component:PublishDetail
	}
];
