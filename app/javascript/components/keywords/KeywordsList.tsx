import * as React from "react";
import {Container, List, ListItem, ListItemText} from "@mui/material";
import {KeywordsInterface} from "./KeywordsForm";


export default function KeywordsList({keywords}: Readonly<{ keywords: KeywordsInterface }>) {
    // return a list of relatedKeywords
    // if there are no relatedKeywords, return a message that says "No related keywords"

    function removeUnderscores(strings: KeywordsInterface) {
        return strings.keywords.map(string => string.replaceAll('_', ''));
    }

    const relatedKeywordsList = removeUnderscores(keywords);


    return (
        <Container>
            {relatedKeywordsList.length > 0 ?
                <List>
                    {relatedKeywordsList.map((keyword, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={keyword}/>
                        </ListItem>
                    ))}
                </List> :
                <div>No related keywords</div>
            }
        </Container>
    )
};
