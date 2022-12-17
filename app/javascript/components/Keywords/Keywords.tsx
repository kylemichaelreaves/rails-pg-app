import * as React from "react";
import KeywordsList from "~//components/Keywords/KeywordsList";
import KeywordsForm from "~//components/Keywords/KeywordsForm";
import Container from "react-bootstrap/Container";

export default function Keywords() {
    const [relatedKeywords, setRelatedKeywords] = React.useState<string[]>([]);


    return (
        <Container>
            <KeywordsForm/>
            <KeywordsList relatedKeywords={relatedKeywords}/>
        </Container>

    )
}