import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const queryClient = useQueryClient();

export interface Address {
  id: number;
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

export default async function createAddress() {
  return await axios.post("api/v1/addresses").then((response) => response.data);
}

const { mutate, isLoading } = useMutation(createAddress, {
  onSuccess: (data) => {
    const message = "success";
    console.log(data);
    alert(message);
  },
  onError: () => {
    alert("There was an error with this request");
  },
  onSettled: () => {
    queryClient.invalidateQueries("create");
  },
});
