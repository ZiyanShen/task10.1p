// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt8UeyMAicT49CXsBP7kJ6QudKo7XvCOE",
  authDomain: "dekin313.firebaseapp.com",
  projectId: "dekin313",
  storageBucket: "dekin313.appspot.com",
  messagingSenderId: "1007956025942",
  appId: "1:1007956025942:web:cc096fe3e28ad7396fd1f7",
  measurementId: "G-79RNL76N7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default app
export {
	storage
}
