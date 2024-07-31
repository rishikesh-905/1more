import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Products = () => {
  // Example product data
  const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', image: '/path/to/image1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', image: '/path/to/image2.jpg' },
    // Add more products as needed
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
