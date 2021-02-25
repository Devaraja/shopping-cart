import React, { useState, useEffect } from "react";
import Product from "../components/Product";

export default function Store() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then(results => results.json())
      .then(data => {
        //console.log(data)
        setProducts(data)
      });
  },[])

  return (
    <main>
        {/*products.map((product) => (
          <Product key={product.id} product={product} />
        ))*/
          <Product product={products} />
        }
    </main>
  );
}
