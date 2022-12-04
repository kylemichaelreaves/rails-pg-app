import * as React from "react";
import {LandlordInterface, LandlordsInterface} from "./useLandlord";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from 'react-bootstrap/Badge';

export default function LandlordsList({landlords}: { landlords: LandlordsInterface }) {
    return (
        <ListGroup>
            {landlords.rows.map((landlord: LandlordInterface) => (
                // TODO: Add a link to the landlord's show page
                <ListGroup.Item key={landlord.id}>
                    <Badge bg="primary">{landlord.id}</Badge> - {landlord.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

