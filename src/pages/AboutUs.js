import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" paragraph>
        Welcome to our Inventory Management System. Our company is dedicated to providing the best tools and services for managing your inventory efficiently and effectively. We strive to offer top-notch solutions to meet your business needs and help you streamline your inventory processes.
      </Typography>
      <Typography variant="body1" paragraph>
        Our team is comprised of experienced professionals who are passionate about inventory management and committed to delivering high-quality products and exceptional customer support.
      </Typography>
      <Typography variant="body1" paragraph>
        We understand that effective inventory management is critical to the success of any business. That's why we continually invest in the latest technologies and innovations to ensure our system is at the forefront of the industry. Our goal is to help you save time, reduce costs, and improve the accuracy of your inventory tracking.
      </Typography>
      <Typography variant="body1" paragraph>
        Our solutions are designed to be user-friendly and scalable, making them suitable for businesses of all sizes. Whether you're a small startup or a large enterprise, we have the tools you need to manage your inventory with ease and confidence.
      </Typography>
      <Box mt={4}>
        <Typography variant="h6">Contact Us</Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or need assistance, please feel free to contact us at <a href="mailto:support@example.com">support@example.com</a>.
        </Typography>
        <Typography variant="body1" paragraph>
          You can also reach us by phone at (123) 456-7890. Our customer support team is available Monday through Friday from 9:00 AM to 5:00 PM.
        </Typography>
        <Typography variant="body1" paragraph>
          We value your feedback and are always looking for ways to improve our services. Thank you for choosing our Inventory Management System.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
