import * as React from 'react';
import axios from 'axios';
import {KeywordsInterface} from "./KeywordsForm";
import {API_GATEWAY_ENDPOINT} from "~//constants";


const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
}

export const postKeywords = async (keywords: KeywordsInterface): Promise<KeywordsInterface> => {
    return await axios
        .post(`${API_GATEWAY_ENDPOINT}/keywords/finder`, keywords, config)
        .then((response) => response.data);
}