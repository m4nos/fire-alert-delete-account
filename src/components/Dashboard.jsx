import React from "react";
import { useNavigate } from "react-router-dom";
import { db, FirebaseAuth } from "../firebase";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useAuth } from "./AuthProvider";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();
  const { credentials } = useAuth();

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const user = FirebaseAuth.currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          credentials.password
        );
        await reauthenticateWithCredential(user, credential);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error(`No user found with the given UID ${user.uid}`);
        }

        const userDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, "users", userDoc.id));

        // delete user from firebase auth
        await deleteUser(user);

        alert("Account deleted successfully.");

        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert(
          "Error deleting account. Please try again, or contact herman226.r@gmail.com for assistance."
        );
      }
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome {FirebaseAuth.currentUser?.email}</h2>
      <button onClick={handleDeleteAccount} className="delete-account">
        Delete Account
      </button>
    </div>
  );
}

export default Dashboard;
