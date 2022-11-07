import * as React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    UseQueryOptions,
} from "@tanstack/react-query";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios, {AxiosError} from "axios";
import {AddressInterface, blankAddress} from "./Address";


const queryClient = useQueryClient();

async function fetchAddresses(): Promise<AddressInterface[]> {
    return await axios.get("api/v1/address").then((response) => response.data);
}

export async function createAddress() {
    return await axios.post("api/v1/addresses").then((response) => response.data);
}

function useAddresses<TData = AddressInterface[]>(
    options?: UseQueryOptions<AddressInterface[], AxiosError, TData>
) {
    return useQuery(["address"], fetchAddresses, options);
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
    onSave: (address: AddressInterface) => {};
}

export default function AddressCreator({onSave}: AddressCreatorProps) {
    const counterQuery = useQueryClient();
    const [address, setAddress] = React.useState(blankAddress);
    const {isFetching, ...queryInfo} = useAddresses();

    const addAddressMutation = useMutation(
        (newAddress: AddressInterface) =>
            axios.post("api/v1/addresses/new", {address: newAddress}),
        {
            onMutate: async (newAddress: AddressInterface) => {
                blankAddress.id++;
                setAddress(blankAddress);
                await queryClient.cancelQueries(["addresses"]);
                const previousAddresses =
                    queryClient.getQueryData<AddressInterface[]>(["addresses"]);

                if (previousAddresses) {
                    queryClient.setQueryData<AddressInterface[]>(["addresses"], {
                        ...previousAddresses,
                    });
                }
                return {previousAddresses};
            },

            onError: (err, variables, context) => {
                if (context?.previousAddresses) {
                    queryClient.setQueryData<AddressInterface[]>(
                        ["addresses"],
                        context.previousAddresses
                    );
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(["addresses"]);
            },
        }
    );
    return (
        <>
            <Form
                onSubmit={(e: React.FormEvent) => {
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
            <br/>
            {queryInfo.isSuccess && (
                <>
                    <div>Updated At: {new Date().toLocaleTimeString()}</div>
                    <ul>
                        {queryInfo.data.map((address) => (
                            <li key={address.id}>
                                {address.street_address},{address.zipcode}
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
