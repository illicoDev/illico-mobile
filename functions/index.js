
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const accountSid = 'AC544da5caf1ff37ee7b1bb5503ba76be5';
const authToken = 'b8edc2033e026d519bdfe3cd06289a78';
const client = require('twilio')(accountSid, authToken);

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloillico = functions.https.onRequest((request, response) => {
    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: ':: ILLICO :: Une nouvelle commande a été effectuée',
            to: 'whatsapp:+33662312595'
        })
        .then(message => { return message });
    response.send("Hello illico !");
});

exports.sendsms = functions.https.onRequest((request, response) => {
    client.api.messages
        .create({
            body: "test sms illico",
            to: "+33766204476",
            from: "+12568264790",
        }).then(function(data) {
            console.log('Administrator notified');
            response.send(data);
        }).catch(function(err) {
            console.error('Could not notify administrator');
            console.error(err);
        });
    response.send('error');
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
    .document(`/order/{orderId}`)
    .onCreate(async (snap, context) => {
        try {
            console.log(' :: trigger started :: ' + snap.data());
            client.api.messages
                .create({
                    body: "Service illico : Commande passée avec succès :D ",
                    to: "+33662312595",
                    from: "+12568264790",
                }).then(function(data) {
                console.log('Administrator notified');
                return data;
            }).catch(function(err) {
                console.error('Could not notify administrator');
                console.error(err);
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    });

exports.onCreateUser = functions.auth
    .user()
    .onCreate((user) => {
        admin.firestore()
            .collection('users')
            .doc(user.uid)
            .set({email: user.email}).then(r => console.log("User Created : "+JSON.stringify(r)))

    });
