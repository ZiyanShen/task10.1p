const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const {getStorage} = require('firebase-admin/storage')
const serviceAccount = require('../config/dekin313-firebase-adminsdk-u5dap-fbd3e93377.json');

const app = initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'gs://dekin313.appspot.com/'
});

const db = getFirestore();
const storage = getStorage()
module.exports = {
	db,
	storage
}



