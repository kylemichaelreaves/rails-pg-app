import axios from "axios";
import { PropertyInterface } from "./useProperty";

export const getPropertyById = async (
  id: number | undefined
): Promise<PropertyInterface> => {
  return await axios
    .get(`api/v1/properties/${id}`)
    .then((response) => response.data);
};
