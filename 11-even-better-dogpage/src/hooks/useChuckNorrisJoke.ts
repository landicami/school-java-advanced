
import useGetData from "./useGetData";
import { ChuckNorrisRepsone } from "../types/ChuckN.types";

const useChuckNorrisJoke = () => {


	return useGetData<ChuckNorrisRepsone>("https://api.chucknorris.io/jokes/random");
}

export default useChuckNorrisJoke
