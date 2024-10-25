import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Button, Tooltip, Divider, MenuList, MenuItem, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { QuickShareDialog } from '../dialog-view/quick-share-dailog';
import { CreateFolderDialog } from '../dialog-view/create-folder-dailog';
import { RenameFolderDialog } from '../dialog-view/rename-folder-dailog';

// ----------------------------------------------------------------------

const ITEMS = [
  { id: '12', label: 'Home (0)' },
  { id: '18', label: 'Pabbly Connect (0)' },
  {
    id: '1',
    label: 'Main Folder (2)',
    children: [
      { id: '2', label: 'Child Folder 1-Subscrip..(0)' },
      {
        id: '3',
        label: 'Child Folder 2 (3)',
        children: [
          { id: '6', label: 'Child Folder 1-Subscrip..(0)' },
          {
            id: '7',
            label: 'Grand Child (4)',
            children: [
              { id: '9', label: 'Folder 1' },
              { id: '10', label: 'Folder 2' },
              { id: '11', label: 'Folder 3' },
            ],
          },
          { id: '8', label: 'Child Folder 3' },
        ],
      },
      { id: '4', label: 'Child Folder 4 (0)' },
      { id: '5', label: 'Child Folder 4 (2)' },
    ],
  },
  { id: '13', label: 'Pabbly Subcription Billi..(0)' },
  { id: '14', label: 'Pabbly Email Marketing (0)' },
  { id: '17', label: 'Pabbly Form Bulider (0)' },
  { id: '15', label: 'Pabbly Hook (0)' },
];

const ITEMS1 = [{ id: '16', label: 'Trash (0)' }];

// Styled TreeItem component
const StyledTreeItem = styled((props) => {
  const confirm = useBoolean();
  const popover = usePopover();
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [quickShareDialogOpen, setQuickShareDialogOpen] = useState(false);

  const handleItemClick = (event) => {
    if (props.label.includes('Trash')) {
      event.preventDefault();
      props.onTrashClick();
    }

    if (props.label.includes('Home')) {
      event.preventDefault();
      props.onHomeClick();
    }
  };

  const handleCreateFolderOpen = () => {
    setCreateFolderOpen(true);
    popover.onClose(); // Close the popover when opening dialog
  };

  const handleRenameFolderClick = (event) => {
    setRenameDialogOpen(true);
    popover.onClose();
  };

  const handleQuickShareDialogClick = (event) => {
    setQuickShareDialogOpen(true);
    popover.onClose();
    // handleMenuClose(event);
  };

  const handleCreateFolderClose = () => {
    setCreateFolderOpen(false);
  };

  const handleRenameFolderClose = () => {
    setRenameDialogOpen(false);
  };

  const handleQuickShareDialogClose = () => {
    setQuickShareDialogOpen(false);
  };

  return (
    <>
      <TreeItem
        {...props}
        onClick={handleItemClick}
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

            {props.label.includes('Trash') ? (
              <Tooltip
                title={
                  <div style={{ textAlign: 'center' }}>
                    Trash folder holds all connections that have been deleted.
                  </div>
                }
                disableInteractive
                placement="top"
                arrow
              >
                <IconButton>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Click to see options." disableInteractive arrow placement="top">
                <IconButton onClick={popover.onOpen}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </Tooltip>
            )}

            <CustomPopover
              open={popover.open}
              anchorEl={popover.anchorEl}
              onClose={popover.onClose}
              slotProps={{ arrow: { placement: 'right-top' } }}
            >
              <MenuList>
                <Tooltip title="Create a new folder." arrow placement="left">
                  <MenuItem onClick={handleCreateFolderOpen}>
                    <Iconify icon="mingcute:add-fill" />
                    Create Folder
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Change the folder's name." arrow placement="left">
                  <MenuItem onClick={handleRenameFolderClick}>
                    <Iconify icon="fluent:edit-20-filled" />
                    Rename
                  </MenuItem>
                </Tooltip>
                <Tooltip title="Share the folder with others." arrow placement="left">
                  <MenuItem onClick={handleQuickShareDialogClick}>
                    <Iconify icon="solar:share-bold" />
                    Share
                  </MenuItem>
                </Tooltip>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Tooltip title="Click to delete connection." arrow placement="left">
                  <MenuItem
                    onClick={() => {
                      confirm.onTrue();
                      popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </CustomPopover>
          </div>
        }
      />

      <CreateFolderDialog open={createFolderOpen} onClose={handleCreateFolderClose} />

      <RenameFolderDialog open={renameDialogOpen} onClose={handleRenameFolderClose} />

      <QuickShareDialog open={quickShareDialogOpen} onClose={handleQuickShareDialogClose} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
})(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.2, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: { fontSize: '14px', fontWeight: 500 },
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

export function CustomStyling({ onTrashClick, onHomeClick }) {
  return (
    <>
      <RichTreeView
        aria-label="customized"
        defaultExpandedItems={['1']}
        sx={{ overflowX: 'hidden', minHeight: 0, width: 1 }}
        slots={{
          item: (props) => (
            <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
          ),
        }}
        items={ITEMS}
      />
      <Divider sx={{ borderStyle: 'dashed', mb: 1, mt: 1 }} />
      <RichTreeView
        aria-label="customized"
        defaultExpandedItems={['16']}
        sx={{ overflowX: 'hidden', minHeight: 0, width: 1 }}
        slots={{
          item: (props) => (
            <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
          ),
        }}
        items={ITEMS1}
      />
    </>
  );
}
