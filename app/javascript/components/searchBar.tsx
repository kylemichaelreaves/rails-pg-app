import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import * as React from "react";
import { InfiniteData } from "react-query";
import { Property } from "./Property/useProperty";

interface SearchBarProps {
  onSearch: (searchTerm: string) => Property[];
  data: InfiniteData<any>[];
}

const emptySearch: string = "";

export default function SearchBar({ onSearch, data }: SearchBarProps): any { // any will be swapped out later for a proper type
  const [searchTerm, setSearchTerm] = React.useState(emptySearch);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (searchTerm !== emptySearch) {
      const filteredData = data.filter((item: Object) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }

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
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => setSearchTerm(searchTerm)}
        >
          Search
        </Button>
      </InputGroup>
    );
  };
}
