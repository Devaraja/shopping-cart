import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, Icon, TextField } from "@material-ui/core";

import { useCartreducer, useDispatchCart } from "../components/Reducer";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CartItem = ({ product, index, handleRemove }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="large">
      <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={product.imageUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
          </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.desc}
          </Typography>
                </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleRemove(index)}>
                  Remove item
        </Button>
        <Typography gutterBottom variant="h6" component="h2">
        {product.price.toLocaleString("en", {
                    style: "currency",
                    currency: "INR"
                  })}
          </Typography>
              </CardActions>
            </Card>
          </Grid>
      </Grid>      
    </Container>
  );
};

export default function Store() {
  const classes = useStyles();
  const items = useCartreducer();
  const dispatch = useDispatchCart();
  const totalPrice = items.reduce((total, b) => total + b.price, 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="large">
        <p>Cart is empty</p>
      </Container>
    );
  }
  return (
    <Container maxWidth="large">
      <p>
        Total price:{" "}
        {totalPrice.toLocaleString("en", {
          style: "currency",
          currency: "INR"
        })}
      </p>
      {/*items.map((item, index) => (
        <CartItem
          handleRemove={handleRemove}
          key={index}
          product={item}
          index={index}
        />
      ))*/}
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={3}>
            <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={item.imageUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
          </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.desc}
          </Typography>
                </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleRemove(index)}>
                  Remove item
        </Button>
        <Typography gutterBottom variant="h6" component="h2">
        {item.price.toLocaleString("en", {
                    style: "currency",
                    currency: "INR"
                  })}
          </Typography>
              </CardActions>
            </Card>
          </Grid>))}
      </Grid>
    </Container>
  );
}