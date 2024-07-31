import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Styled component for the table container
const TableWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

// Styled component for the table row with hover effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Styled component for the action buttons
const ActionButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const ConfirmDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
}));

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // useEffect to fetch user data from JSON server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:3001/users/${selectedUser.id}`);
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setOpenConfirmDialog(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Function to open confirmation dialog
  const openDialog = (user) => {
    setSelectedUser(user);
    setOpenConfirmDialog(true);
  };

  // Function to close confirmation dialog
  const closeDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableWrapper>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <StyledTableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <ActionButton color="secondary" onClick={() => openDialog(user)}>
                        <DeleteIcon />
                      </ActionButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={closeDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </ConfirmDialog>
    </>
  );
};

export default UserManagement;
