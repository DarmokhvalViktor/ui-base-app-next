import {REQUEST_CARS, RECEIVE_CARS, CARS_ERROR, DELETE_CAR } from "../../../app/constants/actionTypes";

const initialState = {
    isFetchingCars: false,
    cars: [],
};


export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CARS: {
            const cars = action.payload;

            return {
                ...state,
                cars: cars || state.cars,
                isFetchingCars: false,
            };
        }

        case DELETE_CAR: {
            const carId = action.payload;
            return {
                ...state,
                cars: state.cars.filter(car => car.id !== carId),
            };
        }

        case CARS_ERROR: {
            return initialState;
        }

        case REQUEST_CARS: {
            return {
                ...state,
                isFetchingCars: true,
            };
        }

        default: {
            return state;
        }
    }
}
