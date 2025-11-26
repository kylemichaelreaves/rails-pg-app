import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {Box, Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import KeywordsList from "~//components/keywords/KeywordsList";

import {postKeywords} from "~//components/keywords/useKeywords";

export interface KeywordsInterface {
    keywords: string[];
}

export default function KeywordsForm() {

    const [keywords, setKeywords] = React.useState<string>('');
    const [debouncedKeywords, setDebouncedKeywords] = React.useState(keywords);
    const {
        mutate,
        isPending: isLoading,
        error,
        data
    } = useMutation<KeywordsInterface, AxiosError>({
        mutationFn: () => postKeywords({keywords: [debouncedKeywords]})
    });

    // Debounce the keywords so that we don't send a request on every keystroke
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedKeywords(keywords);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [keywords]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.currentTarget.value);
    }


    return (
        <Container>
            <Typography variant="h6" gutterBottom>KeywordsForm</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start'}}>
                    <TextField
                        fullWidth
                        id="keyword"
                        name="keyword"
                        placeholder="enter a keyword"
                        value={keywords}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading || keywords === ''}
                        startIcon={isLoading && <CircularProgress size={20}/>}
                    >
                        {isLoading ? "Loading..." : "Find Keywords"}
                    </Button>
                </Box>
            </form>
            {data && <KeywordsList keywords={data}/>}
            {error && <div>{error.message}</div>}
        </Container>
    )
}

