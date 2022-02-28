import { useQuery } from "react-query";
import axios from "axios";

export default function useProperties() {
  return useQuery("properties", async () => {
    const { data } = await axios.get("api/v1/properties");
    return data;
  });
}
