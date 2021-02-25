import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from "react-router-dom";
import { useCartreducer } from "./Reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const items = useCartreducer();
  const history = useHistory();

  function cartHandler () {
    //history.push('/cart');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shopping cart
          </Typography>
          <Button color="inherit" onClick={() => history.push('/register')}>Register</Button>
          <Button color="inherit" onClick={() => history.push('/')}>Store</Button>
          <Button color="inherit" onClick={() => history.push('/cartpage')}><Badge badgeContent={items.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
