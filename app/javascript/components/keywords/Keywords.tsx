import * as React from "react";
import KeywordsList from "~//components/keywords/KeywordsList";
import KeywordsForm, {KeywordsInterface} from "~//components/keywords/KeywordsForm";
import {Container} from "@mui/material";

export default function Keywords() {
    const [relatedKeywords, setRelatedKeywords] = React.useState<KeywordsInterface>(null);

    return (
        <Container>
            <KeywordsForm/>
            <KeywordsList keywords={relatedKeywords}/>
        </Container>

    )
}