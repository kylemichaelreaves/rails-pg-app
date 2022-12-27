import * as React from 'react';
import axios from 'axios';
import {KeywordsInterface} from "./KeywordsForm";

import {APIGateway} from "aws-sdk";


export const postKeywords = async (keywords: KeywordsInterface): Promise<KeywordsInterface> => {
    return await axios
        .post(`${APIGateway}/keywords/finder`, keywords)
        .then((response) => response.data);
}