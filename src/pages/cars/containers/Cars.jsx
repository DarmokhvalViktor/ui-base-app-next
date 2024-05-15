import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from 'components/Typography';
import {useDispatch, useSelector} from "react-redux";
import actionCars from "../actions/cars";
import Car from "../components/Car";
import CarsBlock from "../components/CarsBlock";

function Cars() {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        componentDidMount: false,
    });

    const {cars: {content: cars}} = useSelector(({cars}) => cars);
    console.log(cars);
    useEffect(() => {
        dispatch(actionCars.fetchCars())
        setState({
            ...state,
            componentDidMount: true
        });
    }, []);

    const handleCarClick = (id) => {
        navigate(`/cars/${id}`);
    };
    const handleCreateCar = () => {
        navigate(`/cars/create`)
    }

    const handleCarDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            dispatch(actionCars.deleteCar(id)).then(() => {
                dispatch(actionCars.fetchCars());
            });
        }
    };

    return (

            <Typography>
                {formatMessage({id: 'title'})}
                <button onClick={() => handleCreateCar()}>Create car</button>
                {state.componentDidMount && cars &&
                    <CarsBlock>
                        {cars.map(car =>
                            <Car
                                key={car.id}
                                onClick={() => handleCarClick(car.id)}
                                onDelete={() => handleCarDelete(car.id)}
                            >
                                <div>
                                    <div>Car id: {car.id}</div>
                                    <div>Car model: {car.model}</div>
                                    <div>Car brand: {car.brand}</div>
                                    <div>Car ownerName: {car.ownerName}</div>
                                    <div>Car ownerId: {car.ownerId}</div>
                                </div>
                            </Car>
                            )}
                    </CarsBlock>
                }
            </Typography>

    );
}

export default Cars;
