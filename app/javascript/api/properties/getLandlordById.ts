import axios from "axios";
import {LandlordInterface} from "../../hooks/useLandlord";

export const getLandlordById = async (id: number): Promise<LandlordInterface> => {
    const response = await axios.get(`/api/v1/landlords/${id}`);
    return response.data;
}