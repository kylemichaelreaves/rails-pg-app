import * as React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {useSearchParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import KeywordsList from "~//components/Keywords/KeywordsList";

import {API_GATEWAY} from "~//constants";
import {postKeywords} from "~//components/Keywords/useKeywords";

const URL = `${API_GATEWAY}/keywords/finder`;


export interface KeywordsInterface {
    keywords: string[];
}

export default function KeywordsForm() {

    const [keywords, setKeywords] = React.useState(null);
    const [debouncedKeywords, setDebouncedKeywords] = React.useState(keywords);
    const {
            mutate,
            isLoading,
            error,
            data
        } = useMutation<KeywordsInterface, AxiosError>(
            ['keywords', keywords],
            () => postKeywords(keywords)
        )
    ;

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
        mutate(debouncedKeywords);
    };


    // TODO: add a timeout to this
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.currentTarget.value);
    }


    return (
        <Container>
            <div>KeywordsForm</div>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Control
                        id="keyword"
                        name="keyword"
                        placeholder="enter a keyword"
                        value={keywords}
                        onChange={handleChange}
                    >

                    </Form.Control>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading || keywords === ''}
                    >{
                        isLoading ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : (
                                "Find Keywords"
                            )
                    }
                    </Button>
                </Row>
            </Form>
            {
                data ? (
                    <KeywordsList relatedKeywords={data}/>
                ) : error ? (
                    <div>{error.message}</div>
                ) : null
            }
        </Container>

    )
}