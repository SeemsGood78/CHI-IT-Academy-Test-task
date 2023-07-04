import { useState } from "react";

const SearchBar = ({ onSearch, setCurrentPage}) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
            setCurrentPage(1);
        }
    };

    return (
        <div className="search">
            <input className="search-input"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default SearchBar;
