import { db } from '../utils/firebase';
import { collection, getDocs, QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import type { Book } from '../utils/BookInterface';

export const getAllBooks = async (): Promise<Book[]> => {

    try{
        const booksCollection = collection(db, 'Books'); 

        const querySnapshot = await getDocs(booksCollection);
    
        const data: Book[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            return {
              id: doc.id,
              ...doc.data()
            } as Book;
        });
    
        return data;

    }
    catch(error)
    {
        throw new Error("La récupération des livres a échoué.");
    }
   
}
