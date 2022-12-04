import * as React from "react";
import {useLoaderData} from "react-router-dom";
import useLandlord, {LandlordInterface} from "./useLandlord";

export async function loader({params}: { params: { landlordId: number } }) {
    return {
        landlord: await useLandlord(params.landlordId),
    };
}

export default function Landlord() {

    const landlord = useLoaderData() as LandlordInterface;

    return landlord ? (
        <>
            <p>id: {landlord.id}</p>
            <p>name: {landlord.name}</p>
            <p>Mailing Address: {landlord.mailing_address}</p>
            <p>City, State, Zip: {landlord.city_state_zip}</p>
            <p>Full Mailing Address: {landlord.full_mailing_address}</p>
        </>
    ) : (
        <p>Loading…</p>
    );
}
