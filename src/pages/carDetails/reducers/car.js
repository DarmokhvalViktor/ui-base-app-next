import { REQUEST_CAR, RECEIVE_CAR, CAR_ERROR } from "../../../app/constants/actionTypes";

const initialState = {
    isFetchingCar: false,
    car: null,
};

export default function carReducer(state = initialState, action) {
    console.log("actions in reducer", action)
    switch (action.type) {
        case RECEIVE_CAR:
            console.log("receiving data", action.payload)
            return {
                ...state,
                car: action.payload,
                isFetchingCar: false,
            };

        case CAR_ERROR:
            return initialState;

        case REQUEST_CAR:
            return {
                ...state,
                isFetchingCar: true,
            };

        default:
            return state;
    }
}