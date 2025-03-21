const functions = require("firebase-functions");
const admin = require("firebase-admin");

// ✅ Check if Firebase app is already initialized before initializing
if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.myFunction = functions
  .region("us-central1")
  .firestore.document("chat/{messageId}")
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();

    await admin.messaging().send({
      notification: {
        title: messageData.userName || "New Message",
        body: messageData.text || "You have a new message!",
      },
      topic: "chat",
    });
  });
