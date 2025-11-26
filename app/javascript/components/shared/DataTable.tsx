import React, {useState, useMemo} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Paper,
    LinearProgress,
    Box,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {UseQueryResult} from '@tanstack/react-query';

// Type definitions
export interface ColumnDefinition<T = any> {
    prop: keyof T | string;
    label: string;
    routerLinkBasePath?: string;
    formatter?: (value: any, row?: T) => string | React.ReactNode;
    pathFunction?: (value: any) => string;
}

export interface DataTableProps<T = Record<string, any>> {
    tableData?: T[];
    columns: ColumnDefinition<T>[];
    sortableColumns?: string[];
    isFetching?: boolean;
    rowKey?: keyof T | string;
    routerLinkColumn?: Record<string, string>;
    dataTestId?: string;
}

// Props type for when using with react-query
export type DataTableQueryProps<T = Record<string, any>> = Omit<DataTableProps<T>, 'tableData' | 'isFetching'> &
    Pick<UseQueryResult<T[]>, 'data' | 'isFetching'>;

type Order = 'asc' | 'desc';

function DataTable<T extends Record<string, any>>({
                                                      tableData = [],
                                                      columns,
                                                      sortableColumns = [],
                                                      isFetching = false,
                                                      rowKey,
                                                      routerLinkColumn = {},
                                                      dataTestId = '',
                                                  }: Readonly<DataTableProps<T>>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [orderBy, setOrderBy] = useState<string>('');
    const [order, setOrder] = useState<Order>('desc');

    // Handle sorting
    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sort and paginate data
    const sortedAndPagedData = useMemo(() => {
        let processedData = [...tableData];

        // Sort
        if (orderBy && sortableColumns.includes(orderBy)) {
            processedData.sort((a, b) => {
                const aValue = a[orderBy];
                const bValue = b[orderBy];

                if (aValue < bValue) {
                    return order === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        // Paginate
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return processedData.slice(start, end);
    }, [tableData, orderBy, order, page, rowsPerPage, sortableColumns]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10));
        setPage(0);
    };

    const shouldShowPagination = tableData.length > rowsPerPage;

    // Render cell content
    const renderCellContent = (row: T, column: ColumnDefinition<T>) => {
        const value = row[column.prop as keyof T];
        const routerLinkPath = routerLinkColumn[column.prop as string];

        if (routerLinkPath) {
            return (
                <Link
                    to={`${routerLinkPath}/${encodeURIComponent(String(value))}`}
                    style={{textDecoration: 'none', color: 'inherit'}}
                >
                    {String(value)}
                </Link>
            );
        }

        if (typeof column.formatter === 'function') {
            return column.formatter(value, row);
        }

        return String(value);
    };

    // Get row identifier
    const getRowId = (row: T, index: number): string | number => {
        if (rowKey) {
            return row[rowKey as keyof T] as string | number;
        }
        return index;
    };

    return (
        <Box data-testid={dataTestId}>
            <TableContainer component={Paper}>
                {isFetching && <LinearProgress/>}
                <Table size="small" sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={String(column.prop)}>
                                    {sortableColumns.includes(String(column.prop)) ? (
                                        <TableSortLabel
                                            active={orderBy === column.prop}
                                            direction={orderBy === column.prop ? order : 'asc'}
                                            onClick={() => handleRequestSort(String(column.prop))}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAndPagedData.map((row, index) => (
                            <TableRow
                                key={getRowId(row, index)}
                                sx={{'&:nth-of-type(odd)': {backgroundColor: 'action.hover'}}}
                            >
                                {columns.map((column) => (
                                    <TableCell key={String(column.prop)}>
                                        {renderCellContent(row, column)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {shouldShowPagination && (
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40, 100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Box>
    );
}

// Wrapper component for react-query integration
export function DataTableWithQuery<T extends Record<string, any>>(
    props: DataTableQueryProps<T>
) {
    const {data, isFetching, ...tableProps} = props;

    return (
        <DataTable
            tableData={data}
            isFetching={isFetching}
            {...tableProps}
        />
    );
}

export default DataTable;