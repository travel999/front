import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnas8kSaZblj0OUP1pwjFNJrL7yf_52ro",
  authDomain: "origachi-e24fd.firebaseapp.com",
  projectId: "origachi-e24fd",
  storageBucket: "origachi-e24fd.appspot.com",
  messagingSenderId: "822523876302",
  appId: "1:822523876302:web:bb6181b1a997fb90e9919f",
  measurementId: "G-L6X7THVHFJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
