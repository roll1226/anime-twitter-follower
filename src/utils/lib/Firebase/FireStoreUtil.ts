import { collection, doc, Firestore } from "firebase/firestore";
import { animeFollowerConverter } from "models/AnimeFollowerModel";
import FirebaseInitUtil from "./FirebaseInitUtil";

class FireStoreUtil {
  public static getAnimeFollower(year: string, cours: string, animeId: string) {
    const db = FirebaseInitUtil.fireStore();
    return collection(
      db,
      "animes",
      year,
      "cours",
      cours,
      animeId
    ).withConverter(animeFollowerConverter);
  }
}

export default FireStoreUtil;
