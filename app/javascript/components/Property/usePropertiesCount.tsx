import { useQuery } from 'react-query';
import axios from 'axios';
import { Property } from "./useProperty";

const usePropertiesCount = () => {
    return useQuery("properties", async () => {
        await axios
            .get("http://127.0.0.1:3000/api/v1/properties")
            .then((response) => response.data),
        {
            select: (properties: Property[]) => properties.length,
        };
    });
};
