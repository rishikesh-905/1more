import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import TrackingIcon from '@mui/icons-material/TrackChanges';
import InventoryIcon from '@mui/icons-material/Inventory';
import OrderIcon from '@mui/icons-material/Assignment';
import StockIcon from '@mui/icons-material/MoveToInbox';
import { styled } from '@mui/material/styles';
//import '../styles/Sidebar.css';

const SidebarContainer = styled('div')(({ theme }) => ({
  width: 260,
  height: 'calc(100vh - 60px)', // Full viewport height minus header height
  backgroundColor: '#1e1e1e', // Dark background color
  color: '#fff', // White text color
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  position: 'fixed',
  top: 60, // Below the header
  left: 0,
  overflowY: 'auto',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
  },
  borderRadius: theme.shape.borderRadius,
}));

const SidebarLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(2, 0),
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
      <List>
        <StyledListItem button component={SidebarLink} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/users">
          <ListItemIcon>
            <GroupIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/statistics">
          <ListItemIcon>
            <BarChartIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Site Statistics" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/settings">
          <ListItemIcon>
            <SettingsIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/tracking">
          <ListItemIcon>
            <TrackingIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Tracking" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/product-management">
          <ListItemIcon>
            <InventoryIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Product Management" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/order-manage">
          <ListItemIcon>
            <OrderIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Order Manage" />
        </StyledListItem>
        <StyledListItem button component={SidebarLink} to="/admin/stock-in-movement">
          <ListItemIcon>
            <StockIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Stock In Movement" />
        </StyledListItem>
      </List>
      <StyledDivider />
    </SidebarContainer>
  );
};

export default Sidebar;
