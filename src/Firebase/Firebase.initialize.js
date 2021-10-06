import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.confiq";

const InitializeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default InitializeAuthentication;