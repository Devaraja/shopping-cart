import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, Icon, TextField } from "@material-ui/core";

import { useDispatchCart } from "./Reducer";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatchCart();
  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  return (
    <Container maxWidth="large">
      <Grid container spacing={2}>
        {product.map((product) =>
          <Grid item xs={3}>
            <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={product.imageUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                <Typography color="primary" variant="h5" component="h2">
        {product.price.toLocaleString("en", {
                    style: "currency",
                    currency: "INR"
                  })}
          </Typography>
                  <Typography variant="h6" component="h2">
                    {product.title}
          </Typography>
          
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.desc}
          </Typography>
                </CardContent>
              <CardActions>
                <Button variant="contained" size="small" color="primary" onClick={() => addToCart(product)}>
                  Add to cart
        </Button>
        
              </CardActions>
            </Card>
          </Grid>)}
      </Grid>
    </Container>
  );
};

export default Product;
