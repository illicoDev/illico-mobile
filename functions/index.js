const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloillico = functions.https.onRequest((request, response) => {
    response.send("Hello illico !");
});


exports.getOrders = functions.https.onRequest((request, response) => {
    admin.firestore().collection('order').get()
        .then(data => {
            let orders = [];
            data.forEach(doc => {
                orders.push(doc.data());
            });
            return response.json(orders);
        })
        .catch(error => console.error(error))
});
