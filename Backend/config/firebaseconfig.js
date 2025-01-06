// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../json data/travel-app-7c9eb-firebase-adminsdk-t355m-dd24f7b26b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
