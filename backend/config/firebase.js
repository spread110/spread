const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

// Get Firestore instance
const db = admin.firestore();

// Get Auth instance
const auth = admin.auth();

// Get Messaging instance
const messaging = admin.messaging();

module.exports = {
  admin,
  db,
  auth,
  messaging
}; 