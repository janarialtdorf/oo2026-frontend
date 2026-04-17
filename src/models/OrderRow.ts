import type { Product } from "./Product";

export type OrderRow = {
    id?: number,
    product: Product,
    quantity: number
}