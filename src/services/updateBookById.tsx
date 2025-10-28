import { db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { Book } from '../utils/BookInterface';

export const updateBookById = async (id: string, dataToUpdate: Partial<Book>) => {

    const book = doc(db, 'Books', id);

    try {
        await updateDoc(book, dataToUpdate);        

    } catch (error) {
        throw new Error("La mise à jour a échoué.");
    }
}