import * as React from "react";
import axios from "axios";
import { Property } from "./useProperty";

export const getPropertyById = async (
  id: number | undefined
): Promise<Property> => {
  return await axios
    .get(`api/v1/properties/${id}`)
    .then((response) => response.data);
};
