import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { Book } from '../utils/BookInterface';

export const addBook = async (newBookData: Omit<Book, 'id'>) => {
    
    try {
        const booksCollectionRef = collection(db, 'Books');
        const docRef = await addDoc(booksCollectionRef, newBookData);

        return docRef;

    } catch (error) {
        throw new Error("L'ajout du livre a échoué.");
    }
}