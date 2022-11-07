import * as React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {useQueryClient, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {LandlordInterface, useLandlords} from "./useLandlord";
import LandlordsList from "./LandlordsList";
import {AxiosError} from "axios";

export default function Landlords() {
    const queryClient = useQueryClient();
    const [search, setSearch] = React.useState("");

    const {
        isInitialLoading,
        isError,
        data,
        status,
        error,
        refetch,
        isFetching
    } = useQuery<LandlordInterface[], AxiosError>(
        ['landlords', search],
        () => useLandlords(search))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        refetch()
    };

    return (
        <Container>
            <h1>Landlords Component</h1>
            <>
                <Form>
                    <Form.Label>Search for Landlord by Name</Form.Label>
                    <br/>
                    <Form.Text className="text-muted">
                        A girl has many names on her lips. The Many-Faced-God demands a name.
                    </Form.Text>
                    <InputGroup>
                        <Form.Control
                            id="search"
                            name="search"
                            type="text"
                            value={search}
                            onChange={handleChange}
                        />
                        <Button
                            variant="primary"
                            disabled={search.length === 0 || isFetching}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Form>
                <br/>
                {status === "loading" && isFetching ? (
                    "Loading..."
                ) : status === "error" ? (
                    "Error:" + `${error}`
                ) : (
                    <>
                        name: {search ? search : "currently, has no value"}
                        <br/>
                        status: {status}
                        <br/>
                        data: {
                        data && data.length
                            ? <LandlordsList landlords={data}/>
                            : "no data yet"
                    }
                    </>
                )}
            </>
        </Container>
    );
}

