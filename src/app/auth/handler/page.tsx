"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRedirectResult } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, firebaseDb } from "@/firebase/firebase";
import toast from "react-hot-toast";

export default function AutHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const result = await getRedirectResult(auth);

        console.log(result);
        const user = result?.user;

        // if (!user) {
        //   router.replace("/");
        //   return;
        // }

        // Save user
        // const userRef = doc(firebaseDb, "users", user.uid);
        const ref = searchParams.get("ref");
        const companies = JSON.parse(searchParams.get("companies") || "[]");

        // await setDoc(userRef, {
        //   uid: user.uid,
        //   email: user.email,
        //   name: user.displayName,
        //   createdAt: new Date(),
        //   referredBy: ref || null,
        // });

        // toast.success(`Signed in successfully. Great to have you here  🙌.`);

        // await addDoc(collection(firebaseDb, "interests"), {
        //   companies,
        //   uid: user.uid,
        //   timestamp: new Date(),
        // });

        // You can pass this data via context or local storage if needed
        // router.replace("/"); // Or back to previous page
      } catch (error) {
        console.error("Sign-in failed:", error);
        toast.error("Something went wrong during sign-in.");
        // router.replace("/");
      }
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Signing you in...</p>
    </div>
  );
}
