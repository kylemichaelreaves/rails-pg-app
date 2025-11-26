import axios from "axios";

export const getResourceById = async (
    id: number | undefined,
    resource: string
  ): Promise<[]> => {
    return await axios
      .get(`api/v1/${resource}/${id}`)
      .then((response) => response.data);
  };