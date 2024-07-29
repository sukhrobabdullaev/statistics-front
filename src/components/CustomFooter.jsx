import {
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import {
  GridRowCountSelector,
  gridPageCountSelector,
  gridPageSelector,
} from "@mui/x-data-grid/selectors";

export default CustomFooter = () => {
  const apiRef = useGridApiContext();
  const rowCount = useGridSelector(apiRef, GridRowCountSelector);
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <GridFooterContainer>
      <div style={{ flex: "1 1 auto" }}>
        {rowCount} qator{rowCount !== 1 ? "s" : ""} tanlandi
      </div>
      <GridPagination
        apiRef={apiRef}
        rowCount={rowCount}
        page={page}
        pageCount={pageCount}
        onPageChange={(newPage) => apiRef.current.setPage(newPage)}
        labelRowsPerPage="Rows per page" // Change this to your desired text
      />
    </GridFooterContainer>
  );
};
