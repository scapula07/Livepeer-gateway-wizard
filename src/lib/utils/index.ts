import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export function truncateWithEllipses(
  inputString: string,
  numLetters: number
): string {
  let lettersCount = 0;
  let result = "";

  for (const char of inputString) {
    if (/[a-zA-Z]/.test(char)) {
      lettersCount++;
    }
    if (lettersCount > numLetters) {
      break;
    }
    result += char;
  }

  if (inputString.trim().length <= numLetters) {
    return inputString;
  }

  return result.trim() + "...";
}

export const getGatewayStatus = async (
  gatewayId: string
): Promise<string | null> => {
  if (!gatewayId) return null;

  const gatewayRef = doc(db, "gateways", gatewayId);
  const snapshot = await getDoc(gatewayRef);

  return snapshot.exists() ? snapshot.data()?.status : null;
};
