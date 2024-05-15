import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import carActions from '../actions/car';

function CarDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const car = useSelector(state => state.car.car);
    const [state, setState] = useState({
        componentDidMount: false,
    });

    useEffect(() => {
        dispatch(carActions.fetchCar(id));
        console.log("component did mount")
        setState({
            ...state,
            componentDidMount: true
        });
        console.log(state);
        console.log(car)
    }, [dispatch, id]);

    return (
        <div>
            <h1>Car Detail</h1>
            {car ? (
                <div>
                    <div>Car id: {car.id}</div>
                    <div>Car model name: {car.modelDTO.modelName}</div>
                    <div>Car model id: {car.modelDTO.id}</div>
                    <div>Car brand name: {car.brandDTO.brandName}</div>
                    <div>Car brand id: {car.brandDTO.id}</div>
                    <div>Was in accident: {car.wasInAccident ? "yes" : "no"}</div>
                    <div>Year of release: {car.yearOfRelease}</div>
                    <div>Mileage: {car.mileage}</div>
                    <div>Owner:
                        <div>Owner name: {car.ownerDTO.name}</div>
                        <div>Owner id: {car.ownerDTO.id}</div>
                        <div>Owner email: {car.ownerDTO.email}</div>
                        <div>Owner lastname: {car.ownerDTO.lastname}</div>
                    </div>
                    <div>Accessories:
                        {car.accessoryDTOList.map(accessory =>
                            <div>
                                <div>accessory name: {accessory.accessoryName}</div>
                                <div>accessory id: {accessory.id}</div>
                            </div>)}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default CarDetail;