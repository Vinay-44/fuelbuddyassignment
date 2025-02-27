import bcrypt from "bcryptjs";
import {initializeConfig} from '../config/firebase.config.js'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";


    const app = initializeConfig();
    const db = getFirestore(app);
    const collectionRef = collection(db, "users");


export function rootUser(req, res) {
    console.log(req);
    res.send("Hello World");
}

export async function getUserById(req,res){
    try {
        const {id} = req.params;
        const userRef = doc(collectionRef,id);
        const user = (await getDoc(userRef)).data();
        delete user.password;
        res.send( { data:user });
    } catch (error) {
        res.send(error)
    }
}

export async function createUser(req,res){
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
          const docRef = await addDoc(collectionRef, {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
          });
  
          return { data: docRef.id };
        } catch (error) {
          console.log(error);
          res.send(error);
        }
}


export async function updateUser(req,res){
        try {
            const {id} =req.params;
            const userRef = doc(collectionRef,id)
            
            await updateDoc(userRef,{
                username:req.body.username
            })
            res.send({id,status:'updated!'})
        } catch (error) {
            res.send(error);
        }
}


export async function deleteUser(req,res){
    try{
        const {id} = req.params;

        const userRef = doc(collectionRef,id);

        await deleteDoc(userRef);

        res.send({id,status:'deleted!'})
    }catch(error){
        res.send(error)
    }
}