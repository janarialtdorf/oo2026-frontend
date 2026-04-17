import type { Person } from "./Person";
import type { OrderRow } from "./OrderRow";

export type Order = {
    id?: number,
    created: Date,
    total: number,
    parcelMachine: string,
    person: Person,
    orderRows: OrderRow[]
}