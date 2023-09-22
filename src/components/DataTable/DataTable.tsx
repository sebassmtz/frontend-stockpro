import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  GridRowParams,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

import "./dataTable.scss";



function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="standard"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function getRowClassName(params: GridRowParams) {
  return "rowContainer";
}

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  pagination: number;
};

const DataTable = (props: Props) => {
  const handleEdit = (id: number) => {
    console.log(id);
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        getRowClassName={getRowClassName}
        rows={props.rows}
        columns={props.columns.map((column) => ({
          ...column,
          headerClassName: "header",
        }))}
        pagination
        slots={{ toolbar: GridToolbar, pagination: CustomPagination }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: props.pagination,
            },
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick={true}
        disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
        onRowClick={(params) => handleEdit(params.row.id)}
      />
    </div>
  );
};

export default DataTable;
