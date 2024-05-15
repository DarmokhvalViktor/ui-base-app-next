import {useContext} from "react";
import {CarsContext} from "../providers/CarsProvider";

const useCars = () => useContext(CarsContext);

export default useCars;