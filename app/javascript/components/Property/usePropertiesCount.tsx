import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PropertyInterface } from "./useProperty";

export async function fetchProperties(): Promise<PropertyInterface[]> {
  return await axios
    .get("http://127.0.0.1:3000/api/v1/properties")
    .then((res) => res.data);
}

export function UsePropertiesCount() {
  const result = useQuery<PropertyInterface[], Error, number>(
    ["properties"],
    fetchProperties,
    {
      select: (properties: PropertyInterface[]) => properties.length,
    }
  );
  return <>{result.data}</>;
}
