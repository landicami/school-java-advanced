
interface CityProps {
	handleFormSubmit: (e: React.FormEvent) => Promise<void>;
	inputValue: string;
	setInputValue:  React.Dispatch<React.SetStateAction<string>>;
}
const SearchCity: React.FC<CityProps> = ({ handleFormSubmit, inputValue, setInputValue }) => {

	return (

		<div id="search-wrapper">
			<form onSubmit={handleFormSubmit} id="search-form" >
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for"
						aria-label="City"
						aria-details="Search for city to show current weather for."
						required
						value={inputValue}
						onChange={(e)=> {setInputValue(e.target.value)}}
					/>

					<button
					type="submit"
					className="btn btn-success"
					disabled={inputValue.trim().length < 3}
					>
						🔍
					</button>
					{inputValue.trim().length > 0 && inputValue.trim().length < 3 && (
						<div className="form-text text-danger">Please enter 3 chars or more</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default SearchCity;
