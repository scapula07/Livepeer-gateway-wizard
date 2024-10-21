import { getStorage, ref, uploadBytes } from "firebase/storage";
import { SDAPI } from "./api/imageGen.api";

const storage = getStorage();


export const upload = async () => {
  const imgGen = new SDAPI();
  
  try {
   
    const urlStream = await imgGen.txt2img("Mountain top view");
    
    const response = await fetch(urlStream?.outputs[0]?.url as string);

    const blob = await response.blob();
    
  
    const storageRef = ref(storage, 'some-child/mountain-top.png'); // Create a reference for the file in storage
    const snapshot=await uploadBytes(storageRef, blob)

    return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

  } catch (error) {
    console.error("Error uploading the image:", error);
  }
};

upload();
