import React, { useEffect, useState } from "react"
import Pagination from "./footer"
import SearchBar from "./header";
import Dropdown from "./dropdown"
import EditModal from "./modals/Edit";
import DeleteModal from "./modals/Delete";
import AddModal from "./modals/AddCar";

const itemsPerPage = 16;
const options = ["Edit", "Delete"];

export const Table = () => {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const handleOptionSelect = (option, car) => {

        if (option === "Edit") {
            setEditModalOpen(true);
            setSelectedCar(car);
        } else if (option === "Delete") {
            setDeleteModalOpen(true);
            setSelectedCar(car);
        }
    };

    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("cars"));
        console.log(storedCars);
        if (storedCars) {
            setCars(storedCars);
        } else {
            fetch("https://myfakeapi.com/api/cars/")
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("cars", JSON.stringify(data))
                    setCars(data)
                })
        };
    }, []);

    const carArrays = Object.values(cars ?? {}).flat();

    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = carArrays.slice(indexOfFirstCar, indexOfLastCar);

    const filteredCarsArray = carArrays.filter((car) =>
        (car.car?.toLowerCase() ?? '').includes(search?.toLowerCase() ?? '') ||
        (car.car_model?.toLowerCase() ?? '').includes(search?.toLowerCase() ?? '') ||
        (car.car_vin?.toLowerCase() ?? '').includes(search?.toLowerCase() ?? '') ||
        (car.car_color?.toLowerCase() ?? '').includes(search?.toLowerCase() ?? '') ||
        (car.car_model_year?.toString() ?? '').includes(search?.toLowerCase() ?? '') ||
        (car.price?.toString() ?? '').includes(search?.toLowerCase() ?? '')
    );

    const currentFiltredCars = filteredCarsArray.slice(indexOfFirstCar, indexOfLastCar);
    const filteredCars = search ? currentFiltredCars : currentCars;

    const totalCars = search ? filteredCarsArray.length : carArrays.length;

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = (carId) => {
        const updatedCars = carArrays.filter((car) => car.id !== carId);
        setCars(updatedCars);
        localStorage.setItem("cars", JSON.stringify(updatedCars));
    };

    const saveChanges = (updatedCar) => {
        const updatedCars = carArrays.map((car) => {
            if (car.id === updatedCar.id) {
                return updatedCar;
            }
            return car;
        });
        setCars(updatedCars);
        localStorage.setItem("cars", JSON.stringify(updatedCars));
    };

    const openAddModal = () => {
        setAddModalOpen(true);
    };

    const saveCarChanges = (updatedCar) => {
        const updatedCars = [...carArrays];
        const index = updatedCars.findIndex((car) => car.id === updatedCar.id);
        index !== -1 ? updatedCars[index] = updatedCar : updatedCars.unshift(updatedCar);
        setCars(updatedCars);
        localStorage.setItem("cars", JSON.stringify(updatedCars));
    };

    return (
        <div className="wrapper">
            <SearchBar onSearch={setSearch} setCurrentPage={setCurrentPage} />
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Company</th>
                        <th>Model</th>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.map((car, index) => (
                        <tr key={car.id}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{car.car}</td>
                            <td>{car.car_model}</td>
                            <td>{car.car_vin}</td>
                            <td>{car.car_color}</td>
                            <td>{car.car_model_year}</td>
                            <td>{car.price}</td>
                            <td>{car.availability.toString()}</td>
                            <Dropdown options={options} onSelect={handleOptionSelect} car={car} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="separate">
                <Pagination
                    currentPage={currentPage}
                    total={totalCars}
                    limit={itemsPerPage}
                    onPageChange={onPageChange}
                />
                <button onClick={openAddModal} className="add-btn">
                    Add Car
                </button>
            </div>
            {addModalOpen && (
                <AddModal closeModal={() => setAddModalOpen(false)} saveChanges={saveCarChanges} />
            )}
            {editModalOpen && (
                <EditModal car={selectedCar} closeModal={() => setEditModalOpen(false)} saveChanges={saveChanges} />
            )}
            {deleteModalOpen && (
                <DeleteModal car={selectedCar} closeModal={() => setDeleteModalOpen(false)} onDelete={handleDelete} />
            )}
        </div>
    );
};