import * as React from "react";
import {
    Container,
    List,
    ListItem,
    ListItemText,
    Button,
    CircularProgress,
    Box,
    Typography,
    Divider
} from "@mui/material";
import axios from "axios";
import {Link} from "react-router-dom";
import {useInfiniteQuery} from "@tanstack/react-query";
import {PropertyInterface} from "../../hooks/useProperty";
import {useInView} from "react-intersection-observer";
import {URL_PATH} from "~//constants";

export default function Properties() {
    const {ref, inView} = useInView();

    const getInfiniteProperties = async ({pageParam = 0}) => {
        return await axios
            .get(`${URL_PATH}/properties`, {
                params: {page: pageParam},
            })
            .then((response) => response.data);
    };

    const {
        status,
        data,
        error,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery({
        queryKey: ["properties"],
        queryFn: getInfiniteProperties,
        getNextPageParam: (lastPage) => {
            return lastPage.id;
        },
        initialPageParam: 0
    });

    React.useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Properties Component</Typography>
            <Box>
                {status === "pending" ? (
                    <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                        <CircularProgress/>
                    </Box>
                ) : status === "error" ? (
                    <Typography color="error">Error: {error?.message}</Typography>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => fetchPreviousPage()}
                            disabled={!hasPreviousPage || isFetchingPreviousPage}
                            sx={{mb: 2}}
                        >
                            {isFetchingPreviousPage
                                ? "Loading more..."
                                : hasPreviousPage
                                    ? "Load Older"
                                    : "Nothing more to load"}
                        </Button>
                        <Box>
                            {data?.pages?.map((page, pageIndex) => (
                                <React.Fragment key={pageIndex}>
                                    <List>
                                        {page?.map((property: PropertyInterface) => (
                                            <Box key={property.id} sx={{mb: 2}}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={
                                                            <Box component="span">
                                                                id:{" "}
                                                                <Link
                                                                    style={{display: "inline"}}
                                                                    to={`${property.id}`}
                                                                >
                                                                    {property.id}
                                                                </Link>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={property.street_address}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={property.owner_name}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={property.city_state_zip}/>
                                                </ListItem>
                                                <Divider/>
                                            </Box>
                                        ))}
                                    </List>
                                </React.Fragment>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
            <Button
                ref={ref}
                variant="outlined"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                startIcon={isFetchingNextPage && <CircularProgress size={20}/>}
            >
                {isFetchingNextPage ?
                    "Loading..."
                    : hasNextPage
                        ? "Load Newer"
                        : "Nothing more to load"}
            </Button>
        </Container>
    );
}

