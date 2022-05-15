import firebase, { FirebaseApp } from "firebase/app";
import "firebase/firestore";
import {
  Firestore,
  FirestoreDataConverter,
  Timestamp,
} from "firebase/firestore";

export type AnimeFollower = {
  __type: "animeFollower";
  id: string;
  title: string;
  follower: number;
  createdAt: Date;
};

export const animeFollowerConverter: FirestoreDataConverter<AnimeFollower> = {
  toFirestore(animeFollower: AnimeFollower) {
    return {
      _type: "animeFollower",
      title: animeFollower.title,
      follower: animeFollower.follower,
      createdAt: Timestamp.fromDate(animeFollower.createdAt),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const animeFollower = {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as AnimeFollower;
    animeFollower.id = snapshot.id;
    return animeFollower;
  },
};
