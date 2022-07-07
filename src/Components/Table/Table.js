import React from 'react';
import { Table, NumberInput, ActionIcon, Group, Paper, Text, Box } from '@mantine/core';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  ArrowsSort
} from 'tabler-icons-react';

function MantineTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useSortBy,
    usePagination
  );

  return (
    <Box style={{ display: 'flex', flexDirection: "column" ,alignItems: 'center', justifyContent: 'center' }}>
      <Box m={"5%"}>
        Mantine Table
      </Box>
        <Table striped highlightOnHover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div style={{ display: 'inline-flex' }}>
                      <span>{column.render('Header')}</span>
                      <span
                        style={{
                          marginBottom: '-.20em',
                          marginLeft: '8px',
                          marginTop: '.20em'
                        }}>
                        {column.isSorted ? <ArrowsSort /> : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Paper padding="xl" radius={0} m={"5%"}>
          <Group position="left" spacing="xs">
            <ActionIcon
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              variant="filled"
              color="blue">
              <ChevronsLeft />
            </ActionIcon>
            <ActionIcon
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              variant="filled"
              color="blue">
              <ChevronLeft />
            </ActionIcon>
            <ActionIcon
              onClick={() => nextPage()}
              disabled={!canNextPage}
              variant="filled"
              color="blue">
              <ChevronRight />
            </ActionIcon>
            <ActionIcon
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              variant="filled"
              color="blue">
              <ChevronsRight />
            </ActionIcon>
            <Text data-mantine-composable>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </Text>
            <Text data-mantine-composable>
              | Go to page:{' '}
              <NumberInput
                max={pageOptions.length}
                min={1}
                defaultValue={pageIndex + 1}
                onChange={(val) => {
                  const page = val ? Number(val) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px', display: 'inline-flex' }}
              />
            </Text>
          </Group>
        </Paper>
    </Box>
  );
}
 
export default MantineTable
