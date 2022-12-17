import * as React from "react";
import Container from "react-bootstrap/Container";
// function KeywordsList takes relatedKeywords as a parameter

export default function KeywordsList({relatedKeywords}: { relatedKeywords: string[] }) {
    // return a list of relatedKeywords
    // if there are no relatedKeywords, return a message that says "No related keywords"
    return (
        <Container>
            {relatedKeywords.length > 0 ?
                relatedKeywords.map((keyword) => {
                    return (
                        <li>{keyword}</li>
                    )
                }) :
                <li>No related keywords</li>
            }
        </Container>
    )
};
