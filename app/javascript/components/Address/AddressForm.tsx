import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import FormControl from "react-bootstrap/FormControl";
import {AddressInterface, blankAddress} from "~//components/Address/Address";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {useSearchParams, useNavigate} from "react-router-dom";
import {createAddress} from "~//components/Address/useAddress";
import {AddressAutofill} from '@mapbox/search-js-react';

// TODO use mapbox autofill for address
// TODO if error or success, pass to dismissable alert

export const AddressForm = () => {

    const [address, setAddress] = React.useState<AddressInterface>(blankAddress)

    const [show, setShow] = React.useState(false);

    const {
        isError,
        isIdle,
        mutate,
        data,
        status,
        error,
        isLoading,
        isSuccess
    } = useMutation<AddressInterface, AxiosError>(
        ['address', address],
        () => createAddress(address));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setAddress({...address, [target.name]: target.value});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate()
    }


    React.useEffect(() => {
        if (isSuccess || isError) {
            setShow(true);
        } else if (isIdle || isLoading) {
            setShow(false);
        }
    }, [isSuccess, isError]);

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Text as={Col}>
                        <Form.Text>Street Address</Form.Text>
                        <AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}>
                            <Form.Control
                                id="streetAddress"
                                name="streetAddress"
                                placeholder="enter a street address"
                                value={address.street_address}
                                autoComplete="address-line1"
                                onChange={handleChange}
                            />
                        </AddressAutofill>
                    </Form.Text>
                    <Form.Text as={Col}>
                        <Form.Text>apartment or unit?</Form.Text>
                        <Form.Control
                            id="apartmentOrUnit"
                            name="apartmentOrUnit"
                            placeholder="enter an apt or unit #"
                            autoComplete="address-line2"
                            value={address.apt_or_unit_number}
                            onChange={handleChange}
                        />
                    </Form.Text>
                </Row>
                <Row className="mb-3">
                    <Form.Text as={Col}>
                        <Form.Text>City</Form.Text>
                        <Form.Control
                            id="city"
                            name="city"
                            placeholder="enter a city"
                            value={address.municipality}
                            autoComplete="address-level2"
                            onChange={handleChange}
                        />
                    </Form.Text>
                    <Form.Text as={Col}>
                        <Form.Text>State</Form.Text>
                        <Form.Control
                            id="state"
                            name="state"
                            placeholder="enter a state"
                            value={address.state}
                            autoComplete="address-level1"
                            onChange={handleChange}
                        />
                    </Form.Text>
                    <Form.Text as={Col}>
                        <Form.Text>Zipcode</Form.Text>
                        <Form.Control
                            id="zipCode"
                            name="zipCode"
                            placeholder="enter a zipcode"
                            type="number"
                            value={address.zipcode}
                            autoComplete="postal-code"
                            onChange={handleChange}
                        />
                    </Form.Text>
                </Row>

                <Row className="mb-3">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading || address === blankAddress}
                    >
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Row>
            </Form>
        </Container>
    )
        ;
}
