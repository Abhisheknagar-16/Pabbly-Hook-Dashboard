import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

// ----------------------------------------------------------------------

export function TablePaginationCustom({
  sx,
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{ borderTopColor: 'transparent' }}
        labelRowsPerPage={
          <Tooltip title="Select the number of rows displayed per page." arrow placement="top">
            <span>Rows per page:</span>
          </Tooltip>
        }
        labelDisplayedRows={({ from, to, count }) => (
          <Tooltip
            title="Shows the current range of rows being displayed and the total number of rows."
            arrow
            placement="top"
          >
            <span>
              {from}–{to} of {count}
            </span>
          </Tooltip>
        )}
      />

  {/* {onChangeDense && (
        <FormControlLabel
        label={<span>Dense</span>}
        control={
          <Tooltip disableInteractive title="Compact table" arrow placement='top'>
            <Switch name="dense" checked={dense} onChange={onChangeDense} />
          </Tooltip>
        }
        sx={{
          pl: 2,
          py: 1.5,
          top: 0,
          position: { sm: 'absolute' },
        }}
      />
      
      )} */}
    </Box>
  );
}
