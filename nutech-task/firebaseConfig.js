import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-sa1YrmSIQorNkliOqkY6FXBBUzAJICk",
  authDomain: "nutech-shop.firebaseapp.com",
  projectId: "nutech-shop",
  storageBucket: "nutech-shop.appspot.com",
  messagingSenderId: "378082064576",
  appId: "1:378082064576:web:455dcdf352a705a37b5525",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
