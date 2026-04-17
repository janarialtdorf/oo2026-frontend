import type {Address} from "./Address";

export type Person = {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    personalCode: string,
    Address?: Address
}