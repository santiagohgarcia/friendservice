import * as admin from 'firebase-admin'
import User from './model/user'
import { Expense, InitialExpense } from './model/expense';
import { Relation } from './model/relation';
import { Reference } from './model/reference';

export const createUser = function (id: string, db) {
    return db.collection('users').doc(id).set({
        id: id,
        relations: [],
        expenses: []
    } as User)
}

export const recalculateRelations = async function (user: User, db: FirebaseFirestore.Firestore) {

    user.expenses.forEach(async e => {

        let expense = (await db.collection('expenses').doc(e.ref).get() ).data() as Expense

        let individualAmount = (expense.totalAmount / expense.users.length + 1)

        expense.users.forEach(async expenseUser => {
            let relationRef = db.collection('users').doc(user.id).collection('relations').doc(expenseUser.ref)

            console.log(relationRef)

            let relation = (await relationRef.get()).data() as Relation

            console.log(relation)

            relation.userId = expenseUser.ref;

            if (expense.creator === user.id) {
                (relation.myDebt) ? relation.myDebt -= individualAmount : individualAmount;
                (relation.userDebt) ? relation.userDebt += individualAmount : individualAmount;
            } else {
                (relation.myDebt) ? relation.myDebt += individualAmount : individualAmount;
                (relation.userDebt) ? relation.userDebt -= individualAmount : individualAmount;
            }

            relation.myDebt = (relation.myDebt > 0) ? relation.myDebt : 0
            relation.userDebt = (relation.userDebt > 0) ? relation.userDebt : 0

            if (!relation.expenses.find(exp => exp.ref === expense.id)) {
                relation.expenses.push({ ref: expense.id } as Reference)
            }

            console.log(relation)

            relationRef.set(relation).catch(err => console.log(err))

        }
        )

    })
}
