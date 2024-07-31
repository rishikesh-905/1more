// src/components/DetailedViewModal.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
}));

const DetailedViewModal = ({ open, onClose, title, content }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box className={classes.modalContent}>
        <Typography variant="h6" id="modal-title">
          {title}
        </Typography>
        <Typography variant="body1" marginTop={2}>
          {content}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose} style={{ marginTop: '20px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DetailedViewModal;
