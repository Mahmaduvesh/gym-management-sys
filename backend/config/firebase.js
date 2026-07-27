const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gym-management-50f61-default-rtdb.firebaseio.com",
});

module.exports = admin;