import * as React from 'react';
import { Box, Button, Typography, Modal } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function BasicModal({ data, ...props }) {
  if (!data) return null;

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ color: 'white' }}
            variant="h2"
            component="h2"
          >
            Cover Letter
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: 'white' }}
          >
            {data}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
