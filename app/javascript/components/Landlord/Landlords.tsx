import * as React from "react";
import {Container, TextField, Button, CircularProgress, Typography, Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useQuery} from "@tanstack/react-query";
import {getLandlordsByName, LandlordsInterface} from "../../hooks/useLandlord";
import LandlordsList from "./LandlordsList";
import {AxiosError} from "axios";

export default function Landlords() {
    const [search, setSearch] = React.useState("");

    const {
        data,
        status,
        error,
        refetch,
        isFetching
    } = useQuery<LandlordsInterface, AxiosError>({
        queryKey: ['landlords', search],
        queryFn: () => getLandlordsByName(search),
        enabled: false,
        staleTime: 5000
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        refetch()
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Landlords Component</Typography>
            {status === "pending" && isFetching ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            ) : status === "error" ? (
                <Typography color="error">Error: {error?.message}</Typography>
            ) : (
                <>
                    {
                        data && data.rows?.length
                            ? <LandlordsList landlords={data}/>
                            : ""
                    }
                </>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                <Typography variant="body1" gutterBottom>Search for Landlord by Name</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{mb: 2}}>
                    Search for a landlord by name.
                </Typography>
                <Box sx={{display: 'flex', gap: 1}}>
                    <TextField
                        fullWidth
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter landlord name"
                        value={search}
                        onChange={handleChange}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        disabled={search.length === 0 || isFetching}
                        type="submit"
                        startIcon={isFetching ? <CircularProgress size={20}/> : <SearchIcon/>}
                    >
                        {isFetching ? "Searching..." : "Search"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

