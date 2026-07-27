// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ✅ Your updated Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtVJYAY5RR45YghNGIcPIRGobhl7BfnGs",
  authDomain: "gym-management-50f61.firebaseapp.com",
  databaseURL: "https://gym-management-50f61-default-rtdb.firebaseio.com",
  projectId: "gym-management-50f61",
  storageBucket: "gym-management-50f61.appspot.com", // ✅ Fixed typo from ".app" to ".com"
  messagingSenderId: "62552780355",
  appId: "1:62552780355:web:c4d087e728e1ae622c6ef6", // ✅ Real app ID
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Export storage and auth
export const storage = getStorage(app);
export const auth = getAuth(app);
