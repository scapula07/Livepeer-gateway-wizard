import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
   } from "firebase/auth";
   
import {db } from './config'
import { doc,getDoc,setDoc,addDoc,collection ,onSnapshot,query,where,orderBy}  from "firebase/firestore";
import { upload } from "@/lib/uploadImgUrl";


export const gatewayApi= {
    createInstance:async function (id:string) {
        try{
            // const img=await upload()
            const  snap = await addDoc(collection(db, "gateways"),{ 
               creator:id,
               createdAt:new Date(),
               title:'Unnamed',
               cover:''
            })        
            const ref=doc(db,"gateways",snap?.id)
            const docSnap = await getDoc(ref);
            return docSnap.exists()
        }catch(e:any){
            console.log(e)
            throw new Error(e)
        }
    }
}