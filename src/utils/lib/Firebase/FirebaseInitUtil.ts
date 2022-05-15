import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { env } from "../../../env/DotEnv";

const app = initializeApp(env.getFirebaseConfig());

class FirebaseInitUtil {
  /**
   * fire store
   */
  public static fireStore() {
    return getFirestore(app);
  }
}

export default FirebaseInitUtil;
