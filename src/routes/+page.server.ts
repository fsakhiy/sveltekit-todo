import { firebaseDB } from '$lib/firebase';
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	default: async (event) => {
		// TODO log the user in    
        const todoData = (await event.request.formData()).get("todo") as string
        
        try {
            await addDoc(collection(firebaseDB, "list"), {
                todo: todoData,
                isDone: false,
                createdDate: new Date()
            }) 
        } catch (e) {
            console.log(e)
        }
        

	},  
} satisfies Actions;

export const load: PageServerLoad = async () => {

    let data: {todo: string, isDone: boolean, createdDate: Date}[] = []
    
    const todoRef = collection(firebaseDB, "list")    
    const q = query(todoRef, orderBy("createdDate", "asc"))
    const todoSnap = await getDocs(q)
    todoSnap.forEach((doc) => {
        data = [...data, {todo: doc.get("todo"), isDone: doc.get("isDone"), createdDate: doc.get("createdDate").toDate()}]
    })
  
    return {
        data: data
    }
}