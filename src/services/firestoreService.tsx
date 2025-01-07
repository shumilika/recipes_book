import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export const getData = async ()=>{
    const docRef = doc(db, "recipes", "3TLTl6F8JvTkkKkuSY2Y");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}