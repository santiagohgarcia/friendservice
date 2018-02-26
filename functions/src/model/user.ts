import { Reference } from "./reference";

export default interface User {
    id: string,
    relations: Reference[],
    expenses: Reference[]
}