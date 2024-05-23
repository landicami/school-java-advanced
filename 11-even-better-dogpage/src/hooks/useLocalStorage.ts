import { useState } from "react";


const useLocalStorage = <T, >(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		console.log("Getting hn_darkmode from localStorage...");
		const value = window.localStorage.getItem(key);

		return value !== null
		? JSON.parse(value) as T
		: defaultValue;
	});
	const setValue = (value: T) => {
		setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value))

	}

	// useEffect(()=> {
	// 	window.localStorage.setItem("hn_darkmode", JSON.stringify(isDarkMode))
	// },[isDarkMode])

	//eller lägga det i togglethem och sätt item där

	return [ storedValue, setValue ] as const
}

export default useLocalStorage
