import * as React from "react";
import axios from "axios";

export const getPropertyById = async (id: number) => {
  const { data } = await axios.get(`"api/v1/properties/${id}`);
  return data;
};
