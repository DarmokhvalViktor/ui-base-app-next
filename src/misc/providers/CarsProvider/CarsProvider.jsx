import {createContext} from "react";
import {useSelector} from "react-redux";

export const CarsContext = createContext([]);

const CarsProvider = ({children}) => {
    const cars = useSelector(({cars}) => cars);
    const mappedCars = cars.map(car => ({
        id: car.id,
        model: car.model,
        brand: car.brand,
        ownerName: car.ownerName,
        ownerId: car.ownerId,
    }));

    return (
        <CarsContext.Provider value={mappedCars}>
            {children}
        </CarsContext.Provider>
    )
}
export default CarsProvider