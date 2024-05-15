import axios from 'misc/requests';
import config from 'config';
import storage, { keys } from 'misc/storage';
import {CARS_ERROR, DELETE_CAR, RECEIVE_CARS, REQUEST_CARS} from "../../../app/constants/actionTypes";

const receiveCars = (cars) => ({
    payload: cars,
    type: RECEIVE_CARS,
});

const requestCars = () => ({
    type: REQUEST_CARS,
});

const error = () => ({
    type: CARS_ERROR,
});
const deleteCarSuccess = (id) => ({
    type: DELETE_CAR,
    payload: id,
});

const getCars = () => {
    const {
        CARS_SERVICE,
    } = config;
    console.log("Sending request to cars")
    return axios.post(`${CARS_SERVICE}/api/cars/_list`);
};
const deleteCar = (id) => (dispatch) => {
    const { CARS_SERVICE } = config;
    return axios.delete(`${CARS_SERVICE}/api/cars/${id}`)
        .then(() => {
            dispatch(deleteCarSuccess(id));
        })
        .catch(() => {
            dispatch(error());
        });
};

const carsError = () => (dispatch) => {
    dispatch(error());
};

const fetchCars = () => (dispatch) => {
    if (!storage.getItem(keys.TOKEN)) {
        return null;
    }
    dispatch(requestCars());
    return getCars()
        // TODO Mocked '.catch()' section
        .catch((err) => {
            const cars = storage.getItem('CARS');
            if (cars) {
                const parsedCars = JSON.parse(cars);
                return parsedCars;
            }
            return Promise.reject(err);
        })
        .then(cars => {
            console.log(cars)
            dispatch(receiveCars(cars))
        })
        .catch(() => {
            console.log("some error happened")
            dispatch(carsError())
        });
};

const exportFunctions = {
    carsError,
    fetchCars,
    deleteCar
};

export default exportFunctions;