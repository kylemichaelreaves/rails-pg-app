import * as React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {KeywordsInterface} from "./KeywordsForm";


export default function KeywordsList({relatedKeywords}: { relatedKeywords: KeywordsInterface }) {
    // return a list of relatedKeywords
    // if there are no relatedKeywords, return a message that says "No related keywords"

    function removeUnderscores(strings: KeywordsInterface) {
        return strings.keywords.map(string => string.replace(/_/g, ''));
    }

    const relatedKeywordsList = removeUnderscores(relatedKeywords);


    return (
        <Container>
            {relatedKeywordsList.length > 0 ?
                relatedKeywordsList.map((keyword) => {
                    return (
                        <ListGroup.Item>{keyword}</ListGroup.Item>
                    )
                }) :
                <div>No related keywords</div>
            }
        </Container>
    )
};
