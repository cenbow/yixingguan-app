import {
	reqPatientList,
	reqPatientDetail,
	reqLabelList,
	reqAcceptPatients,
} from "../../api/doctor";

import {
	RECEIVE_PATIENT_LIST,
	RECEIVE_PATIENT_DETAILS,
	RECEIVE_LABEL_LSIT,
	ACCEPT_PATIENT
} from "../action-types";

import {Toast} from "antd-mobile";

const receiveLabelList = labelList => ({type: RECEIVE_LABEL_LSIT, data: labelList});

export const getLabelList = token => {
	return async dispatch => {
		reqLabelList(token)
			.then(
				res => {
					if (res.code === 1) {
						dispatch(receiveLabelList(res.data))
					}
				}
			)
	}
};


const receivePatientList = PatientList => ({type: RECEIVE_PATIENT_LIST, data: PatientList});

export const getPatientList = token => {
	return async dispatch => {
		reqPatientList(token)
			.then(
				res => {
					if (res.code === 1) {
						dispatch(receivePatientList(res.data))
					} else {
						Toast.fail(res.message)
					}
				}
			)
	}
};

const receivePatientDetail = PatientDetail => ({type: RECEIVE_PATIENT_DETAILS, data: PatientDetail});

export const getPatientDetail = patient => {
	return async dispatch => {
		reqPatientDetail(patient).then(
			res => {
				if (res) {
					dispatch(receivePatientDetail(res.data))
				}
			}
		)
	}
};

const acceptPatient = patientState => ({type: ACCEPT_PATIENT, data: patientState});

export const getAcceptPatient = Patient => {
	return async dispatch => {
		reqAcceptPatients(Patient)
			.then(
				res => {
					if (res.code === 1) {
						dispatch(acceptPatient({is_accept: 1,id:Patient.id}))
					}else {
						Toast.fail(res.message,1)
					}
				}
			)
	}
};