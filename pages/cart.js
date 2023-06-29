import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@/components/button";

export default function cart() {
  const [products, setProducts] = useState([]);
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);
  console.log(cartProducts);

  let total = 0;
  cartProducts.map((prodId) => {
    const price = products.find((p) => p._id === prodId)?.price || 0;
    total += price;
  });

  const addMoreOfthisProduct = (id) => {
    addToCart(id);
    console.log(cartProducts);
  };
  const removeMoreOfThisProduct = (id) => {
    removeFromCart(id);
    console.log(cartProducts);
    console.log(id);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        console.log(products);
      });
    } else {
      setProducts([]);
      console.log(products);
    }
  }, [cartProducts]);
  console.log(products);
  return (
    <div>
      <Header />

      <StyledDiv>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {!!products.length && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>

                      <td>
                        <Button
                          onClick={() => removeMoreOfThisProduct(product._id)}
                        >
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((pro) => pro === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button
                          onClick={() => addMoreOfthisProduct(product._id)}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((pro) => pro === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>Total products</th>
                    <th>Total quantity</th>
                    <th>Total Price</th>
                  </tr>
                  <tr>
                    <td>{products.length}</td>
                    <td>{cartProducts.length}</td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
        </ColumnsWrapper>
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
