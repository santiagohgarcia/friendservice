import User from "./user";

export default interface Expense {
    id: string;
    title: string;
    date: Date;
    totalAmount: number;
    users: User[];
}