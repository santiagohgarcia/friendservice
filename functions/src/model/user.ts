import { Reference } from "./reference";

export default interface User {
    id: string,
    expenses: Reference[]
}