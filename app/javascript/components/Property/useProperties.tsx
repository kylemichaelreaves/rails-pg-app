import { useQuery } from "react-query";
import axios from "axios";
import { Property } from "./useProperty";

export default function useProperties() {
  return useQuery<Property[], Error>("properties", async () => {
    return await axios
      .get("api/v1/properties")
      .then((response) => response.data);
  });
}
