import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthResponse } from "@/lib/types/auth.type";

export const authApi = {
  register: async function (email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      const ref = doc(db, "users", user?.uid);
      await setDoc(ref, {
        id: user?.uid,
        email: email,
      });
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        return {
          id: docSnap?.id,
          ...docSnap?.data(),
        };
      }
    } catch (e: any) {
      throw new Error(e);
    }
  },
  login: async function (
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response, "response");
      const ref = doc(db, "users", response?.user?.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        return { id: docSnap?.id, ...docSnap?.data() };
      }
    } catch (e: any) {
      throw new Error(e);
    }
  },
};
