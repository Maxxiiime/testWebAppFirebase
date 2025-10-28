import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Book } from '../utils/BookInterface';

export const getBookById = async (id: string): Promise<Book> => {

    try{
        const book = doc(db, 'Books', id);
        const docSnap = await getDoc(book);    
        const data: Book = { id: docSnap.id, ...docSnap.data() } as Book;
        
        return data;
    }
    catch(error)
    {
        throw new Error("La récupération du livre a échoué.");
    }
   
}
