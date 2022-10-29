import * as React from "react";
import Container from "react-bootstrap/Container";
import {LandlordInterface} from "./useLandlord";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {getLandlordById} from "./useLandlord";

export interface LandlordsInterface {
    landlords: LandlordInterface[];
};

interface LandlordsProps {
    landlords: LandlordInterface[],
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}


export default function Landlords() {

    const [query, setQuery] = React.useState<string>("");
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const handleSubmit = async () => {

        return await axios.get(`http://127.0.0.1:3000/api/v1/landlords/search${query}`).then(
            (response) => response.data);

    }

    React.useEffect(() => {
        if (query.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [query]);

    const {data} = useQuery(['landlords', query], () => handleSubmit);

    return (
        <Container>
            <h3>Landlords</h3>
            <br/>
            <p>
                current query: {query}
            </p>
            <>
                current data: {data}
            </>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="searchInput">
                    <Form.Label>Search for Landlord by Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Search for a landlord by name.
                    </Form.Text>
                </Form.Group>
                <Button
                    variant="primary"
                    disabled={disabled}
                    type="submit"
                >
                    Search
                </Button>
            </Form>
        </Container>
    );
}

