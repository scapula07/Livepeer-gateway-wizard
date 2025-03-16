const firebaseErrorMessages: Record<string, string> = {
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/invalid-email": "Invalid email format.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/too-many-requests":
    "Too many failed attempts. Try again later or reset your password.",
  "auth/invalid-credential": "Invalid credentials. Please try again.",
};

export function getFirebaseErrorMessage(error: any): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    const match = error.message.match(/\(auth\/([^)]+)\)/);
    const errorCode = match ? `auth/${match[1]}` : "";

    return firebaseErrorMessages[errorCode] || "An unexpected error occurred";
  }
  return "Something went wrong.";
}
