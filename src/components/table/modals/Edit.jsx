import React, { useState } from "react";

const EditModal = ({ car, closeModal, saveChanges }) => {
    const [color, setColor] = useState(car.car_color);
    const [price, setPrice] = useState(car.price);
    const [availability, setAvailability] = useState(car.availability);

    const handleEdit = () => {
        const updatedCar = {
            ...car,
            car_color: color,
            price: price,
            availability: availability,
        };
        saveChanges(updatedCar);
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Car</h2>
                <div className="modal-content-form">
                    <label>Company</label>
                    <input type="text" value={car.car} disabled />
                </div>
                <div className="modal-content-form">
                    <label>Model</label>
                    <input type="text" value={car.car_model} disabled />
                </div>
                <div className="modal-content-form">
                    <label>VIN</label>
                    <input type="text" value={car.car_vin} disabled />
                </div>
                <div className="modal-content-form">
                    <label>Color</label>
                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="modal-content-form">
                    <label>Year</label>
                    <input type="text" value={car.car_model_year} disabled />
                </div>
                <div className="modal-content-form">
                    <label>Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="modal-content-form">
                    <label>Availability</label>
                    <input
                        type="checkbox"
                        checked={availability}
                        onChange={(e) => setAvailability(e.target.checked)}
                    />
                </div>
                <div className="modal-content-buttons">
                    <button className="btn btn-cancel" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className="btn btn-save" onClick={handleEdit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;