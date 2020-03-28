import axios from 'axios';

const URLS = {
    DISTRICT_WISE_DATA: 'https://api.covid19india.org/state_district_wise.json',
    MAIN_DATA: 'https://api.covid19india.org/data.json',
    PATIENT_DATA: 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org',
}

const api = {
    getDistrictWiseData: () => axios.get(URLS.DISTRICT_WISE_DATA),
    getMainData: () => axios.get(URLS.MAIN_DATA),
    getPatientData: () => axios.get(URLS.PATIENT_DATA),
}

export default api;
