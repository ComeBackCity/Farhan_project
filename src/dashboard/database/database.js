const {Firestore} = require('@google-cloud/firestore');

const db = new Firestore({keyFilename: "../Ajraar-shop-78d0c5c5676f.json"});

module.exports = db
