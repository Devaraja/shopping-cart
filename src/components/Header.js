import React from "react";
import { Link } from "react-router-dom";
import { useCartreducer } from "./Reducer";

const Header = () => {
  const items = useCartreducer();
  return (
    <header className="Appbar">
      <div className="Apptitle"><h2>Shopping cart</h2></div>
      <nav className='nav'>
      <Link to="/formik">
          <button>Formik</button>
        </Link>
        <Link to="/">
          <button>Store</button>
        </Link>
        <Link to="/cartpage">
          <button>Cart ({items.length})</button>
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;
