import { useState } from "react"
import type { Product } from "../../models/Product"

function AddProduct() {
    const [newProduct, setNewProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        active: false,
        stock: 0,
        category: {
            name: ""
        }
    })
    const AddProduct = () => {
        fetch(import.meta.env.VITE_BACK_URL + "/products", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(() => alert("Toode lisatud!"));
    }
  return (
    // ...newProduct --> jatab alles koik varasema
    <div>
        <label>Name</label> <br />
        <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} type="text" /> <br /> 
        <button onClick={AddProduct}>Add product</button>
        <label>Description</label> <br />
        <input onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} type="text" /> <br /> 
        <button onClick={AddProduct}>Add product</button>
        <label>Price</label> <br />
        <input onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})} type="text" /> <br /> 
        <button onClick={AddProduct}>Add product</button>
        <label>Active</label> <br />
        <input onChange={(e) => setNewProduct({...newProduct, active: e.target.checked})} type="text" /> <br /> 
        <button onClick={AddProduct}>Add product</button>
        <label>Stock</label> <br />
        <input onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})} type="text" /> <br /> 
        <button onClick={AddProduct}>Add product</button>
        <label>Category</label> <br /> 
        <button onClick={AddProduct}>Add product</button>
    </div>
  )
}

export default AddProduct