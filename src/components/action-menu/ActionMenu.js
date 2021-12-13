import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ActionMenu({ handleEdit, handleDelete, handleView }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size="30" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {handleView && (
          <MenuItem
            onClick={() => {
              handleClose();
              handleView && handleView();
            }}
          >
            View Applications
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            handleEdit && handleEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete && handleDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
