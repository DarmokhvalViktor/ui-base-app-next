import axios from 'misc/requests';
import config from 'config';
import { CAR_ERROR, SAVE_CAR, RECEIVE_CAR, REQUEST_CAR } from "../../../app/constants/actionTypes";

const receiveCar = (car) => ({
    payload: car,
    type: RECEIVE_CAR,
});

const requestCar = () => ({
    type: REQUEST_CAR,
});

const carError = () => ({
    type: CAR_ERROR,
});

const getCar = (id) => {
    const { CARS_SERVICE } = config;
    return axios.get(`${CARS_SERVICE}/api/cars/${id}`);
};

const fetchCar = (id) => (dispatch) => {
    dispatch(requestCar());
    return getCar(id)
        .then(response => {
            console.log("receiving car")
            console.log(response)
            dispatch(receiveCar(response));
        })
        .catch(() => {
            console.log("error happened")
            dispatch(carError());
        });
};
const saveCarSuccess = (car) => ({
    type: SAVE_CAR,
    payload: car,
});

const saveCar = (formData) => async (dispatch) => {
    const { CARS_SERVICE } = config;
    dispatch(requestCar());
    try {
        const response = await axios.post(`${CARS_SERVICE}/api/cars`, formData);
        dispatch(saveCarSuccess(response.data));
    } catch (error) {
        console.error('Error creating car:', error);
        dispatch(carError());
        throw error;
    }
};

export default {
    fetchCar,
    carError,
    saveCar
};