import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Stack } from "@mui/material";

import type { ICommit } from "../../interfaces";

export const PostList: React.FC = () => {
  const {
    dataGridProps,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  } = useDataGrid<ICommit>({
    pagination: {
      mode: "cursor",
      pageSize: 5,
    },
  });

  const columns: GridColDef<ICommit>[] = [
    {
      field: "sha",
      headerName: "SHA",
      type: "string",
      width: 100,
      filterable: false,
      sortable: false,
    },
    {
      field: "message",
      headerName: "Message",
      minWidth: 400,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.message;
      },
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.author.name;
      },
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.author.date;
      },
    },
  ];

  return (
    <List>
      <DataGrid
        getRowId={(row) => row.sha}
        {...dataGridProps}
        hideFooter
        columns={columns}
      />
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            onClick={goToPreviousPage}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={goToNextPage}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </List>
  );
};
