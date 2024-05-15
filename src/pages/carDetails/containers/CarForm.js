import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import carActions from "../actions/car";
import {useNavigate} from "react-router-dom";

function CarForm({ onClose }) {
    const [formData, setFormData] = useState({
        modelId: '',
        brandId: '',
        ownerId: '',
        yearOfRelease: '',
        mileage: '',
        wasInAccident: false,
        accessoriesIds: Array(2).fill(''),
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChange = (e, index) => {
        const { name, value, type} = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, [name]: value === 'true' ? true : false });
            }
        else if (['modelId', 'brandId', 'ownerId', 'yearOfRelease', 'mileage', 'accessoryName'].includes(name)) {
            setFormData({ ...formData, [name]: value });
        } else {
            const newAccessoriesIds = [...formData.accessoriesIds];
            newAccessoriesIds[index] = value;
            setFormData({ ...formData, accessoriesIds: newAccessoriesIds });
        }
    };

    const handleAddAccessory = () => {
        if (formData.accessoriesIds.length < 10) {
            setFormData({ ...formData, accessoriesIds: [...formData.accessoriesIds, ''] });
        }
    };

    const handleRemoveAccessory = (index) => {
        const newAccessoriesIds = formData.accessoriesIds.filter((_, i) => i !== index);
        setFormData({ ...formData, accessoriesIds: newAccessoriesIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await dispatch(carActions.saveCar(formData));
            window.alert("Car successfully created!")
            navigate("/cars")
            onClose();
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    const validateFormData = (data) => {
        const errors = {};

        if (!data.modelId || !data.brandId || !data.ownerId || !data.yearOfRelease || !data.mileage) {
            errors.requiredFields = 'All fields are required';
        }
        if (data.yearOfRelease < 1970) {
            errors.yearOfRelease = 'Release year must be 1970 or later';
        }
        if (data.mileage <= 0) {
            errors.mileage = 'Mileage must be a positive number';
        }

        if (data.accessoriesIds.length < 2) {
            errors.accessoriesIds = 'List must contain at least 2 items';
        }
        data.accessoriesIds.forEach((id, index) => {
            if (!id) {
                errors[`accessory${index}Id`] = 'Accessory ID is required';
            }
        });

        return errors;
    };

    return (
        <div>
            <h2>Create New Car</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <input type="number" name="modelId" value={formData.modelId} onChange={(e) => handleChange(e, 0)}
                       placeholder="Model ID" required/>
                {errors.modelId && <div className="error">{errors.modelId}</div>}
                <input type="number" name="brandId" value={formData.brandId} onChange={(e) => handleChange(e, 1)}
                       placeholder="Brand ID" required/>
                {errors.brandId && <div className="error">{errors.brandId}</div>}
                <input type="number" name="ownerId" value={formData.ownerId}
                       onChange={(e) => setFormData({...formData, ownerId: e.target.value})} placeholder="Owner ID"
                       required/>
                {errors.ownerId && <div className="error">{errors.ownerId}</div>}
                <input type="number" name="yearOfRelease" value={formData.yearOfRelease}
                       onChange={(e) => setFormData({...formData, yearOfRelease: e.target.value})}
                       placeholder="Year of Release" required/>
                {errors.yearOfRelease && <div className="error">{errors.yearOfRelease}</div>}
                <input type="number" name="mileage" value={formData.mileage}
                       onChange={(e) => setFormData({...formData, mileage: e.target.value})} placeholder="Mileage"
                       required/>
                {errors.mileage && <div className="error">{errors.mileage}</div>}
                <label>
                    Was in accident:
                    <input
                        type="radio"
                        name="wasInAccident"
                        value="true"
                        checked={formData.wasInAccident === true}
                        onChange={(e) => setFormData({...formData, wasInAccident: e.target.value === 'true'})}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="wasInAccident"
                        value="false"
                        checked={formData.wasInAccident === false}
                        onChange={(e) => setFormData({...formData, wasInAccident: e.target.value === 'true'})}
                    />
                    No
                </label>
                {formData.accessoriesIds.map((accessoryId, index) => (
                    <div key={index}>
                    <input type="text" value={accessoryId} onChange={(e) => handleChange(e, index)}
                               placeholder={`Accessory ${index + 1}`}/>
                        {errors[`accessory${index}Id`] && <div className="error">{errors[`accessory${index}Id`]}</div>}
                        {index > 0 &&
                            <button type="button" onClick={() => handleRemoveAccessory(index)}>Remove</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddAccessory}>Add Accessory</button>

                <button type="submit">Save</button>
            </form>
            {errors.requiredFields && <div className="error">{errors.requiredFields}</div>}
            {errors.accessoriesIds && <div className="error">{errors.accessoriesIds}</div>}

        </div>
    );
}

export default CarForm;