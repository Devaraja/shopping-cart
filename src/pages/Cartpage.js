import React, { useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useCartreducer, useDispatchCart } from "../components/Reducer";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Store() {

  //---modal diaolog---
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (index) => {
    setOpen(true);
    console.log(index)
  };

  const handleClose = () => {
    setOpen(false);
  };

  //------------------------------
  const classes = useStyles();
  const history = useHistory();
  const items = useCartreducer();
  const dispatch = useDispatchCart();
  const totalPrice = items.reduce((total, b) => total + b.price, 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
    handleClose()
  };
  if (items.length === 0) {
    return (
      <Container maxWidth="large">
        <p></p>
              <Grid container justify = "center">
                <Grid container justify = "center"><Typography gutterTop variant="h5" component="h2">
        <p>Cart is empty</p>
        </Typography></Grid>
        <Grid><Button variant="contained" color="primary" onClick={() => history.push('/')}>
        Select products
        </Button></Grid>
        
        </Grid>
      </Container>
    );
  }
  return (
    <Container maxWidth="large">
      <p>
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this item from cart list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRemove(0)} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        <p></p>
        <Typography gutterTop variant="h5" component="h2">
        Total price:{" "}
        {totalPrice.toLocaleString("en", {
          style: "currency",
          currency: "INR"
        })}
        </Typography>
      </p>
      <p>
        <Button variant="contained" color="primary" onClick={() => history.push('/register')}>Check out</Button>
      </p>
      {/*items.map((item, index) => (
        <CartItem
          handleRemove={handleRemove}
          key={index}
          product={item}
          index={index}
        />
      ))*/}
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Product details</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {items.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th">
              <Typography variant="h6" component="h4">
                {item.title}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <img src={item.imageUrl} height="50" width="auto" />
                </StyledTableCell>
              <StyledTableCell>{item.desc}</StyledTableCell>              
              <StyledTableCell align="right">{item.price.toLocaleString("en", {
                    style: "currency",
                    currency: "INR"
                  })}</StyledTableCell>
              <StyledTableCell align="center"><Button><DeleteIcon color="primary" onClick= {() => handleClickOpen(index)} /></Button></StyledTableCell>
              {/* <StyledTableCell align="center"><Button><DeleteIcon color="primary" onClick={() => handleRemove(index)} /></Button></StyledTableCell> */}
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}