import { useEffect, useState } from "react"
import type { Product } from "../models/Product";
import type { Category } from "../models/Category";

// renderdamine --> esmakordne componendi peale tulek
// re-renderdamine --> componendi HTMLs muutujate olekute muutmine

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sort, setSort] = useState("id,asc");
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState(0);
    // let products = []
    // products = json

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
    }, []);



    // uef --> useEffect()
    // http://localhost:5050/products?page=0&size=4&sort=id,asc&activeCategoryId=0
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}&activeCategoryId=${activeCategoryId}`)
            .then(res => res.json()) // kogu tagastus
            .then(json => {
                setProducts(json.content);
                setTotalElements(json.totalElements);
                setTotalPages(json.totalPages);
            }) // response-i body
    }, [page, size, sort, activeCategoryId]);

    //function sizeHandler() {}
    const sizeHandler = (newSize: number) => {
        setSize(newSize);
        setPage(0);
    }

    const sortHandler = (newSort: string) => {
        setSort(newSort);
        setPage(0);
    }

    const activeCategoryHandler = (categoryId: number) => {
        setActiveCategoryId(categoryId);
        setPage(0);
    }

    const addToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]"); //localstoragest votmiseks
        const foundProduct = cart.find(cartProduct => cartProduct.product.id === product.id);
        if (foundProduct) {
            foundProduct.quantity++;
        } else {
            cart.push({product: product, quantity: 1});
        }
        cart.push()
        localStorage.setItem("cart", JSON.stringify(cart)); //localstorageisse lisamiseks
    }

    // localstorage-sse array lisamiseks:
    // 1. votta vana seis localstorage-st voi kui ei ole sellist votit lisatud, siis tyhi array
    
    //                                       localstorage.getItem() || "[]"
    // 2. votta jutumargid maha              JSON.parse()
    // 3. lisada yks juurde                  .push()
    // 4. panna jutumargid tagasi            JSON.stringify()
    // 5. panna localstorage-sse tagasi      localStorage.setItem()

    return (
        <div>
            <div>
                {page * size + 1}-{(page + 1) * size > totalElements ? totalElements : (page + 1) * size}
                kuvatud {totalElements}-st
            </div>

            <select defaultValue={3} onChange={(e) => sizeHandler(Number(e.target.value))}>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>

            <br /><br />

            <button onClick={() => sortHandler("id,asc")}>Sorteeri vanemad enne</button>
            <button onClick={() => sortHandler("id,desc")}>Sorteeri uuemad enne</button>
            <button onClick={() => sortHandler("name,asc")}>Sorteeri A-Z</button>
            <button onClick={() => sortHandler("name,desc")}>Sorteeri Z-A</button>
            <button onClick={() => sortHandler("price,asc")}>Sorteeri hind kasvavalt</button>
            <button onClick={() => sortHandler("price,desc")}>Sorteeri hind kahanevalt</button>

            <br /><br />

            <button
                style={activeCategoryId === 0 ? { fontWeight: "bold" } : undefined}
                onClick={() => activeCategoryHandler(0)}
            >
                Koik kategooriad
            </button>

            {categories.map(category =>
                <button
                    style={activeCategoryId === category.id ? { fontWeight: "bold" } : undefined}
                    onClick={() => activeCategoryHandler(category.id!)}>
                    {category.name}
                </button>
            )}

            <br /><br />

            {products.map(product =>
                <div key={product.id}>
                    {product.name} - {product.price} €
                    <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
                </div>)}

            <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
            <span>{page + 1} / {totalPages}</span>
            <button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Jargmine</button>
        </div>
    )
}

export default HomePage