import * as React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  UseQueryOptions,
} from "react-query";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios, { AxiosError } from "axios";

const queryClient = useQueryClient();

export interface Address {
  id: number;
  street_address: string;
  city: string;
  state: string;
  zip: string;
}

const blankAddress: Address = {
  id: 0,
  street_address: "",
  city: "",
  state: "",
  zip: "",
};

async function fetchAddresses(): Promise<Address[]> {
  return await axios.get("api/v1/address").then((response) => response.data);
}

export async function createAddress() {
  return await axios.post("api/v1/addresses").then((response) => response.data);
}

function useAddresses<TData = Address[]>(
  options?: UseQueryOptions<Address[], AxiosError, TData>
) {
  return useQuery("address", fetchAddresses, options);
}

export function AddressCounter() {
  const counterQuery = useAddresses({
    select: (data) => data.length,
    notifyOnChangeProps: ["data"],
  });

  React.useEffect(() => {
    console.log("rendering counter");
  });

  return <div>AddressCounter: {counterQuery.data ?? 0}</div>;
}

interface AddressCreatorProps {
  onSave: (address: Address) => {};
}

export default function AddressCreator({ onSave }: AddressCreatorProps) {
  const counterQuery = useQueryClient();
  const [address, setAddress] = React.useState(blankAddress);
  const { isFetching, ...queryInfo } = useAddresses();

  const addAddressMutation = useMutation(
    (newAddress: Address) =>
      axios.post("api/v1/addresses/new", { address: newAddress }),
    {
      onMutate: async (newAddress: Address) => {
        blankAddress.id++;
        setAddress(blankAddress);
        await queryClient.cancelQueries("addresses");
        const previousAddresses =
          queryClient.getQueryData<Address[]>("addresses");

        if (previousAddresses) {
          queryClient.setQueryData<Address[]>("addresses", {
            ...previousAddresses,
          });
        }
        return { previousAddresses };
      },

      onError: (err, variables, context) => {
        if (context?.previousAddresses) {
          queryClient.setQueryData<Address[]>(
            "addresses",
            context.previousAddresses
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("addresses");
      },
    }
  );
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addAddressMutation.mutate(address);
        }}
      ></Form>
      <Button
        size="lg"
        onClick={() => [
          onSave(address),
          blankAddress.id++,
          setAddress(blankAddress),
        ]}
      >
        Geocode Address
      </Button>
      <br />
      {queryInfo.isSuccess && (
        <>
          <div>Updated At: {new Date().toLocaleTimeString()}</div>
          <ul>
            {queryInfo.data.map((address) => (
              <li key={address.id}>
                {address.street_address},{address.zip}
              </li>
            ))}
          </ul>
          {isFetching && <div>Updating in background...</div>}
        </>
      )}
      {queryInfo.isLoading && "Loading"}
      {queryInfo.error?.message}
    </>
  );
}