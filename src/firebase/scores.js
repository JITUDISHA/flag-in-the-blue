import {updateDoc,doc, getFirestore} from 'firebase/firestore';
import { db } from "../firebase/firebase.js";

export async function submitScore(timeTaken:number,penalty:number){
	const userId = localStorage.getItem('uid');
    if (!userId) {
		throw new Error("User is not logged in!");
    }
	const totalScore = timeTaken+penalty;
	try{
		const scoresCollRef=doc(db,"users",userId);
		await updateDoc(scoresCollRef,{totalScore:totalScore});
		console.log("Score submitted successfully!");
	}catch(err){
		console.error("Error submitting TotalScore:",err);
	}
}
