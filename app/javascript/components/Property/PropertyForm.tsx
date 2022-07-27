import * as React from 'react'
import {PropertyInterface, blankProperty} from './useProperty'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

interface PropertyFormProps {
    onSave: (property?: PropertyInterface) => void;
}

export function PropertyForm({onSave}: PropertyFormProps) {
    const [property, setProperty] = React.useState(blankProperty);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="streetAddress">
                <Form.Label>Street Address:</Form.Label>
                <Form.Control
                    value={property.street_address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProperty({...property, street_address: e.currentTarget.value})
                    }
                    aria-label="street address"
                />
                <Form.Group className="mb-3" controlId="ownerName">
                    <Form.Label>Owner Name:</Form.Label>
                    <Form.Control
                        value={property.owner_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProperty({...property, owner_name: e.currentTarget.value})
                        }
                        aria-label="owner name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='ownerMailingAddress'>
                    <Form.Label></Form.Label>
                    <Form.Control
                        value={property.owner_mailing_address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProperty({...property, owner_mailing_address: e.currentTarget.value})
                        }
                        aria-label="owner mailing address"
                    />
                </Form.Group>
                {/*TODO: replace this FormGroup with a Row of Inputs for each field: City, State, and Zip*/}
                <Form.Group className="mb-3" controlId="cityStateZip">
                    <Form.Label>City/State/Zipcode</Form.Label>
                    <Form.Control
                        value={property.city_state_zip}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setProperty({...property, city_state_zip: e.currentTarget.value})
                        }
                        aria-label="city state zip"
                    />
                </Form.Group>
            </Form.Group>
            <Button
                size="lg"
                onClick={() => [
                    onSave(property),
                    blankProperty.id++,
                    setProperty(blankProperty)
                ]}
            >
                Save Property
            </Button>
        </Form>
    )
}

