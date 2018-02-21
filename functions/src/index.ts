import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.personsUpdate = functions.firestore.document('/expenses/{expenseId}') 
    .onCreate(event => {
            event.data.data();

    })