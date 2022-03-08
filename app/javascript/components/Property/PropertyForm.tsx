import * as React from 'react'
import { Property } from './useProperty'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

interface PropertyFormProps {
  onSave: (property: Property) => void;
}

const blankProperty: Property = {
  id: 0,
  street_address: '',
  owner_name: '',
  owner_mailing_address: '',
  city_state_zip: '',
  property_full_address: '',
  units_at_property: 0,
  g_code: '',
  latitude: 0,
  longitude: 0,
  created_at: '',
  updated_at: '',
  owner_full_mailing_address: '',
  landlords_id: 0
}

export default function PropertyForm({ onSave }: PropertyFormProps) {
  const [property, setProperty] = React.useState(blankProperty);

  return (
    <>
      <Form>
        <Row>
          <InputGroup className="mb-3">
            <InputGroup.Text>Street Address:</InputGroup.Text>
            <Form.Control
              value={property.street_address}
              onChange={(e) =>
                setProperty({ ...property, street_address: e.target.value })
              }
              aria-label="street address"
            />
            <InputGroup.Text>Owner Name:</InputGroup.Text>
            <Form.Control
              value={property.owner_name}
              onChange={(e) =>
                setProperty({ ...property, owner_name: e.target.value })
              }
              aria-label="owner mailing address"
            />
            <Form.Control
              value={property.owner_mailing_address}
              onChange={(e) =>
                setProperty({ ...property, owner_mailing_address: e.target.value })
              }
              aria-label="owner mailing address"
            />
            <Form.Control
              value={property.city_state_zip}
              onChange={(e) =>
                setProperty({ ...property, city_state_zip: e.target.value })
              }
              aria-label="city state zip"
            />
          </InputGroup>
        </Row>
      </Form>
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
    </>
  )
}

