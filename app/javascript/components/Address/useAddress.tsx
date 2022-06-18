import { useQuery } from "react-query";
import axios from "axios";
import { AddressInterface } from "./Address";

export const getAddressbyId = async (
  id: number | undefined
): Promise<AddressInterface> => {
  return await axios
    .get(`api/v1/addresses/${id}`)
    .then((response) => response.data);
};

export default function useAddress(id: number) {
  return useQuery(["address", id], () => getAddressbyId(id), {
    enabled: !!id,
  }).data;
}
