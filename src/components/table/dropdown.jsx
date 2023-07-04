import React, { useState } from "react";

const Dropdown = ({ options, onSelect, car }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option, car);
    setIsOpen(false);
  };

  return (
    <td className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Actions
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="dropdown-menu-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </td>
  );
};

export default Dropdown;

