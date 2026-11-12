// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaoMa1GTKvqC_2otk_3I3Vgf0TiqrVj9Q",
  authDomain: "sky-shoping.firebaseapp.com",
  projectId: "sky-shoping",
  storageBucket: "sky-shoping.firebasestorage.app",
  messagingSenderId: "1072960986721",
  appId: "1:1072960986721:web:241cdfb5ce39d56e719420",
  measurementId: "G-FLJMB5NKNS"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
console.log("✅ Firebase Connected - SKY SHOPPING");
