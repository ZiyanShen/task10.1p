const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../config/dekin313-firebase-adminsdk-u5dap-fbd3e93377.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
	db
}