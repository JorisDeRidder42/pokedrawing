import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { env } from "process";

export const environment = {
  production: false,
  firebaseConfig :{
  apiKey: "AIzaSyA5N2Z5ArwjHYIC2dLdWEUTCJdq3HePDRc",
  authDomain: "pokedrawing-98ac3.firebaseapp.com",
  projectId: "pokedrawing-98ac3",
  storageBucket: "pokedrawing-98ac3.appspot.com",
  messagingSenderId: "297858092039",
  appId: "1:297858092039:web:7dd4e67f3b796016586ea2"
  }
};