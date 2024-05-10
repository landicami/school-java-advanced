import { useState } from "react";

interface SearchCityProps {
    onSearch: (location: string) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass `city` to parent component (App)
        onSearch(city.trim());

        // Clear `city` state
        setCity("");
    }

	const tooFewCharacters = (city.trim().length > 0 && city.trim().length < 3);



    return (
        <>
            <div id="search-wrapper">
                <form onSubmit={handleSubmit} id="search-form">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter city to search for"
                            aria-label="City"
                            aria-details="Search for city to show current weather for."
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                        <button
                            disabled={city.trim().length < 3}
                            type="submit"
                            className="btn btn-success"
                        >
                            🔍
                        </button>
                    </div>

					{tooFewCharacters && <div className="text-danger form-text">Too few charachters, enter 3 or more!</div>}

                </form>
            </div>
        </>
    );
};

export default SearchCity;
