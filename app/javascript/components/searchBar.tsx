import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { InfiniteData } from "react-query";
import { Property } from "./Property/useProperty";

interface SearchBarProps {
  onSearch: (searchTerm: string) => Property[];
}

const emptySearch: string = "";

export default function SearchBar({ onSearch }: SearchBarProps): any {
  // any will be swapped out later for a proper type
  const [query, setQuery] = React.useState<string>(emptySearch);
  const [searchTerm, setSearchTerm] = React.useState<string>(emptySearch);

  const handleSearch = (searchValue: string) => {
    if (searchTerm !== emptySearch) {
      // setSearchTerm(searchValue);
      // const filteredData = data.pages.page.filter((item: Object) => {
      //   return Object.values(item)
      //     .join("")
      //     .toLowerCase()
      //     .includes(searchTerm.toLowerCase());
      // });
    }

    React.useEffect(() => {
      if (searchTerm) {
        console.log(`searchTerm: ${searchTerm}`);
      }
    }, [searchTerm]);

    return (
      <InputGroup
        className="mb-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      >
        <FormControl
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
          onSubmit={(e: React.FormEvent<HTMLInputElement>) =>
            handleSearch(e.currentTarget.value)
          }
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          type="submit"
        >
          Search
        </Button>
      </InputGroup>
    );
  };
}
