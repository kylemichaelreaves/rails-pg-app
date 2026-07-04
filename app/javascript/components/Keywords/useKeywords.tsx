import * as React from 'react';
import axios from 'axios';
import {KeywordsInterface} from "./KeywordsForm";

// Base URL of the API Gateway endpoint, e.g. https://xxxx.execute-api.<region>.amazonaws.com/<stage>
const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

export const postKeywords = async (keywords: KeywordsInterface): Promise<KeywordsInterface> => {
    return await axios
        .post(`${API_GATEWAY_URL}/keywords/finder`, keywords)
        .then((response) => response.data);
}