import { useState } from "react"
import type { OrderRow } from "../models/OrderRow";

function Cart() {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  const deleteFromCart = (index: number) => {
    orderRows.splice(index, 1);
    setOrderRows([...orderRows]);

  }

  const decreaseQuantity = (index: number) => {
    const cart = [...orderRows];
    cart[index].quantity--;
    //orderRows[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    setOrderRows(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index: number) => {
    const cart = [...orderRows];
    cart[index].quantity++;
    //orderRows[index].quantity++;
    setOrderRows(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const emptyCart = () => {
    setOrderRows([]);
    //localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("cart", "[]");

  }

  const calculateTotal = () => {
    let sum = 0;
    orderRows.forEach(orderRow => sum += orderRow.product.price * orderRow.quantity);
    return sum;
  }

  const makeOrder = () => {
    const payload = orderRows.map(orderRow => ({productId: orderRow.product.id, quantity: orderRow.quantity}));

    fetch(import.meta.env.VITE_BACK_URL + "/orders?personId=1", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(json => alert("Lisasid edukalt tellimuse ID-ga: " + json.id));
  }

  // frontendis andmemudelid korda
  // lisame tellimusi backendi
  // toote kustutamine ostukorvist 
  // suurenda ja vahenda kogust ostukorvis
  // URLi muutuja --> edit product ja product details


  // key={} --> re-renderduste jaoks, meeldejatmiseks, et ei peaks korduvalt tegema for-tsyklit.
  return (
    <div>
      {orderRows.length > 0 && <button onClick={() => emptyCart()}>Tyhjenda</button>}

      {orderRows.length === 0 && <div>Ostukorv on tyhi</div>}

      {orderRows.map((orderRow, index) =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.id}</div>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price}</div>
          <button onClick={() => decreaseQuantity(index)}>-</button>
          <div>{orderRow.quantity}</div>
          <button onClick={() => increaseQuantity(index)}>+</button>
          <div>{orderRow.product.price * orderRow.quantity}$</div>
          <button onClick={() => deleteFromCart(index)}>x</button>
        </div>
      )}

      {orderRows.length > 0 && 
        <>
          <div>Kokku: {calculateTotal()}</div>
          <button onClick={() => makeOrder()}>Telli</button>
          <select>
            <option>Pakiautomaat 1</option>
            <option>Pakiautomaat 2</option>
          </select>
        </> }

    </div>
  )
}

export default Cart