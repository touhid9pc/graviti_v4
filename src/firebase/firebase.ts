import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBooTw7VNlIlOX4zDdQ0LGaj0USSynYXXI",
  authDomain: "graviti-84f7b.firebaseapp.com",
  projectId: "graviti-84f7b",
  storageBucket: "graviti-84f7b.firebasestorage.app",
  messagingSenderId: "405767884278",
  appId: "1:405767884278:web:9e01269faa0d2327b7cbd7",
  measurementId: "G-4EYL46PMCS",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
const firebaseDb = getFirestore(firebaseApp);

let analytics = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(firebaseApp);
});

export { firebaseApp, auth, googleAuthProvider, firebaseDb, analytics };
