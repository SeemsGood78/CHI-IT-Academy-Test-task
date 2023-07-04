import { useState } from "react";

const AddModal = ({ closeModal, saveChanges }) => {
    const [car, setCar] = useState("");
    const [car_model, setCar_model] = useState("");
    const [car_vin, setCar_vin] = useState("");
    const [car_color, setCar_color] = useState("");
    const [car_model_year, setCar_model_year] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState(false);
  
    const generateRandomId = () => {
        const randomId = Math.random().toString(36).substring(2, 10);
        return randomId;
      };

    const handleAdd = () => {
      const newCar = {
        id: generateRandomId(),
        car,
        car_model,
        car_vin,
        car_color,
        car_model_year,
        price,
        availability,
      };
  
      saveChanges(newCar);
      closeModal();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Add Car</h2>
          <div className="modal-content-form">
            <label>Company</label>
            <input
              type="text"
              value={car}
              onChange={(e) => setCar(e.target.value)}
            />
          </div>
          <div className="modal-content-form">
            <label>Model</label>
            <input
              type="text"
              value={car_model}
              onChange={(e) => setCar_model(e.target.value)}
            />
          </div>
          <div className="modal-content-form">
            <label>VIN</label>
            <input
              type="text"
              value={car_vin}
              onChange={(e) => setCar_vin(e.target.value)}
            />
          </div>
          <div className="modal-content-form">
            <label>Color</label>
            <input
              type="text"
              value={car_color}
              onChange={(e) => setCar_color(e.target.value)}
            />
          </div>
          <div className="modal-content-form">
            <label>Year</label>
            <input
              type="text"
              value={car_model_year}
              onChange={(e) => setCar_model_year(e.target.value)}
            />
          </div>
          <div className="modal-content-form">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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
            <button className="btn btn-save" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddModal
  