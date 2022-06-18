import { useQuery } from "react-query";
import { LandlordInterface } from "./Landlord";
import axios from "axios";

export const getLandlordById = async (
  id: number | undefined
): Promise<LandlordInterface> => {
  return await axios
    .get(`api/v1/properties/${id}`)
    .then((response) => response.data);
};

export default function useLandlord(id: number) {
  return useQuery(["landlord", id], () => getLandlordById(id), {
    enabled: !!id,
  }).data;
}
