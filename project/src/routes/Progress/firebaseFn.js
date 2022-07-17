import { doc, getDoc, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';

export const getNumber = async ({ setNumber }) => {
  const docRef = doc(dbService, 'progress', 'number');
  const docSnap = await getDoc(docRef);
  setNumber(docSnap.data().number);
};
export const saveNumber = async ({ number }) => {
  await setDoc(doc(dbService, 'progress', 'number'), { number: number });
};
