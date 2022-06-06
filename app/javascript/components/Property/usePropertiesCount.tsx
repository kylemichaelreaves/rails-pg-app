import * as React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Property } from "./useProperty";

export async function fetchProperties(): Promise<Property[]> {
  return await axios
    .get("http://127.0.0.1:3000/api/v1/properties")
    .then((res) => res.data);
}

export function UsePropertiesCount() {
  const result = useQuery<Property[], Error, number>(
    "properties",
    fetchProperties,
    {
      select: (properties: Property[]) => properties.length,
    }
  );
  return <>{result.data}</>;
}
