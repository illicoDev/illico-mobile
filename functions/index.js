const functions = require('firebase-functions');
const admin = require('firebase-admin');

const accountSid = 'AC544da5caf1ff37ee7b1bb5503ba76be5';
const authToken = '212484e7f73f2699b36c71bb48c466d8';
const client = require('twilio')(accountSid, authToken);

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloillico = functions.https.onRequest((request, response) => {
    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: 'illico : Hello there!',
            to: 'whatsapp:+33662312595'
        })
        .then(message => { return message });
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

exports.sendNotification = functions.firestore
    .document(`order/{orderId}`)
    .onCreate(async (snap, context) => {
        try {
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: 'illico : Hello there!',
                    to: 'whatsapp:+33662312595'
                })
                .then(message => { return message });
        } catch (error) {
            console.log(error);
            return error;
        }
    });
