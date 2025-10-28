import { db } from '../utils/firebase';
import { doc, deleteDoc } from 'firebase/firestore'; 



export const deleteBookById = async (id: string): Promise<void> => {
    
    try {

        const bookRef = doc(db, 'Books', id);
        await deleteDoc(bookRef);

    } catch (error) {

        throw new Error("La suppression a échoué.");
    }
}