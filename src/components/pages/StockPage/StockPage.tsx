import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { imageUrl } from "../../../Constants";
import * as stockActions from "../../../actions/stock.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { Box, Fab, IconButton, TextField, Typography } from "@mui/material";
import NumberFormat from "react-number-format";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const stockColumns: GridColDef[] = [
  {
    headerName: "ID",
    field: "product_id",
    width: 50,
  },
  {
    headerName: "IMG",
    field: "image",
    width: 80,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <img
        alt=""
        src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
        style={{ width: 70, height: 70, borderRadius: "5%" }}
      />
    ),
  },
  {
    headerName: "NAME",
    field: "name",
    width: 250,
  },
  {
    headerName: "STOCK",
    field: "stock",
    width: 120,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Typography variant="body1">
        <NumberFormat
          value={value}
          displayType="text"
          thousandSeparator={true}
          decimalScale={0}
          fixedDecimalScale={true}
          prefix="฿"
        />
      </Typography>
    ),
  },
  {
    headerName: "TIME",
    field: "createdAt",
    width: 120,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Typography variant="body1">
        <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
      </Typography>
    ),
  },
  {
    headerName: "ACTION",
    field: ".",
    width: 120,
    renderCell: ({ row }: GridRenderCellParams<string>) => (
      <Stack direction="row">
        <IconButton aria-label="edit" size="large" onClick={() => {}}>
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="edit" size="large" onClick={() => {}}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    ),
  },
];

const QuickSearchToolbar = ({ onChange }: any) => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        onChange={onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton title="Clear" aria-label="Clear" size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/stock/create"
        size="small"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default function StockPage() {
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  return (
    <Box>
      <DataGrid
        components={{
          Toolbar: QuickSearchToolbar,
        }}
        componentsProps={{
          toolbar: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(stockActions.loadStockByKeyword(e.target.value));
            },
          },
        }}
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={stockReducer.result}
        columns={stockColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </Box>
  );
}
