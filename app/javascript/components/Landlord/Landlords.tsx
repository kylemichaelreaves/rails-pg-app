import * as React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {useQueryClient, useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getLandlordsByName, LandlordsInterface, useLandlords} from "./useLandlord";
import LandlordsList from "./LandlordsList";
import {AxiosError} from "axios";
import Spinner from 'react-bootstrap/Spinner';

export default function Landlords() {
    const queryClient = useQueryClient();
    const [search, setSearch] = React.useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const {
        isInitialLoading,
        isError,
        data,
        status,
        error,
        refetch,
        isFetching
    } = useQuery<LandlordsInterface, AxiosError>(
        ['landlords', search],
        () => getLandlordsByName(search), {
            enabled: false,
            // keepPreviousData: true,
            staleTime: 5000
        });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget.value);
        setSearchParams({search: e.currentTarget.value});
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        // if the current query isn't the same as the previous query or an empty string, refetch
        if (e.key === "Enter") {
            refetch();
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        refetch()
    };

    return (
        <Container>
            <h1>Landlords Component</h1>
            {/*TODO: Paginate queries and return the number of records found*/}
            <>
                <Form>
                    <Form.Label>Search for Landlord by Name</Form.Label>
                    <br/>
                    <Form.Text className="text-muted">
                        Search for a landlord by name.
                    </Form.Text>
                    <InputGroup>
                        <Form.Control
                            id="search"
                            name="search"
                            type="text"
                            value={search}
                            onChange={handleChange}
                            // onKeyDown={handleKeyDown}
                        />
                        <Button
                            variant="primary"
                            disabled={search.length === 0 || isFetching}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {isFetching ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                : "Search"
                            }
                        </Button>
                    </InputGroup>
                </Form>
                <br/>
                {status === "loading" && isFetching ? (
                    "loading..."
                ) : status === "error" ? (
                    "Error:" + `${error}`
                ) : (
                    <>
                        {
                            data && data.rows?.length
                                ? <LandlordsList landlords={data}/>
                                : ""
                        }
                    </>
                )}
            </>
        </Container>
    );
}

