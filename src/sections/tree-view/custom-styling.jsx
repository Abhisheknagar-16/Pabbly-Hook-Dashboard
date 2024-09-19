import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Popover, Tooltip, MenuItem, IconButton, } from '@mui/material';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ITEMS = [
  {
    id: '1',
    label: 'Main',
    children: [
      { id: '2', label: 'Hello' },
      {
        id: '3',
        label: 'Subtree with children',
        children: [
          { id: '6', label: 'Hello' },
          {
            id: '7',
            label: 'Sub-subtree with children',
            children: [
              { id: '9', label: 'Child 1' },
              { id: '10', label: 'Child 2' },
              { id: '11', label: 'Child 3' },
            ],
          },
          { id: '8', label: 'Hello' },
        ],
      },
      { id: '4', label: 'World' },
      { id: '5', label: 'Something something' },
    ],
  },
];

const StyledTreeItem = styled((props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const popoverOpen = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <TreeItem
      {...props}
      label={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Tooltip title={`Folder Name: ${props.label}`} placement="top" arrow>
            <span>{props.label}</span>
          </Tooltip>
          <IconButton color={popoverOpen ? 'inherit' : 'default'} onClick={handlePopoverOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <Popover
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={handlePopoverClose}>
              <Iconify sx={{ mr: 1 }} icon="mingcute:add-fill" />
              Create Folder
            </MenuItem>
            <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={handlePopoverClose}>
              <Iconify sx={{ mr: 1 }} icon="fluent:edit-20-filled" />
              Rename
            </MenuItem>
            <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={handlePopoverClose}>
              <Iconify sx={{ mr: 1 }} icon="solar:share-bold" /> Share
            </MenuItem>
            <MenuItem
              sx={{ display: 'flex', alignItems: 'center', color: '#ff5630' }}
              onClick={handlePopoverClose}
            >
              <Iconify sx={{ mr: 1 }} color="#ff5630" icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Popover>
        </div>
      }
    />
  );
})(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: { fontSize: '0.8rem', fontWeight: 500 },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.25),
    [stylesMode.dark]: {
      color: theme.vars.palette.primary.contrastText,
      backgroundColor: theme.vars.palette.primary.dark,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

// ----------------------------------------------------------------------

export function CustomStyling() {
  return (
    <RichTreeView
      aria-label="customized"
      defaultExpandedItems={['1']}
      sx={{ overflowX: 'hidden', minHeight: 200, width: 1, mt: 1.6 }}
      slots={{ item: StyledTreeItem }}
      items={ITEMS}
    />
  );
}
