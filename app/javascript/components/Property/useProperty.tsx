import { useQuery } from "react-query";
import { getPropertyById } from "./getPropertyById";

export default function useProperty(propertyId: number) {
  return useQuery(["property", propertyId], () => getPropertyById(propertyId), {
    enabled: !!propertyId,
  });
}
