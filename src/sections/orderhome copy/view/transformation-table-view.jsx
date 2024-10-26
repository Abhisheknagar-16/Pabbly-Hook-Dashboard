import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import { Divider, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { _connection } from 'src/_mock/connectiontable';
import { DashboardContent } from 'src/layouts/dashboard';
import { ORDER_TRANSFORMATION_OPTIONS } from 'src/_mock/transformationtable';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { OrderTableRow } from '../transformation-table-row';
import { OrderTableToolbar } from '../tranformation-table-toolbar';
import { OrderTableFiltersResult } from '../transformation-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_TRANSFORMATION = [{ value: 'all', label: 'All' }, ...ORDER_TRANSFORMATION_OPTIONS];

const TABLE_HEAD = [
  {
    id: 'orderNumber',
    label: (
      <Tooltip
        disableInteractive
        title="View transformation status and date of creation."
        arrow
        placement="top"
      >
        STATUS/DATE
      </Tooltip>
    ),
  },
  {
    id: 'name',
    label: (
      <Tooltip
        disableInteractive
        title="Name of transformation and folder where it is located."
        arrow
        placement="top"
      >
        TRANSFORMATION NAME
      </Tooltip>
    ),
  },
  {
    id: 'id',
    label: (
      <Tooltip
        disableInteractive
        title="View transformation ID's."
        arrow
        placement="top"
      >
        TRANSFORMATION ID
      </Tooltip>
    ),
  },
  {
    id: 'createdAt',
    label: (
      <Tooltip disableInteractive title="No of connections can view." arrow placement="top">
        NO. OF CONNECTIONS
      </Tooltip>
    ),
    align: 'right',
  },
  { id: '', label: '' },
];

// ----------------------------------------------------------------------

export function TransformationTableView() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_connection);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const getTooltipContent = (value) => {
    switch (value.toLowerCase()) {
      case 'all':
        return 'Show all transformations including In Use and Idle';
      case 'In Use':
        return 'Show only active transformation';
      case 'Idle':
        return 'Show only Idle transformation';
      case 'pending':
        return 'View transformations waiting for approval';
      case 'rejected':
        return 'View transformations that have been rejected';
      default:
        return `View ${value} transformations`;
    }
  };

  return (
    <>
      <DashboardContent maxWidth="xl" sx={{ px: { xs: 0, sm: 0, lg: 5, xl: 0 } }}>
        <Card sx={{ md: 15 }}>
          <CardHeader
            title={
              <Box>
                <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                  <Tooltip
                    title="List of all transformation ID's and there status."
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    Transformation
                  </Tooltip>
                </Box>
              </Box>
            }
            // action={total && <Label color={color}>{total}</Label>}
            sx={{
              p: 3,
            }}
          />
          <Divider />
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_TRANSFORMATION.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={
                  <Tooltip
                    disableInteractive
                    placement="top"
                    arrow
                    title={getTooltipContent(tab.value)}
                  >
                    <span>{tab.label}</span>
                  </Tooltip>
                }
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'In Use' && 'success') ||
                      (tab.value === 'Idle' && 'error') ||
                      'default'
                    }
                  >
                    {['In Use', 'pending', 'Idle', 'Sheduled'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <OrderTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
            numSelected={table.selected.length}
          />

          {canReset && (
            <OrderTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative', width: '100%' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip disableInteractive title="Delete" arrow>
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar sx={{ minHeight: 444, width: '100%' }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: '100%' }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        sx={{ width: '100%' }} // Full width for each row
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  let dataFiltered = inputData;

  // Filter name
  if (name) {
    dataFiltered = dataFiltered.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  // Filter status
  if (status !== 'all') {
    dataFiltered = dataFiltered.filter((item) => item.status === status);
  }

  // Filter date
  if (!dateError && startDate && endDate) {
    dataFiltered = dataFiltered.filter((item) => fIsBetween(item.createdAt, startDate, endDate));
  }

  // Sort data
  dataFiltered = dataFiltered.sort(comparator);

  return dataFiltered;
}