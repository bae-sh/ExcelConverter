import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';

export const getObj = async setProductList => {
  const q = query(collection(dbService, 'items'), orderBy('indexNumber'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  const obj = [];
  querySnapshot.forEach(doc => {
    obj.push(doc.data());
  });
  setProductList(obj);
};

export const getCost = async setShippingCosts => {
  const docRef = doc(dbService, 'cost', 'shippingCosts');
  const docSnap = await getDoc(docRef);
  setShippingCosts(docSnap.data());
};

export const saveShippingCosts = async shippingCosts => {
  await setDoc(doc(dbService, 'cost', 'shippingCosts'), shippingCosts);
};
