import { useState } from "react"

function Cart() {
  const [orderRows, setOrderRows] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  // frontendis andmemudelid korda
  // lisame tellimusi backendi
  // toote kustutamine ostukorvist 
  // suurenda ja vahenda kogust ostukorvis
  // URLi muutuja --> edit product ja product details


  // key={} --> re-renderduste jaoks, meeldejatmiseks, et ei peaks korduvalt tegema for-tsyklit.
  return (
    <div>
      {orderRows.map(orderRow =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.id}</div>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price}</div>
          <div>{orderRow.quantity}</div>
          <div>{orderRow.quantity.price * orderRow.quantity}$</div>
          <button>x</button>
        </div>
      )}
    </div>
  )
}

export default Cart