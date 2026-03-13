import { useEffect, useState } from "react"
import type { Product } from "../models/Product";

// renderdamine --> esmakordne componendi peale tulek
// re-renderdamine --> componendi HTMLs muutujate olekute muutmine

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    // let products = []
    // products = json

    // uef --> useEffect()
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/products")
            .then(res => res.json()) // kogu tagastus
            .then(json => setProducts(json)) // response-i body
    }, []);


    return (
        <div>
            {products.map(product => 
            <div key={product.id}>
                {product.name} - {product.price} € 
            </div>)}
        </div>
    )
}

export default HomePage