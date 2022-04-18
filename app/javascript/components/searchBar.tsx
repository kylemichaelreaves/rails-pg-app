import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import * as React from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const emptySearch: string = "";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState(emptySearch);

  React.useEffect(() => {
    if (searchTerm) {
      console.log(`searchTerm: ${searchTerm}`);
    }
  }, [searchTerm]);

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="search"
        aria-label="search"
        aria-describedby="basic-addon2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={() => {
          onSearch(searchTerm);
        }}
      >
        Search
      </Button>
    </InputGroup>
  );
}
