import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
   } from "firebase/auth";
   
import {db } from './config'
import { doc,getDoc,setDoc,addDoc,collection ,getDocs,query,where,orderBy}  from "firebase/firestore";
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
            return {
                     status:docSnap.exists(),
                     data:{
                        id:docSnap?.id,
                        creator:docSnap.data()?.creator,
                        createdAt:docSnap?.data()?.createdAt,
                        title:docSnap?.data()?.title,
                        cover:docSnap?.data()?.cover
                     }}
        }catch(e:any){
            console.log(e)
            throw new Error(e)
        }
    },
    getGateways:async function (id:string) {
            const instances:any= []
        try{
             const q = query(collection(db, "gateways"),where('creator',"==",id),orderBy("createdAt","desc"));
             const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                instances.push({ ...doc.data(), id: doc.id })
              });

              return instances

         }catch(e){
            console.log(e)
         }
    }
}