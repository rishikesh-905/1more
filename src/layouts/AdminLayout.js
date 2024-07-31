import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  TrackChanges as TrackingIcon,
  Inventory as InventoryIcon,
  Assignment as OrderIcon,
  MoveToInbox as StockIcon,
} from '@mui/icons-material';

const Header = styled('header')(({ theme }) => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#00796b',
  color: '#fff',
  boxShadow: theme.shadows[2],
  position: 'fixed',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 1200,
}));

const SidebarContainer = styled('div')(({ theme }) => ({
  width: 240,
  backgroundColor: '#333', // Dim black color
  color: '#fff', // White text for contrast
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  position: 'sticky',
  top: 60, // Start below the header
  bottom: 50, // Space from the footer
  overflowY: 'auto',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: '#fff', // White text
  '&:hover': {
    backgroundColor: '#555', // Lighter gray on hover
    color: '#fff',
  },
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
}));

const ContentContainer = styled('div')(({ theme }) => ({
  marginLeft: 20, // Width of the sidebar
  padding: theme.spacing(3),
  minHeight: 'calc(100vh - 60px - 50px)', // Full height minus header and footer
  backgroundColor: '#eaeaea',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 60, // Push content below the header
  marginBottom: 50, // Push content above the footer
}));

const Footer = styled('footer')(({ theme }) => ({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#00796b',
  color: '#fff',
  boxShadow: theme.shadows[2],
  position: 'fixed',
  bottom: 0,
  width: '100%',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(2, 0),
}));

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <SidebarContainer>
          <List>
            <StyledListItem button component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <DashboardIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/users">
              <ListItemIcon>
                <GroupIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/statistics">
              <ListItemIcon>
                <BarChartIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Site Statistics" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/settings">
              <ListItemIcon>
                <SettingsIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/tracking">
              <ListItemIcon>
                <TrackingIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Tracking" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/product-management">
              <ListItemIcon>
                <InventoryIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Product Management" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/order-manage">
              <ListItemIcon>
                <OrderIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Order Manage" />
            </StyledListItem>
            <StyledListItem button component={Link} to="/admin/stock-in-movement">
              <ListItemIcon>
                <StockIcon style={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Stock In Movement" />
            </StyledListItem>
          </List>
          <StyledDivider />
        </SidebarContainer>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </div>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </Footer>
    </div>
  );
};

export default AdminLayout;
